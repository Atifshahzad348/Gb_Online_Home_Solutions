import React, { useState, useEffect } from 'react';
import { FaBox, FaTimes, FaCheck, FaHistory, FaExclamationTriangle } from 'react-icons/fa';

const Ordershow = () => {
  // Sample orders data - replace with actual data from your backend
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Replace with actual API call
        // const response = await axios.get('/api/orders');
        // setOrders(response.data);
        
        // Mock data for demonstration
        setTimeout(() => {
          setOrders([
            {
              id: 'ORD-12345',
              service: 'Web Development Package',
              date: '2023-05-15',
              status: 'pending',
              amount: 25000,
              materials: [
                { name: 'Domain', price: 2000 },
                { name: 'Hosting', price: 5000 },
                { name: 'Development', price: 18000 }
              ]
            },
            {
              id: 'ORD-67890',
              service: 'Mobile App Development',
              date: '2023-05-10',
              status: 'completed',
              amount: 45000,
              materials: [
                { name: 'UI/UX Design', price: 10000 },
                { name: 'Backend Development', price: 25000 },
                { name: 'Testing', price: 10000 }
              ]
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      // API call to cancel order would go here
      setOrders(orders.filter(order => order.id !== orderId));
      alert('Order cancelled successfully');
    }
  };

  const handleConfirmOrder = (orderId) => {
    // API call to confirm order would go here
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'completed' } : order
    ));
    alert('Order confirmed successfully');
  };

  if (loading) {
    return (
      <div className="col-md-9 p-4">
        <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-md-9 p-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">
            <FaBox className="me-2" />
            My Orders
          </h4>
          <span className="badge bg-light text-dark">
            {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
          </span>
        </div>

        <div className="card-body">
          {orders.length === 0 ? (
            <div className="text-center py-5">
              <FaBox className="display-4 text-muted mb-3" />
              <h4>No Orders Yet</h4>
              <p className="text-muted">You haven't placed any orders yet. Browse our services to get started!</p>
              <button className="btn btn-primary mt-3">
                Browse Services
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Service</th>
                    <th>Materials/Products</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.service}</td>
                      <td>
                        <ul className="list-unstyled mb-0">
                          {order.materials.map((material, index) => (
                            <li key={index}>
                              {material.name} - Rs. {material.price.toLocaleString()}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td>{new Date(order.date).toLocaleDateString()}</td>
                      <td>Rs. {order.amount.toLocaleString()}</td>
                      <td>
                        <span className={`badge ${
                          order.status === 'completed' ? 'bg-success' : 
                          order.status === 'cancelled' ? 'bg-danger' : 'bg-warning'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        {order.status === 'pending' && (
                          <div className="d-flex gap-2">
                            <button 
                              className="btn btn-sm btn-success"
                              onClick={() => handleConfirmOrder(order.id)}
                            >
                              <FaCheck />
                            </button>
                            <button 
                              className="btn btn-sm btn-danger"
                              onClick={() => handleCancelOrder(order.id)}
                            >
                              <FaTimes />
                            </button>
                          </div>
                        )}
                        {order.status === 'completed' && (
                          <button className="btn btn-sm btn-outline-primary">
                            <FaHistory /> Track
                          </button>
                        )}
                        {order.status === 'cancelled' && (
                          <span className="text-muted">
                            <FaExclamationTriangle /> Cancelled
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {orders.length > 0 && (
          <div className="card-footer bg-light">
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">
                Showing {orders.length} of {orders.length} orders
              </small>
              <button className="btn btn-sm btn-outline-secondary">
                <FaHistory /> Order History
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ordershow;