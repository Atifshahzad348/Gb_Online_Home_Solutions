import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AvailableServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedService, setSelectedService] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editForm, setEditForm] = useState({
        title: '',
        description: '',
        category: '',
        basePrice: '',
        duration: '',
        features: '',
        isActive: true
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/services', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setServices(response.data.services);
        } catch (error) {
            console.error('Error fetching services:', error);
            toast.error('Failed to fetch services');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (serviceId) => {
        if (!window.confirm('Are you sure you want to delete this service?')) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/services/${serviceId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            toast.success('Service deleted successfully');
            fetchServices();
        } catch (error) {
            console.error('Error deleting service:', error);
            toast.error('Failed to delete service');
        }
    };

    const handleEdit = (service) => {
        setSelectedService(service);
        setEditForm({
            title: service.title,
            description: service.description,
            category: service.category,
            basePrice: service.basePrice,
            duration: service.duration,
            features: service.features.join(', '),
            isActive: service.isActive
        });
        setShowModal(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            
            Object.keys(editForm).forEach(key => {
                formData.append(key, editForm[key]);
            });

            await axios.put(`http://localhost:5000/api/services/${selectedService._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success('Service updated successfully');
            setShowModal(false);
            fetchServices();
        } catch (error) {
            console.error('Error updating service:', error);
            toast.error('Failed to update service');
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    if (loading) {
        return (
            <div className="col-9">
                <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="col-12 p-0">
            <div className="container-fluid py-4">
                {/* Header */}
                <div className="row">
                    <div className="col-12">
                        <div className="card mb-4">
                            <div className="card-header bg-dark text-white d-flex justify-content-between py-3 align-items-center">
                                <h5 className="">Available Services</h5>
                                <span className="badge orange-bg">Total: {services.length}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="row g-4">
                    {services.map(service => (
                        <div key={service._id} className="col-md-6 col-lg-4">
                            <div className="card h-100 shadow-sm">
                                {/* Service Image - Covering top section */}
                                <div className="card-img-top" style={{ height: '200px', overflow: 'hidden' }}>
                                    {service.image ? (
                                        <img 
                                            src={`http://localhost:5000${service.image}`} 
                                            className="img-fluid w-100 h-100"
                                            alt={service.title}
                                            style={{ objectFit: 'cover' }}
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                                                e.target.style.objectFit = 'cover';
                                            }}
                                        />
                                    ) : (
                                        <div className="w-100 h-100 bg-light d-flex align-items-center justify-content-center">
                                            <i className="fas fa-concierge-bell fa-3x text-secondary"></i>
                                        </div>
                                    )}
                                </div>

                                {/* Service Details */}
                                <div className="card-body d-flex flex-column">
                                    <h6 className="card-title mb-2 text-truncate">{service.title}</h6>
                                    <p className="card-text text-muted small mb-3 flex-grow-1">
                                        {service.description.substring(0, 80)}...
                                    </p>
                                    
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span className="badge orange-bg text-dark text-uppercase">
                                            {service.category}
                                        </span>
                                        <span className="fw-bold sc-color fs-6">{service.basePrice}-pkr</span>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <span className="text-muted small">{service.duration}</span>
                                        <span className={`badge ${service.isActive ? 'bg-success' : 'bg-secondary'}`}>
                                            {service.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="d-grid gap-2 mt-auto">
                                        <button 
                                            className="btn btn-sm black-btn"
                                            onClick={() => handleEdit(service)}
                                        >
                                            <i className="fas fa-edit me-1"></i>Edit
                                        </button>
                                        <button 
                                            className="btn btn-sm orange-btn"
                                            onClick={() => handleDelete(service._id)}
                                        >
                                            <i className="fas fa-trash me-1"></i>Delete
                                        </button>
                                    </div>
                                </div>

                                {/* Created Date */}
                                <div className="card-footer bg-transparent py-2">
                                    <small className="text-muted">
                                        Created: {new Date(service.createdAt).toLocaleDateString()}
                                    </small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Edit Modal */}
                {showModal && (
                    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit Service</h5>
                                    <button 
                                        type="button" 
                                        className="btn-close"
                                        onClick={() => setShowModal(false)}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleUpdate}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">Title</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="title"
                                                        value={editForm.title}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">Category</label>
                                                    <select
                                                        className="form-control"
                                                        name="category"
                                                        value={editForm.category}
                                                        onChange={handleInputChange}
                                                        required
                                                    >
                                                        <option value="kitchen">Kitchen</option>
                                                        <option value="paint">Paint</option>
                                                        <option value="electrical">Electrical</option>
                                                        <option value="plumbing">Plumbing</option>
                                                        <option value="recommended">Recommended</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Description</label>
                                            <textarea
                                                className="form-control"
                                                name="description"
                                                value={editForm.description}
                                                onChange={handleInputChange}
                                                rows="3"
                                                required
                                            />
                                        </div>

                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label className="form-label">Price (₹)</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="basePrice"
                                                        value={editForm.basePrice}
                                                        onChange={handleInputChange}
                                                        min="0"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label className="form-label">Duration</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="duration"
                                                        value={editForm.duration}
                                                        onChange={handleInputChange}
                                                        placeholder="1-2 hours"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label className="form-label">Features</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="features"
                                                        value={editForm.features}
                                                        onChange={handleInputChange}
                                                        placeholder="Feature 1, Feature 2, ..."
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-check form-switch mt-3">
                                            <input
                                                className=" custom-checkbox form-check-input"
                                                type="checkbox"
                                                name="isActive"
                                                checked={editForm.isActive}
                                                onChange={handleInputChange}
                                            />
                                            <label className="custom-label">Active Service</label>
                                        </div>

                                        <div className="modal-footer">
                                            <button type="button" className="btn black-btn" onClick={() => setShowModal(false)}>
                                                Cancel
                                            </button>
                                            <button type="submit" className="btn orange-btn">
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AvailableServices;