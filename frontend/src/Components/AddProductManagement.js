import React, { useState } from 'react';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const AddProductManagement = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'plumbing',
    subcategory: '',
    brand: '',
    stock: '',
    features: '',
    specifications: '{}',
    images: []
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { AuthorizationToken } = useAuth();

  const categories = [
    'plumbing', 'electrical', 'paint', 'kitchen', 'tools', 'safety'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length + productData.images.length > 5) {
      toast.error('Maximum 5 images allowed');
      return;
    }

    const newImagePreviews = [];
    const newImages = [];

    files.forEach(file => {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select image files only');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Each image must be less than 10MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        newImagePreviews.push(reader.result);
        if (newImagePreviews.length === files.length) {
          setImagePreviews(prev => [...prev, ...newImagePreviews]);
        }
      };
      reader.readAsDataURL(file);

      newImages.push(file);
    });

    setProductData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  const removeImage = (index) => {
    setProductData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      
      // Append all product data
      Object.keys(productData).forEach(key => {
        if (key !== 'images') {
          formData.append(key, productData[key]);
        }
      });
      
      // Append images
      productData.images.forEach(image => {
        formData.append('images', image);
      });

      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Authorization': AuthorizationToken,
        },
        body: formData
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Product added successfully!');
        // Reset form
        setProductData({
          name: '',
          description: '',
          price: '',
          originalPrice: '',
          category: 'plumbing',
          subcategory: '',
          brand: '',
          stock: '',
          features: '',
          specifications: '{}',
          images: []
        });
        setImagePreviews([]);
      } else {
        throw new Error(result.message || 'Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error(error.message || 'Failed to add product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header orange-bg text-white py-3">
              <h4 className="mb-0">Add New Product</h4>
              <p className="mb-0">Fill in the details below to add a new product</p>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-8">
                    {/* Basic Information */}
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Product Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={productData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Brand</label>
                        <input
                          type="text"
                          className="form-control"
                          name="brand"
                          value={productData.brand}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Description *</label>
                      <textarea
                        className="form-control"
                        name="description"
                        rows="3"
                        value={productData.description}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    {/* Pricing */}
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label className="form-label fw-semibold">Price (PKR) *</label>
                        <input
                          type="number"
                          className="form-control"
                          name="price"
                          value={productData.price}
                          onChange={handleInputChange}
                          required
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label fw-semibold">Original Price (PKR)</label>
                        <input
                          type="number"
                          className="form-control"
                          name="originalPrice"
                          value={productData.originalPrice}
                          onChange={handleInputChange}
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label fw-semibold">Stock Quantity *</label>
                        <input
                          type="number"
                          className="form-control"
                          name="stock"
                          value={productData.stock}
                          onChange={handleInputChange}
                          required
                          min="0"
                        />
                      </div>
                    </div>

                    {/* Categories */}
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Category *</label>
                        <select
                          className="form-select"
                          name="category"
                          value={productData.category}
                          onChange={handleInputChange}
                          required
                        >
                          {categories.map(cat => (
                            <option key={cat} value={cat}>
                              {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Subcategory</label>
                        <input
                          type="text"
                          className="form-control"
                          name="subcategory"
                          value={productData.subcategory}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Features (comma-separated)</label>
                      <textarea
                        className="form-control"
                        name="features"
                        rows="2"
                        value={productData.features}
                        onChange={handleInputChange}
                        placeholder="Feature 1, Feature 2, Feature 3"
                      />
                    </div>

                    {/* Specifications */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Specifications (JSON format)</label>
                      <textarea
                        className="form-control"
                        name="specifications"
                        rows="3"
                        value={productData.specifications}
                        onChange={handleInputChange}
                        placeholder='{"weight": "2kg", "dimensions": "10x20x30cm"}'
                      />
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Product Images (Max 5)</label>
                      <div className="border rounded p-3">
                        {imagePreviews.length > 0 ? (
                          <div className="row">
                            {imagePreviews.map((preview, index) => (
                              <div key={index} className="col-6 mb-3 position-relative">
                                <img
                                  src={preview}
                                  alt={`Preview ${index + 1}`}
                                  className="img-fluid rounded"
                                  style={{ height: '100px', objectFit: 'cover', width: '100%' }}
                                />
                                <button
                                  type="button"
                                  className="btn black-btn btn-sm position-absolute top-0 end-0"
                                  onClick={() => removeImage(index)}
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-4 text-muted">
                            <i className="fas fa-image fa-3x mb-3"></i>
                            <p>No images selected</p>
                          </div>
                        )}

                        <input
                          type="file"
                          className="form-control d-none"
                          id="productImages"
                          multiple
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        <label htmlFor="productImages" className="btn orange-btn w-100">
                          <i className="fas fa-upload me-2"></i>
                          Choose Images
                        </label>
                        <div className="form-text">
                          JPEG, PNG or GIF (Max 10MB each)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />
                
                <div className="d-flex justify-content-end">
                  <button 
                    type="button" 
                    className="btn black-btn  me-2"
                    onClick={() => {
                      setProductData({
                        name: '',
                        description: '',
                        price: '',
                        originalPrice: '',
                        category: 'plumbing',
                        subcategory: '',
                        brand: '',
                        stock: '',
                        features: '',
                        specifications: '{}',
                        images: []
                      });
                      setImagePreviews([]);
                    }}
                  >
                    Reset
                  </button>
                  <button 
                    type="submit" 
                    className="btn orange-btn px-4"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Adding Product...
                      </>
                    ) : (
                      'Add Product'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductManagement;