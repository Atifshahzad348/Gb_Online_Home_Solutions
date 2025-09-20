

import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/auth';
import { FaSearch, FaEye, FaTrash, FaUser, FaPhone, FaBox, FaMoneyBill, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminOrdersPanel = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const { AuthorizationToken } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order =>
        order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user?.contact?.includes(searchTerm) ||
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.products?.some(p => 
          p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || // Changed from p.product?.name
          p.sku?.toLowerCase().includes(searchTerm.toLowerCase())     // Changed from p.product?.sku
        )
      );
      setFilteredOrders(filtered);
    }
  }, [searchTerm, orders]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/order/admin/orders', {
        method: 'GET',
        headers: {
          'Authorization': AuthorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data);
        setFilteredOrders(data);
      } else {
        throw new Error('Failed to fetch orders');
      }
    } catch (error) {
      toast.error('Error fetching orders: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': AuthorizationToken,
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        toast.success('Order status updated successfully');
        fetchOrders(); // Refresh orders
      } else {
        throw new Error('Failed to update order status');
      }
    } catch (error) {
      toast.error('Error updating order: ' + error.message);
    }
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/admin/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': AuthorizationToken,
        },
      });

      if (response.ok) {
        toast.success('Order deleted successfully');
        fetchOrders(); // Refresh orders
      } else {
        throw new Error('Failed to delete order');
      }
    } catch (error) {
      toast.error('Error deleting order: ' + error.message);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'completed': return 'bg-success';
      case 'pending': return 'bg-warning';
      case 'cancelled': return 'bg-danger';
      case 'processing': return 'bg-info';
      default: return 'bg-secondary';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleOrderDetails = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">
              <FaBox className="me-2" />
              Product Orders Management
            </h2>
            <div className="input-group" style={{ maxWidth: '300px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="input-group-text">
                <FaSearch />
              </span>
            </div>
          </div>

          {/* Order Statistics */}
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card bg-primary text-white text-center p-3">
                <h4>{orders.length}</h4>
                <small>Total Orders</small>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-success text-white text-center p-3">
                <h4>{orders.filter(o => o.status === 'completed').length}</h4>
                <small>Completed</small>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-warning text-white text-center p-3">
                <h4>{orders.filter(o => o.status === 'pending').length}</h4>
                <small>Pending</small>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-info text-white text-center p-3">
                <h4>{orders.filter(o => o.status === 'processing').length}</h4>
                <small>Processing</small>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="card">
            <div className="card-body">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-4">
                  <h5 className="text-muted">No orders found</h5>
                </div>
              ) : (
                <div className="orders-list">
                  {filteredOrders.map((order) => (
                    <div key={order._id} className="order-card mb-4 border rounded p-3">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <h6 className="fw-bold">Order #: {order._id.slice(-8).toUpperCase()}</h6>
                          <small className="text-muted">{formatDate(order.createdAt)}</small>
                        </div>
                        <select
                          className={`form-select form-select-sm ${getStatusBadgeClass(order.status)} text-white`}
                          value={order.status || 'pending'}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          style={{ width: 'auto' }}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="customer-info mb-3">
                            <h6 className="fw-bold border-bottom pb-1">Customer Information</h6>
                            <div className="d-flex align-items-center mb-1">
                              <FaUser className="me-2 text-muted" />
                              <span>{order.user?.name || 'N/A'}</span>
                            </div>
                            <div className="d-flex align-items-center mb-1">
                              <FaPhone className="me-2 text-muted" />
                              <span>{order.user?.contact || 'N/A'}</span>
                            </div>
                            <div className="small text-muted">{order.user?.email || ''}</div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="order-summary">
                            <h6 className="fw-bold border-bottom pb-1">Order Summary</h6>
                            <div className="d-flex justify-content-between">
                              <span>Items:</span>
                              <span>{order.products?.length || 0}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                              <span>Total Amount:</span>
                              <span className="fw-bold text-success">
                                <FaMoneyBill className="me-1" />
                                ₨{order.totalAmount?.toLocaleString() || '0'}
                              </span>
                            </div>
                            <div className="d-flex justify-content-between">
                              <span>Payment Status:</span>
                              <span className={order.paymentStatus === 'paid' ? 'text-success' : 'text-danger'}>
                                {order.paymentStatus || 'pending'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-center mt-2">
                        <button 
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => toggleOrderDetails(order._id)}
                        >
                          {expandedOrder === order._id ? (
                            <>
                              <FaChevronUp className="me-1" />
                              Hide Products
                            </>
                          ) : (
                            <>
                              <FaChevronDown className="me-1" />
                              View Products
                            </>
                          )}
                        </button>
                      </div>

                      {expandedOrder === order._id && (
                        <div className="products-details mt-3">
                          <h6 className="fw-bold border-bottom pb-2">Products in this Order</h6>
                          {order.products?.map((item, index) => (
                            <div key={index} className="product-item d-flex align-items-center border-bottom pb-3 mb-3">
                              <div className="flex-shrink-0 me-3">
                                {item.image ? (
                                  <img 
                                    src={`http://localhost:5000${item.image}`} 
                                    alt={item.name}
                                    className="img-fluid rounded"
                                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                    onError={(e) => {
                                      e.target.src = '/Fypimgs/default-product.jpg';
                                    }}
                                  />
                                ) : (
                                  <div 
                                    className="d-flex align-items-center justify-content-center bg-secondary text-white rounded"
                                    style={{ width: '80px', height: '80px' }}
                                  >
                                    <FaBox size={24} />
                                  </div>
                                )}
                              </div>
                              <div className="flex-grow-1">
                                <div className="fw-bold">{item.name || 'Unnamed Product'}</div>
                                <div className="small text-muted">SKU: {item.sku || 'N/A'}</div>
                                <div className="small text-muted">Category: {item.category || 'N/A'}</div>
                                <div className="small text-muted">Quantity: {item.quantity || 1}</div>
                                <div className="small text-muted">Unit Price: ₨{item.price?.toLocaleString() || '0'}</div>
                              </div>
                              <div className="flex-shrink-0 fw-bold">
                                ₨{item.price ? (item.price * (item.quantity || 1)).toLocaleString() : '0'}
                              </div>
                            </div>
                          ))}
                          
                          <div className="d-flex justify-content-between border-top pt-2 mt-2">
                            <span className="fw-bold">Order Total:</span>
                            <span className="fw-bold text-success fs-5">
                              ₨{order.totalAmount?.toLocaleString() || '0'}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="d-flex justify-content-end mt-3">
                        <button
                          className="btn btn-sm btn-outline-danger me-2"
                          title="Delete Order"
                          onClick={() => deleteOrder(order._id)}
                        >
                          <FaTrash className="me-1" />
                          Delete Order
                        </button>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          title="View Full Details"
                          onClick={() => {/* Add view details modal */}}
                        >
                          <FaEye className="me-1" />
                          Full Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrdersPanel;