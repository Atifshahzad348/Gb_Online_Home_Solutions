

const Service = require("../models/service-model");
const fs = require('fs');
const path = require('path');

// Get all services
const getAllServices = async (req, res) => {
    try {
        const services = await Service.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            services: services
        });
    } catch (error) {
        console.error("Get services error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching services"
        });
    }
};

// Get single service by ID
const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            });
        }
        res.status(200).json({
            success: true,
            service: service
        });
    } catch (error) {
        console.error("Get service error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching service"
        });
    }
};

// Create new service
const createService = async (req, res) => {
    try {
        const { title, description, category, basePrice, duration, features } = req.body;
        
        // Validate required fields
        if (!title || !description || !category || !basePrice) {
            return res.status(400).json({
                success: false,
                message: "Title, description, category, and basePrice are required"
            });
        }

        let imagePath = '';
        if (req.file) {
            // ✅ CORRECT PATH: Files are now saved in /uploads/services/
            imagePath = `/uploads/services/${req.file.filename}`;
            console.log('Service image saved at:', imagePath); // Debug log
        }

        // Parse features if it's a string
        let featuresArray = [];
        if (features) {
            featuresArray = typeof features === 'string' 
                ? features.split(',').map(f => f.trim()).filter(f => f) 
                : features;
        }

        const service = new Service({
            title,
            description,
            image: imagePath,
            category,
            basePrice: parseFloat(basePrice),
            duration: duration || '1-2 hours',
            features: featuresArray
        });

        await service.save();

        res.status(201).json({
            success: true,
            message: "Service created successfully",
            service: service
        });

    } catch (error) {
        console.error("Create service error:", error);
        
        // Clean up uploaded file if service creation fails
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error("Error deleting uploaded file:", err);
            });
        }

        res.status(500).json({
            success: false,
            message: "Server error while creating service"
        });
    }
};

// Update service
const updateService = async (req, res) => {
    try {
        const { title, description, category, basePrice, duration, features, isActive } = req.body;
        const serviceId = req.params.id;

        const service = await Service.findById(serviceId);
        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            });
        }

        let updateData = {
            title: title || service.title,
            description: description || service.description,
            category: category || service.category,
            basePrice: basePrice ? parseFloat(basePrice) : service.basePrice,
            duration: duration || service.duration,
            isActive: isActive !== undefined ? isActive : service.isActive
        };

        // Handle features
        if (features) {
            updateData.features = typeof features === 'string' 
                ? features.split(',').map(f => f.trim()).filter(f => f) 
                : features;
        }

        // Handle image upload
        if (req.file) {
            // Delete old image if exists
            if (service.image && service.image.startsWith('/uploads/')) {
                const oldImagePath = path.join(__dirname, '..', service.image);
                fs.unlink(oldImagePath, (err) => {
                    if (err) console.error("Error deleting old image:", err);
                });
            }
            // ✅ CORRECT PATH: Files are now saved in /uploads/services/
            updateData.image = `/uploads/services/${req.file.filename}`;
        }

        const updatedService = await Service.findByIdAndUpdate(
            serviceId,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: "Service updated successfully",
            service: updatedService
        });

    } catch (error) {
        console.error("Update service error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while updating service"
        });
    }
};

// Delete service
const deleteService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        
        const service = await Service.findById(serviceId);
        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            });
        }

        // Delete associated image
        if (service.image && service.image.startsWith('/uploads/')) {
            const imagePath = path.join(__dirname, '..', service.image);
            fs.unlink(imagePath, (err) => {
                if (err) console.error("Error deleting service image:", err);
            });
        }

        await Service.findByIdAndDelete(serviceId);

        res.status(200).json({
            success: true,
            message: "Service deleted successfully"
        });

    } catch (error) {
        console.error("Delete service error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while deleting service"
        });
    }
};

// Get services by category
const getServicesByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const services = await Service.find({ category, isActive: true }).sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            services: services
        });
    } catch (error) {
        console.error("Get services by category error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching services"
        });
    }
};

module.exports = {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    getServicesByCategory, // Add this
    deleteService
};