
import React, { useState } from 'react';
import { useAuth } from '../store/auth';
import { FaTrash, FaSearch, FaEdit, FaCheck, FaTimes, FaTools, FaUser, FaPhone, FaMapMarkerAlt, FaWrench, FaTag, FaFileAlt, FaMoneyBill } from "react-icons/fa";
import { toast } from 'react-toastify';

// Make sure you have this export default
const AddServicesManagement = () => {
  const [serviceData, setServiceData] = useState({
    title: '',
    description: '',
    category: 'recommended',
    basePrice: '',
    duration: '1-2 hours',
    features: '',
    image: null,
    imagePreview: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { AuthorizationToken } = useAuth();

  // Make sure this function is defined
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image must be less than 10MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setServiceData(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Make sure to use const here
      const formData = new FormData();
      formData.append('title', serviceData.title);
      formData.append('description', serviceData.description);
      formData.append('category', serviceData.category);
      formData.append('basePrice', serviceData.basePrice);
      formData.append('duration', serviceData.duration);
      formData.append('features', serviceData.features);
      
      if (serviceData.image) {
        formData.append('image', serviceData.image);
      }

      const response = await fetch('http://localhost:5000/api/services', {
        method: 'POST',
        headers: {
          'Authorization': AuthorizationToken,
        },
        body: formData
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Service added successfully!');
        setServiceData({
          title: '',
          description: '',
          category: 'recommended', 
          basePrice: '',
          duration: '1-2 hours',
          features: '',
          image: null,
          imagePreview: null
        });
      } else {
        throw new Error(result.message || 'Failed to add service');
      }
    } catch (error) {
      console.error('Error adding service:', error);
      toast.error(error.message || 'Failed to add service. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeImage = () => {
    setServiceData(prev => ({
      ...prev,
      image: null,
      imagePreview: null
    }));
  };

  return (
    <div className="container-fluid py-4">
       <div className="d-flex align-items-center mb-4">
                  <FaTools className="me-2 text-warning" size={28} />
                  <h2 className="fw-bold mb-0 text-dark">Add Services To Your Website</h2>
        </div>
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header orange-bg text-white py-3">
              <h6 className="mb-0">Fill the details below to add a new service</h6>
            
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-8">
                    {/* Title Input */}
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label fw-semibold">
                        Service Title *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={serviceData.title}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter service title"
                      />
                    </div>

                    {/* Description Input */}
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label fw-semibold">
                        Service Description *
                      </label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="4"
                        value={serviceData.description}
                        onChange={handleInputChange}
                        required
                        placeholder="Provide a detailed description of the service..."
                      />
                    </div>

                    {/* Category Input */}
                    <div className="mb-3">
                      <label htmlFor="category" className="form-label fw-semibold">
                        Category *
                      </label>
                      <select
                        className="form-select"
                        id="category"
                        name="category"
                        value={serviceData.category}
                        onChange={handleInputChange}
                        required
                      > <option className='category-option text-white' value="kitchen">Kitchen Designing</option>
                        <option className='category-option text-white' value="paint">Paint Services</option>
                        <option className='category-option text-white' value="electrical">Electrical Services</option>
                        <option className='category-option text-white' value="plumbing">Plumbing Services</option>
                         <option className='category-option text-white'  value="recommended">Recommended Services</option>
                       
                      </select>
                    </div>

                    {/* Price and Duration */}
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="basePrice" className="form-label fw-semibold">
                          Base Price pkr *
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="basePrice"
                          name="basePrice"
                          value={serviceData.basePrice}
                          onChange={handleInputChange}
                          required
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="duration" className="form-label fw-semibold">
                          Duration
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="duration"
                          name="duration"
                          value={serviceData.duration}
                          onChange={handleInputChange}
                          placeholder="e.g., 1-2 hours"
                        />
                      </div>
                    </div>

                    {/* Features Input */}
                    <div className="mb-3">
                      <label htmlFor="features" className="form-label fw-semibold">
                        Features (comma-separated)
                      </label>
                      <textarea
                        className="form-control"
                        id="features"
                        name="features"
                        rows="2"
                        value={serviceData.features}
                        onChange={handleInputChange}
                        placeholder="Feature 1, Feature 2, Feature 3"
                      />
                      <div className="form-text">Separate multiple features with commas</div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    {/* Image Upload */}
                    <div className="mb-3">
                      <label htmlFor="image" className="form-label fw-semibold">
                        Service Image
                      </label>
                      <div className="border rounded p-3 text-center">
                        {serviceData.imagePreview ? (
                          <div className="text-center">
                            <img
                              src={serviceData.imagePreview}
                              alt="Preview"
                              className="img-fluid rounded mb-3"
                              style={{ maxHeight: '200px' }}
                            />
                            <button
                              type="button"
                              className="btn black-btn btn-sm"
                              onClick={removeImage}
                            >
                              Remove Image
                            </button>
                          </div>
                        ) : (
                          <div className="py-4">
                            <div className="mb-3 text-muted">
                              <i className="fas fa-cloud-upload-alt fa-2x"></i>
                            </div>
                            <input
                              type="file"
                              className="form-control d-none"
                              id="image"
                              name="image"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                            <label htmlFor="image" className="btn orange-btn">
                              Choose Image
                            </label>
                            <div className="form-text mt-2">
                              JPEG, PNG or GIF (Max 5MB)
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />
                
                {/* Submit Button */}
                <div className="d-flex justify-content-end">
                  <button 
                    type="button" 
                    className="btn black-btn me-2"
                    onClick={() => {
                      setServiceData({
                        title: '',
                        description: '',
                        category: 'recommended',
                        basePrice: '',
                        duration: '1-2 hours',
                        features: '',
                        image: null,
                        imagePreview: null
                      });
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
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Adding Service...
                      </>
                    ) : (
                      'Add Service'
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

// MAKE SURE THIS EXPORT DEFAULT EXISTS AT THE END
export default AddServicesManagement;

