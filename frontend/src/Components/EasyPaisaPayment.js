import React, { useState } from 'react';
import { FaMobileAlt, FaCreditCard, FaExchangeAlt } from 'react-icons/fa';

const EasyPaisaPayment = () => {
  const [activeTab, setActiveTab] = useState('mobile');
  const [formData, setFormData] = useState({
    mobileNumber: '',
    amount: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    recipientMobile: '',
    transferAmount: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Payment submitted: ${JSON.stringify(formData)}`);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="col-md-9 p-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">EasyPaisa Payment Gateway</h4>
        </div>
        
        <div className="card-body">
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'mobile' ? 'active' : ''}`}
                onClick={() => setActiveTab('mobile')}
              >
                <FaMobileAlt className="me-2" />
                Mobile Account
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'card' ? 'active' : ''}`}
                onClick={() => setActiveTab('card')}
              >
                <FaCreditCard className="me-2" />
                Credit/Debit Card
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'transfer' ? 'active' : ''}`}
                onClick={() => setActiveTab('transfer')}
              >
                <FaExchangeAlt className="me-2" />
                Money Transfer
              </button>
            </li>
          </ul>

          {activeTab === 'mobile' && (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Mobile Number</label>
                <input
                  type="tel"
                  className="form-control"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="03XX-XXXXXXX"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Amount (PKR)</label>
                <input
                  type="number"
                  className="form-control"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="1000"
                  min="100"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Pay via Mobile Account
              </button>
            </form>
          )}

          {activeTab === 'card' && (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Card Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Expiry Date</label>
                  <input
                    type="text"
                    className="form-control"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">CVV</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Amount (PKR)</label>
                <input
                  type="number"
                  className="form-control"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="1000"
                  min="100"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Pay with Card
              </button>
            </form>
          )}

          {activeTab === 'transfer' && (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Recipient Mobile Number</label>
                <input
                  type="tel"
                  className="form-control"
                  name="recipientMobile"
                  value={formData.recipientMobile}
                  onChange={handleChange}
                  placeholder="03XX-XXXXXXX"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Amount (PKR)</label>
                <input
                  type="number"
                  className="form-control"
                  name="transferAmount"
                  value={formData.transferAmount}
                  onChange={handleChange}
                  placeholder="1000"
                  min="100"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Your Mobile Number</label>
                <input
                  type="tel"
                  className="form-control"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="03XX-XXXXXXX"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Transfer Money
              </button>
            </form>
          )}

          <div className="mt-4 p-3 bg-light rounded">
            <h5 className="mb-3">Payment Security</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <i className="bi bi-shield-check text-success me-2"></i>
                All transactions are 100% secure
              </li>
              <li className="mb-2">
                <i className="bi bi-lock text-success me-2"></i>
                Your data is encrypted end-to-end
              </li>
              <li>
                <i className="bi bi-credit-card text-success me-2"></i>
                We don't store your card details
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EasyPaisaPayment;