


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../store/auth';
// import { useCart } from '../store/cart';
// import { FaShoppingCart } from 'react-icons/fa';

// const ProductCard = ({ product }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const { isLoggedIn } = useAuth();
//   const { addToCart } = useCart();
//   const [quantity] = useState(1); // Default quantity is 1 for product cards
//   const [showLoginMessage, setShowLoginMessage] = useState(false);

//   const mainImage = product.images && product.images.length > 0 
//     ? `http://localhost:5000${product.images[currentImageIndex]}`
//     : '/Fypimgs/default-product.jpg';

//   const hasDiscount = product.originalPrice && product.originalPrice > product.price;

//   const handleAddToCart = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     if (!isLoggedIn) {
//       setShowLoginMessage(true);
//       // Hide message after 3 seconds
//       setTimeout(() => setShowLoginMessage(false), 3000);
//       return;
//     }
    
//     addToCart(product, quantity);
//     console.log('Added to cart:', product._id, quantity);
//   };

//   return (
//     <div className="card h-100 product-card shadow-sm">
//       <div className="position-relative">
//         <Link to={`/product/${product._id}`} className="text-decoration-none">
//           <img 
//             src={mainImage} 
//             className="card-img-top product-image" 
//             alt={product.name}
//             style={{ height: '200px', objectFit: 'cover' }}
//             onError={(e) => {
//               e.target.src = '/Fypimgs/default-product.jpg';
//             }}
//           />
//         </Link>
        
//         {hasDiscount && (
//           <span className="position-absolute top-0 start-0 badge bg-danger m-2">
//             Sale
//           </span>
//         )}
        
//         {product.stock === 0 && (
//           <span className="position-absolute top-0 end-0 badge bg-secondary m-2">
//             Out of Stock
//           </span>
//         )}
//       </div>

//       <div className="card-body d-flex flex-column">
//         <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
//           <h5 className="card-title">{product.name}</h5>
//         </Link>
        
//         <div className="mb-2">
//           <span className="h5">₨{product.price.toLocaleString()}</span>
//           {hasDiscount && (
//             <span className="text-muted text-decoration-line-through ms-2">
//               ₨{product.originalPrice.toLocaleString()}
//             </span>
//           )}
//         </div>

//         <div className="mb-2">
//           <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
//             {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
//           </span>
//           <span className="badge bg-dark ms-1 text-capitalize">{product.category}</span>
//         </div>

//         {product.rating && product.rating.count > 0 && (
//           <div className="mb-2">
//             <small className="text-warning">
//               {'★'.repeat(Math.round(product.rating.average))}
//               {'☆'.repeat(5 - Math.round(product.rating.average))}
//             </small>
//             <small className="text-muted ms-1">({product.rating.count})</small>
//           </div>
//         )}

//         <div className="mt-auto">
//           <div className="d-flex gap-2 mb-2">
//             <Link to={`/product/${product._id}`} className="btn btn-outline-dark flex-fill">
//               Details
//             </Link>
            
//             {product.stock > 0 && (
//               <button 
//                 className="btn orange-btn flex-fill d-flex align-items-center justify-content-center"
//                 onClick={handleAddToCart}
//                 disabled={product.stock === 0}
//               >
//                 <FaShoppingCart className="me-1" />
//                 Add to Cart
//               </button>
//             )}
//           </div>
          
//           {showLoginMessage && (
//             <div className="alert alert-warning py-1 mt-2 mb-0" role="alert">
//               <small>Please login to add to cart</small>
//             </div>
//           )}
          
//           {!isLoggedIn && product.stock > 0 && !showLoginMessage && (
//             <small className="text-muted d-block text-center mt-1">
//               Login to add to cart
//             </small>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;




import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { useCart } from '../store/cart';
import { FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { isLoggedIn } = useAuth();
  const { addToCart } = useCart();
  const [quantity] = useState(1); // Default quantity is 1 for product cards
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const mainImage = product.images && product.images.length > 0 
    ? `http://localhost:5000${product.images[currentImageIndex]}`
    : '/Fypimgs/default-product.jpg';

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isLoggedIn) {
      setShowLoginMessage(true);
      // Hide message after 3 seconds
      setTimeout(() => setShowLoginMessage(false), 3000);
      return;
    }
    
    addToCart(product, quantity);
    toast.success("Added to cart", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    console.log('Added to cart:', product._id, quantity);
  };

  return (
    <div className="card h-100 product-card shadow-sm">
      <div className="position-relative">
        <Link to={`/product/${product._id}`} className="text-decoration-none">
          <img 
            src={mainImage} 
            className="card-img-top product-image" 
            alt={product.name}
            style={{ height: '200px', objectFit: 'cover' }}
            onError={(e) => {
              e.target.src = '/Fypimgs/default-product.jpg';
            }}
          />
        </Link>
        
        {hasDiscount && (
          <span className="position-absolute top-0 start-0 badge bg-danger m-2">
            Sale
          </span>
        )}
        
        {product.stock === 0 && (
          <span className="position-absolute top-0 end-0 badge bg-secondary m-2">
            Out of Stock
          </span>
        )}
      </div>

      <div className="card-body d-flex flex-column">
        <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
          <h5 className="card-title">{product.name}</h5>
        </Link>
        
        <div className="mb-2">
          <span className="h5">₨{product.price.toLocaleString()}</span>
          {hasDiscount && (
            <span className="text-muted text-decoration-line-through ms-2">
              ₨{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        <div className="mb-2">
          <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
            {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
          </span>
          <span className="badge bg-dark ms-1 text-capitalize">{product.category}</span>
        </div>

        {product.rating && product.rating.count > 0 && (
          <div className="mb-2">
            <small className="text-warning">
              {'★'.repeat(Math.round(product.rating.average))}
              {'☆'.repeat(5 - Math.round(product.rating.average))}
            </small>
            <small className="text-muted ms-1">({product.rating.count})</small>
          </div>
        )}

        <div className="mt-auto">
          <div className="d-flex gap-2 mb-2">
            <Link to={`/product/${product._id}`} className="btn btn-outline-dark flex-fill">
              Details
            </Link>
            
            {product.stock > 0 && (
              <button 
                className="btn orange-btn flex-fill d-flex align-items-center justify-content-center"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <FaShoppingCart className="me-1" />
                Add to Cart
              </button>
            )}
          </div>
          
          {showLoginMessage && (
            <div className="alert alert-warning py-1 mt-2 mb-0" role="alert">
              <small>Please login to add to cart</small>
            </div>
          )}
          
          {!isLoggedIn && product.stock > 0 && !showLoginMessage && (
            <small className="text-muted d-block text-center mt-1">
              Login to add to cart
            </small>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;