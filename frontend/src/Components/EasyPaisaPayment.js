
// final test code

import React, { useState } from 'react';

const EasyPaisaPayment = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    amount: '',
    email: '',
    description: '',
    senderContact: '',
    receiverContact: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Payment data:', formData);
    alert('Payment processed successfully!');
  };

  return (
    <div className="container-fluid bg-light min-vh-100 py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header orange-bg text-white text-center py-4 rounded-top-4">
              <h2 className="mb-0 fw-bold">
                <i className="bi bi-wallet2 me-2"></i>
                EasyPaisa Payment
              </h2>
              <p className="mb-0 mt-2">Secure and fast mobile payments</p>
            </div>
            
            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12 col-lg-6 mb-4">
                    <label htmlFor="senderContact" className="form-label fw-semibold">Sender Contact</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-person text-primary"></i>
                      </span>
                      <input 
                        type="text" 
                        className="form-control py-3  shadow-none border-none" 
                        id="senderContact"
                        name="senderContact"
                        placeholder="Sender contact info"
                        value={formData.senderContact}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="col-12 col-lg-6 mb-4">
                    <label htmlFor="receiverContact" className="form-label fw-semibold">Receiver Contact</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-person-check text-primary"></i>
                      </span>
                      <input 
                        type="text" 
                        className="form-control py-3  shadow-none border-none" 
                        id="receiverContact"
                        name="receiverContact"
                        placeholder="Receiver contact info"
                        value={formData.receiverContact}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="phoneNumber" className="form-label fw-semibold">Mobile Number</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="bi bi-phone text-primary"></i>
                    </span>
                    <input 
                      type="tel" 
                      className="form-control py-3  shadow-none border-none" 
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="03XX XXXXXXX"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="amount" className="form-label fw-semibold">Amount (PKR)</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="bi bi-currency-rupee text-primary"></i>
                    </span>
                    <input 
                      type="number" 
                      className="form-control py-3  shadow-none border-none" 
                      id="amount"
                      name="amount"
                      placeholder="Enter amount"
                      min="1"
                      value={formData.amount}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="form-label fw-semibold">Email (Optional)</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="bi bi-envelope text-primary"></i>
                    </span>
                    <input 
                      type="email" 
                      className="form-control py-3  shadow-none border-none" 
                      id="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="description" className="form-label fw-semibold">Payment Description</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="bi bi-pencil-square text-primary"></i>
                    </span>
                    <input 
                      type="text" 
                      className="form-control py-3 shadow-none border-none" 
                      id="description"
                      name="description"
                      placeholder="Brief description of payment"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="form-check mb-4">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="termsCheck" 
                    required 
                  />
                  <label className="form-check-label" htmlFor="termsCheck">
                    I agree to the <a href="#" className="text-decoration-none">Terms and Conditions</a>
                  </label>
                </div>
                
                <div className="d-grid">
                  <button 
                    type="submit" 
                    className="btn orange-btn btn-lg py-3 fw-bold text-uppercase"
                  >
                    Pay Now
                  </button>
                </div>
              </form>
            </div>
            
            <div className="card-footer black-bg  text-white text-center py-3 rounded-bottom-4">
              <p className="mb-0 text-white">
                <small>Secure payment powered by EasyPaisa</small>
              </p>
            </div>
          </div>
          
          <div className="row mt-4">
            <div className="col-12 col-md-4 mb-3">
              <div className="d-flex align-items-center justify-content-center">
                <div className="me-2 text-primary">
                  <i className="bi bi-shield-check fs-4"></i>
                </div>
                <div>
                  <h6 className="mb-0">Secure</h6>
                  <small className="text-muted">Encrypted transaction</small>
                </div>
              </div>
            </div>
            
            <div className="col-12 col-md-4 mb-3">
              <div className="d-flex align-items-center justify-content-center">
                <div className="me-2 text-primary">
                  <i className="bi bi-lightning-charge fs-4"></i>
                </div>
                <div>
                  <h6 className="mb-0">Fast</h6>
                  <small className="text-muted">Instant processing</small>
                </div>
              </div>
            </div>
            
            <div className="col-12 col-md-4 mb-3">
              <div className="d-flex align-items-center justify-content-center">
                <div className="me-2 text-primary">
                  <i className="bi bi-headset fs-4"></i>
                </div>
                <div>
                  <h6 className="mb-0">Support</h6>
                  <small className="text-muted">24/7 help center</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EasyPaisaPayment;