
// test code
import React, { useState, useEffect } from "react";
import { FaTrash, FaSearch, FaTimes, FaTools, FaRegWindowClose, FaMoneyBillWave } from "react-icons/fa";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";

const CartOrders = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { AuthorizationToken } = useAuth();
  
  const displayedUsers = isSearchActive ? filteredUsers : users;

  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:5000/profileorder", {
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

  // Cancel order function
  const cancelOrder = async (orderId) => {
    try {
      if (!window.confirm("Are you sure you want to cancel this order?")) {
        return;
      }

      const response = await fetch(`http://localhost:5000/api/order/cancel/${orderId}`, {
        method: "PATCH",
        headers: {
          Authorization: AuthorizationToken,
          "Content-Type": "application/json"
        },
      });

      if (response.ok) {
        toast.success("Order cancelled successfully");
        getAllUsersData();
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg || "Failed to cancel order");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Error cancelling order");
    }
  }

  // Delete order function
  const deleteOrder = async (orderId) => {
    try {
      if (!window.confirm("Are you sure you want to permanently delete this order? This action cannot be undone.")) {
        return;
      }

      const response = await fetch(`http://localhost:5000/api/order/delete/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: AuthorizationToken,
          "Content-Type": "application/json"
        },
      });

      if (response.ok) {
        toast.success("Order deleted permanently");
        getAllUsersData();
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg || "Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Error deleting order");
    }
  }

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
      <div className="container-fluid py-4 px-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">
            <FaTools className="me-2 my-0 py-0 title-icon" /> My Booked Orders
          </h2>
          
          {/* Search functionality */}
          <div className="d-flex" style={{ maxWidth: '300px' }}>
            <input
              type="text"
              className="form-control me-2 shadow-none orange-border"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="btn orange-btn" onClick={handleSearch}>
              <FaSearch />
            </button>
          </div>
        </div>

        {displayedUsers.length > 0 ? (
          <div className="row">
            {displayedUsers.map((order, index) => (
              <div key={index} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-header bg-white border-0 pt-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="card-title mb-0 text-dark">{order.name}</h5>
                      <span className={`badge rounded-pill ${
                        order.status === 'completed' ? 'orange-bg' :
                        order.status === 'cancelled' ? 'orange-bg' :
                        order.status === 'in-progress' ? 'orange-bg' :
                        'bg-secondary'
                      }`}>
                        {order.status || 'pending'}
                      </span>
                    </div>
                    <small className="text-muted">
                      Ordered on: {formatDate(order.createdAt)}
                    </small>
                  </div>
                  
                  <div className="card-body">
                    <div className="mb-2">
                      <strong>📞 Contact:</strong> {order.contact}
                    </div>
                    <div className="mb-2">
                      <strong>🏙️ City:</strong> {order.city}
                    </div>
                    <div className="mb-2">
                      <strong>📍 Address:</strong> {order.address}
                    </div>
                    <div className="mb-2">
                      <strong>🔧 Service:</strong> {order.service}
                    </div>
                    <div className="mb-2">
                      <strong>📋 Type:</strong> {order.service_type}
                    </div>
                     {/* <div className="mb-2">
                      <strong>📋 Service Price:</strong>  {order.servicePrice > 0 ? `${order.servicePrice}PKR` : 'Not priced yet'}
                    </div> */}
                    
                    {/* Price Display */}
                    <div className="mb-3">
                      <div className="">
                        <strong>💵 Service Price: </strong>
                        <span className={`fw-bold ${
                          order.servicePrice > 0 ? 'primary-color' : 'text-muted'
                        }`}>
                          {order.servicePrice > 0 ? `${order.servicePrice} PKR` : 'Not priced yet'}
                        </span>
                      </div>
                    </div>

                    {/* Problem Description */}
                    {order.problem && (
                      <div className="mb-3">
                        <strong>📝 Problem Description:</strong>
                        <p className="text-muted mt-1 mb-0">{order.problem}</p>
                      </div>
                    )}

                    {/* Completion Date (if completed) */}
                    {order.status === 'completed' && order.completedAt && (
                      <div className="mb-2">
                        <strong>✅ Completed on:</strong> {formatDate(order.completedAt)}
                      </div>
                    )}
                  </div>
                  
                  <div className="card-footer bg-white border-0 pt-0">
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      {/* Cancel Button - only show for non-cancelled/non-completed orders */}
                      {order.status !== 'cancelled' && order.status !== 'completed' && (
                        <button 
                          onClick={() => cancelOrder(order._id)} 
                          className="btn black-btn btn-sm me-md-2"
                          title="Cancel Order"
                        >
                          <FaTimes className="me-1" /> Cancel
                        </button>
                      )}
                      
                      {/* Delete Button - show for all orders except completed ones if you want restrictions */}
                      {(order.status !== 'completed') && (
                        <button 
                          onClick={() => deleteOrder(order._id)} 
                          className="btn  orange-btn btn-sm"
                          title="Permanently Delete Order"
                        >
                          <FaTrash className="me-1" /> Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <div className="card shadow-sm border-0">
              <div className="card-body py-5">
                <div className="text-muted mb-3">
                  <FaTools size={48} />
                </div>
                <h5 className="text-muted">No orders found</h5>
                <p className="text-muted mb-0">You haven't placed any service orders yet.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats Summary */}
      
      {displayedUsers.length > 0 && (
        <div className="container-fluid mt-4 mb-4 px-5 bg-light">
          <div className="row">
            <h3 className="my-3">Orders History</h3>
            <div className="col-md-3 col-6 mb-2">
              <div className="card black-bg text-white text-center p-3">
                <h4>{displayedUsers.length}</h4>
                <small>Total Orders</small>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-2">
              <div className="card orange-bg text-white text-center p-3">
                <h4>{displayedUsers.filter(o => o.status === 'completed').length}</h4>
                <small>Completed</small>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-2">
              <div className="card black-bg text-white text-center p-3">
                <h4>{displayedUsers.filter(o => o.status === 'in-progress' || o.status === 'pending').length}</h4>
                <small>In Progress</small>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-2">
              <div className="card orange-bg text-white text-center p-3">
                <h4>{displayedUsers.filter(o => o.status === 'cancelled').length}</h4>
                <small>Cancelled</small>
              </div>
            </div>
          </div>
          
        </div>
        
      )}
      
    </>
  );
};

export default CartOrders;