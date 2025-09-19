import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useCart } from '../store/cart';
import { FaPlus, FaMinus, FaTrash, FaShoppingBag, FaArrowLeft } from 'react-icons/fa';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleIncrement = (productId, currentQuantity) => {
    handleQuantityChange(productId, currentQuantity + 1);
  };

  const handleDecrement = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      handleQuantityChange(productId, currentQuantity - 1);
    }
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar firstName="GB-Home-" lastName="Solutions" />
        <div className="container py-5">
          <div className="row">
            <div className="col-12">
              <div className="text-center py-5">
                <FaShoppingBag className="display-1 text-muted mb-4" />
                <h2>Your Cart is Empty</h2>
                <p className="text-muted mb-4">Looks like you haven't added any products to your cart yet.</p>
                <Link to="/shop" className="btn btn-primary btn-lg">
                  <FaArrowLeft className="me-2" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar firstName="GB-Home-" lastName="Solutions" />
      
      {/* Breadcrumb */}
      <div className="bg-light py-3">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/shop" className="text-decoration-none">Shop</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Shopping Cart
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Cart Section */}
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Shopping Cart</h2>
              <span className="text-muted">{cartItems.length} item(s)</span>
            </div>

            {/* Cart Items */}
            <div className="card mb-4">
              <div className="card-body p-0">
                {cartItems.map((item) => (
                  <div key={item.product._id} className="row g-0 align-items-center border-bottom p-3">
                    {/* Product Image */}
                    <div className="col-md-2">
                      <img
                        src={item.product.images && item.product.images.length > 0 
                          ? `http://localhost:5000${item.product.images[0]}`
                          : '/Fypimgs/default-product.jpg'
                        }
                        alt={item.product.name}
                        className="img-fluid rounded"
                        style={{ height: '80px', width: '80px', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.src = '/Fypimgs/default-product.jpg';
                        }}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="col-md-4 ps-md-3">
                      <h6 className="mb-1">{item.product.name}</h6>
                      <p className="text-muted mb-0 small">{item.product.category}</p>
                      <p className="mb-0 text-primary fw-bold">₨{item.product.price.toLocaleString()}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="col-md-3">
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleDecrement(item.product._id, item.quantity)}
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus />
                        </button>
                        
                        <input
                          type="number"
                          className="form-control form-control-sm mx-2 text-center"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value) || 1)}
                          min="1"
                          style={{ width: '60px' }}
                        />
                        
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleIncrement(item.product._id, item.quantity)}
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="col-md-2 text-center">
                      <p className="mb-0 fw-bold">₨{(item.product.price * item.quantity).toLocaleString()}</p>
                    </div>

                    {/* Remove Button */}
                    <div className="col-md-1 text-end">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeFromCart(item.product._id)}
                        title="Remove item"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="d-flex justify-content-between">
              <Link to="/shop" className="btn btn-outline-primary">
                <FaArrowLeft className="me-2" />
                Continue Shopping
              </Link>
              
              <button
                className="btn btn-outline-danger"
                onClick={clearCart}
              >
                <FaTrash className="me-2" />
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header bg-light">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                {/* Subtotal */}
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>₨{getCartTotal().toLocaleString()}</span>
                </div>

                {/* Shipping */}
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span className={getCartTotal() > 5000 ? 'text-success' : ''}>
                    {getCartTotal() > 5000 ? 'FREE' : '₨500'}
                  </span>
                </div>

                {/* Tax */}
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax (13%):</span>
                  <span>₨{(getCartTotal() * 0.13).toLocaleString()}</span>
                </div>

                <hr />

                {/* Total */}
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total:</strong>
                  <strong className="text-primary">
                    ₨{(getCartTotal() + (getCartTotal() > 5000 ? 0 : 500) + (getCartTotal() * 0.13)).toLocaleString()}
                  </strong>
                </div>

                {/* Checkout Button */}
                <button className="btn btn-primary w-100 mb-3">
                  Proceed to Checkout
                </button>

                {/* Promo Code */}
                <div className="mb-3">
                  <label htmlFor="promoCode" className="form-label">Promo Code</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      id="promoCode"
                      placeholder="Enter code"
                    />
                    <button className="btn btn-outline-secondary" type="button">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="text-center">
                  <div className="text-muted small mb-2">
                    <FaShoppingBag className="me-1" />
                    Secure checkout
                  </div>
                  <div className="text-muted small">
                    All transactions are secure and encrypted
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Cart;