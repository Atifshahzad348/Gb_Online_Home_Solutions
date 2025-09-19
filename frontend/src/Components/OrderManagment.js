
// test code
import React, { useState, useEffect } from "react";
import { FaTrash, FaSearch, FaEdit, FaCheck, FaTimes, FaTools, FaUser, FaPhone, FaMapMarkerAlt, FaWrench, FaTag, FaFileAlt, FaMoneyBill } from "react-icons/fa";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';

const OrderManagment = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editForm, setEditForm] = useState({ status: '', servicePrice: '' });
  const { AuthorizationToken } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/clientorders", {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      const userData = await response.json();
      setUsers(userData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // deleting orders 
  const deleteOrder = async(id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/clientorders/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      
      if(response.ok){
        toast.success("Order deleted");
        getAllUsersData();
      } else {
        toast.error("Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Error deleting order");
    }
  }

  // Update order status and price
  const updateOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthorizationToken,
        },
        body: JSON.stringify(editForm)
      });

      if (response.ok) {
        toast.success("Order updated successfully");
        setEditingOrder(null);
        setEditForm({ status: '', servicePrice: '' });
        getAllUsersData();
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg || "Update failed");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Error updating order");
    }
  };

  const handleEditClick = (order) => {
    setEditingOrder(order._id);
    setEditForm({
      status: order.status || 'pending',
      servicePrice: order.servicePrice || ''
    });
  };

  const handleCancelEdit = () => {
    setEditingOrder(null);
    setEditForm({ status: '', servicePrice: '' });
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setIsSearchActive(false);
      setFilteredUsers([]);
      return;
    }

    const filtered = users.filter((user) => {
      const name = user.name?.toLowerCase() || "";
      const email = user.email?.toLowerCase() || "";
      const service = user.service?.toLowerCase() || "";
      const status = user.status?.toLowerCase() || "";
      
      return (
        name.includes(searchTerm.toLowerCase()) ||
        email.includes(searchTerm.toLowerCase()) ||
        service.includes(searchTerm.toLowerCase()) ||
        status.includes(searchTerm.toLowerCase())
      );
    });

    setFilteredUsers(filtered);
    setIsSearchActive(true);
  };

  const displayedUsers = isSearchActive ? filteredUsers : users;

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <div className="container-fluid py-4">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <FaTools className="me-2 text-warning" size={28} />
            <h2 className="fw-bold mb-0 text-dark">SERVICE ORDERS MANAGEMENT</h2>
          </div>
          <div className="input-group" style={{ maxWidth: "400px" }}>
            <input
              type="text"
              className="form-control border-warning"
              placeholder="Search by name, email, service, or status..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsSearchActive(false);
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              className="btn btn-warning text-white"
              onClick={handleSearch}
            >
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Orders Count Badge */}
        <div className="mb-4">
          <span className="badge orange-bg fs-6 p-2">
            Total Service Orders: {displayedUsers.length}
          </span>
        </div>

        {/* Orders Grid */}
        <div className="row">
          {displayedUsers.length > 0 ? (
            displayedUsers.map((order, index) => (
              <div key={index} className="col-xl-4 col-lg-6 col-md-6 mb-4">
                <div className="card h-100 shadow-lg border-0 hover-shadow">
                  {/* Card Header */}
                  <div className="card-header orange-bg text-white d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <FaUser className="me-2" />
                      <strong>{order.name}</strong>
                    </div>
                    <span className={`badge rounded-pill ${
                      order.status === 'completed' ? 'bg-success' :
                      order.status === 'cancelled' ? 'bg-danger' :
                      order.status === 'in-progress' ? 'bg-warning' :
                      'bg-secondary'
                    }`}>
                      {order.status || 'pending'}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="card-body">
                    {/* Contact Information */}
                    <div className="d-flex align-items-center mb-3">
                      <FaPhone className="text-primary me-2" />
                      <span className="text-muted">{order.contact}</span>
                    </div>

                    {/* Location Information */}
                    <div className="mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <FaMapMarkerAlt className="text-danger me-2" />
                        <strong>Location:</strong>
                      </div>
                      <div className="ms-4">
                        <div>{order.city}</div>
                        <small className="text-muted">{order.address}</small>
                      </div>
                    </div>

                    {/* Service Information */}
                    <div className="mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <FaWrench className="text-warning me-2" />
                        <strong>Service Details:</strong>
                      </div>
                      <div className="ms-4">
                        <div><strong>Type:</strong> {order.service}</div>
                        <div><strong>Category:</strong> {order.service_type}</div>
                      </div>
                    </div>

                    {/* Price Section */}
                    <div className="mb-3 p-3 bg-light rounded">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <FaMoneyBill className="text-success me-2" />
                          <strong>Service Price:</strong>
                        </div>
                        {editingOrder === order._id ? (
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: '100px' }}
                            value={editForm.servicePrice}
                            onChange={(e) => setEditForm({
                              ...editForm,
                              servicePrice: e.target.value
                            })}
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                          />
                        ) : (
                          <span className={`fw-bold ${
                            order.servicePrice > 0 ? 'text-success' : 'text-muted'
                          }`}>
                            {order.servicePrice > 0 ? `${order.servicePrice} PKR` : 'Not set'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Status Edit Section */}
                    {editingOrder === order._id && (
                      <div className="mb-3">
                        <label className="form-label fw-bold">Update Status:</label>
                        <select
                          className="form-select"
                          value={editForm.status}
                          onChange={(e) => setEditForm({
                            ...editForm,
                            status: e.target.value
                          })}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    )}

                    {/* Problem Description */}
                    {order.problem && (
                      <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <FaFileAlt className="text-info me-2" />
                          <strong>Problem Description:</strong>
                        </div>
                        <div className="ms-4">
                          <p className="text-muted mb-0 small">{order.problem}</p>
                        </div>
                      </div>
                    )}

                    {/* Order Date */}
                    <div className="text-center">
                      <small className="text-muted">
                        Created: {formatDate(order.createdAt)}
                      </small>
                    </div>
                  </div>

                  {/* Card Footer - Actions */}
                  <div className="card-footer bg-white border-0">
                    <div className="d-grid gap-2">
                      {editingOrder === order._id ? (
                        <div className="btn-group w-100">
                          <button 
                            onClick={() => updateOrder(order._id)} 
                            className="btn btn-success btn-sm"
                          >
                            <FaCheck className="me-1" /> Save
                          </button>
                          <button 
                            onClick={handleCancelEdit} 
                            className="btn btn-secondary btn-sm"
                          >
                            <FaTimes className="me-1" /> Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="d-flex gap-2">
                          <button 
                            onClick={() => handleEditClick(order)} 
                            className="btn black-btn btn-sm flex-fill"
                          >
                            <FaEdit className="me-1" /> Edit
                          </button>
                          <button 
                            onClick={() => deleteOrder(order._id)} 
                            className="btn orange-btn btn-sm flex-fill"
                          >
                            <FaTrash className="me-1" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="text-center py-5">
                <div className="card shadow-sm border-0">
                  <div className="card-body py-5">
                    <FaTools size={48} className="text-muted mb-3" />
                    <h5 className="text-muted">No orders found</h5>
                    <p className="text-muted mb-0">No service orders match your search criteria.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderManagment;