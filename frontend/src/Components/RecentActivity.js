
import React, { useState, useEffect } from "react";
import { FaTrash, FaSearch, FaUser } from "react-icons/fa";
import { useAuth } from "../store/auth";
import { FaUsers } from "react-icons/fa";
import { toast } from 'react-toastify';

const RecentActivity = () => {
  const [orders, setOrders] = useState([]);
  const { AuthorizationToken } = useAuth();

  // Fetch recent orders from your API
  const fetchRecentOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/clientorders", {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      
      if (response.ok) {
        const ordersData = await response.json();
        setOrders(ordersData);
      } else {
        console.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchRecentOrders();
    // Set up interval to refresh orders periodically
    const interval = setInterval(fetchRecentOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'Pending': return 'warning';
      case 'In Progress': return 'primary';
      case 'Cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  // Function to calculate time ago
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  };

  return (
    <div className="card" style={{ borderRadius: '15px', padding: '20px' }}>
      <h5 className="mb-4">Recent Orders</h5>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Client</th>
              <th>Service</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.userId?.name || 'Unknown Client'}</td>
                  <td>{order.serviceType || 'Unknown Service'}</td>
                  <td>{getTimeAgo(order.createdAt || order.orderDate)}</td>
                  <td>
                    <span className={`badge bg-${getStatusColor(order.status)}`}>
                      {order.status || 'Pending'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No recent orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivity;