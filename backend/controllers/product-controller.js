const Product = require("../models/product-model");
const fs = require('fs');
const path = require('path');

// Get all products with optional filtering
const getAllProducts = async (req, res) => {
    try {
        const { category, search, minPrice, maxPrice, sortBy, page = 1, limit = 12 } = req.query;
        
        let query = { isActive: true };
        
        // Apply filters
        if (category && category !== 'all') {
            query.category = category;
        }
        
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { brand: { $regex: search, $options: 'i' } }
            ];
        }
        
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }
        
        // Sort options
        let sortOptions = {};
        switch (sortBy) {
            case 'price-low':
                sortOptions = { price: 1 };
                break;
            case 'price-high':
                sortOptions = { price: -1 };
                break;
            case 'newest':
                sortOptions = { createdAt: -1 };
                break;
            case 'rating':
                sortOptions = { 'rating.average': -1 };
                break;
            default:
                sortOptions = { createdAt: -1 };
        }
        
        const products = await Product.find(query)
            .sort(sortOptions)
            .limit(limit * 1)
            .skip((page - 1) * limit);
            
        const total = await Product.countDocuments(query);
        
        res.status(200).json({
            success: true,
            products,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
        
    } catch (error) {
        console.error("Get products error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching products"
        });
    }
};

// Get single product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        console.error("Get product error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching product"
        });
    }
};

// Create new product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, originalPrice, category, subcategory, brand, features, specifications, stock } = req.body;
        
        // Validate required fields
        if (!name || !description || !price || !category || stock === undefined) {
            return res.status(400).json({
                success: false,
                message: "Name, description, price, category, and stock are required"
            });
        }

        let images = [];
        if (req.files) {
            images = req.files.map(file => `/uploads/products/${file.filename}`);
        }

        // Parse features and specifications if they're strings
        let featuresArray = [];
        if (features) {
            featuresArray = typeof features === 'string' 
                ? features.split(',').map(f => f.trim()).filter(f => f) 
                : features;
        }

        let specsMap = {};
        if (specifications) {
            try {
                specsMap = typeof specifications === 'string' 
                    ? JSON.parse(specifications)
                    : specifications;
            } catch (e) {
                console.error("Error parsing specifications:", e);
            }
        }

        const product = new Product({
            name,
            description,
            price: parseFloat(price),
            originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
            category,
            subcategory: subcategory || '',
            brand: brand || '',
            images,
            stock: parseInt(stock),
            features: featuresArray,
            specifications: specsMap
        });

        await product.save();

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (error) {
        console.error("Create product error:", error);
        
        // Clean up uploaded files if product creation fails
        if (req.files) {
            req.files.forEach(file => {
                fs.unlink(file.path, (err) => {
                    if (err) console.error("Error deleting uploaded file:", err);
                });
            });
        }

        res.status(500).json({
            success: false,
            message: "Server error while creating product"
        });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updateData = { ...req.body };

        // Handle price conversions
        if (updateData.price) updateData.price = parseFloat(updateData.price);
        if (updateData.originalPrice) updateData.originalPrice = parseFloat(updateData.originalPrice);
        if (updateData.stock) updateData.stock = parseInt(updateData.stock);

        // Handle features array
        if (updateData.features) {
            updateData.features = typeof updateData.features === 'string' 
                ? updateData.features.split(',').map(f => f.trim()).filter(f => f) 
                : updateData.features;
        }

        // Handle specifications
        if (updateData.specifications) {
            try {
                updateData.specifications = typeof updateData.specifications === 'string' 
                    ? JSON.parse(updateData.specifications)
                    : updateData.specifications;
            } catch (e) {
                console.error("Error parsing specifications:", e);
            }
        }

        // Handle image uploads
        if (req.files && req.files.length > 0) {
            const newImages = req.files.map(file => `/uploads/products/${file.filename}`);
            updateData.$push = { images: { $each: newImages } };
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct
        });

    } catch (error) {
        console.error("Update product error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while updating product"
        });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Delete associated images
        if (product.images && product.images.length > 0) {
            product.images.forEach(imagePath => {
                if (imagePath.startsWith('/uploads/')) {
                    const fullPath = path.join(__dirname, '..', imagePath);
                    fs.unlink(fullPath, (err) => {
                        if (err) console.error("Error deleting product image:", err);
                    });
                }
            });
        }

        await Product.findByIdAndDelete(productId);

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.error("Delete product error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while deleting product"
        });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};