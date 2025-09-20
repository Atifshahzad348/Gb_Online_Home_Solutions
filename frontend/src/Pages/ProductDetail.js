// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Navbar from '../Components/Navbar';
// import Footer from '../Components/Footer';
// import { useAuth } from '../store/auth';
// import { FaShoppingCart, FaHeart, FaStar, FaShare, FaChevronLeft, FaChevronRight, FaCheck, FaTruck, FaUndo, FaShieldAlt } from 'react-icons/fa';

// const ProductDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [isWishlisted, setIsWishlisted] = useState(false);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`http://localhost:5000/api/products/${id}`);
        
//         if (!response.ok) {
//           throw new Error('Product not found');
//         }
        
//         const data = await response.json();
        
//         if (data.success) {
//           setProduct(data.product);
//         } else {
//           throw new Error(data.message || 'Failed to fetch product');
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleAddToCart = () => {
//     if (!isLoggedIn) {
//       navigate('/login', { state: { from: `/product/${id}` } });
//       return;
//     }
    
//     console.log('Adding to cart:', product._id, quantity);
//     // Implement cart functionality here
//     // addToCart(product._id, quantity);
//   };

//   const handleBuyNow = () => {
//     if (!isLoggedIn) {
//       navigate('/login', { state: { from: `/product/${id}` } });
//       return;
//     }
    
//     console.log('Buy now:', product._id, quantity);
//     // Implement direct checkout functionality here
//   };

//   const handleToggleWishlist = () => {
//     if (!isLoggedIn) {
//       navigate('/login', { state: { from: `/product/${id}` } });
//       return;
//     }
    
//     setIsWishlisted(!isWishlisted);
//     console.log('Toggle wishlist:', product._id);
//   };

//   const handleNextImage = () => {
//     if (product.images && product.images.length > 0) {
//       setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
//     }
//   };

//   const handlePrevImage = () => {
//     if (product.images && product.images.length > 0) {
//       setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
//     }
//   };

//   const handleThumbnailClick = (index) => {
//     setSelectedImageIndex(index);
//   };

//   if (loading) {
//     return (
//       <>
//         <Navbar firstName="GB-Home-" lastName="Solutions" />
//         <div className="container py-5">
//           <div className="text-center py-5">
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//             <p className="mt-3">Loading product details...</p>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <Navbar firstName="GB-Home-" lastName="Solutions" />
//         <div className="container py-5">
//           <div className="text-center py-5">
//             <h2>Product Not Found</h2>
//             <p className="text-muted">{error}</p>
//             <button className="btn orange-btn mt-3" onClick={() => navigate('/shop')}>
//               Back to Shop
//             </button>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   if (!product) {
//     return null;
//   }

//   const mainImage = product.images && product.images.length > 0 
//     ? `http://localhost:5000${product.images[selectedImageIndex]}`
//     : '/Fypimgs/default-product.jpg';

//   const hasDiscount = product.originalPrice && product.originalPrice > product.price;
//   const discountPercentage = hasDiscount 
//     ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
//     : 0;

//   return (
//     <>
//       <Navbar firstName="GB-Home-" lastName="Solutions" />
      
//       {/* Breadcrumb */}
//       <div className="container-fluid bg-light py-3">
//         <div className="container">
//           <nav aria-label="breadcrumb">
//             <ol className="breadcrumb mb-0">
//               <li className="breadcrumb-item">
//                 <a href="/" className="text-decoration-none">Home</a>
//               </li>
//               <li className="breadcrumb-item">
//                 <a href="/shop" className="text-decoration-none">Shop</a>
//               </li>
//               <li className="breadcrumb-item">
//                 <a href={`/shop?category=${product.category}`} className="text-decoration-none text-capitalize">
//                   {product.category}
//                 </a>
//               </li>
//               <li className="breadcrumb-item active" aria-current="page">
//                 {product.name}
//               </li>
//             </ol>
//           </nav>
//         </div>
//       </div>

//       {/* Product Section */}
//       <div className="container py-5">
//         <div className="row">
//           {/* Product Images */}
//           <div className="col-lg-6">
//             <div className="product-image-container mb-4">
//               <div className="main-image position-relative mb-3">
//                 <img
//                   src={mainImage}
//                   alt={product.name}
//                   className="img-fluid rounded border"
//                   style={{ width: '100%', height: '400px', objectFit: 'cover' }}
//                   onError={(e) => {
//                     e.target.src = '/Fypimgs/default-product.jpg';
//                   }}
//                 />
                
//                 {product.images && product.images.length > 1 && (
//                   <>
//                     <button
//                       className="position-absolute top-50 start-0 translate-middle-y btn btn-dark rounded-circle ms-2"
//                       onClick={handlePrevImage}
//                       style={{ zIndex: 2 }}
//                     >
//                       <FaChevronLeft />
//                     </button>
//                     <button
//                       className="position-absolute top-50 end-0 translate-middle-y btn btn-dark rounded-circle me-2"
//                       onClick={handleNextImage}
//                       style={{ zIndex: 2 }}
//                     >
//                       <FaChevronRight />
//                     </button>
//                   </>
//                 )}
                
//                 {hasDiscount && (
//                   <span className="position-absolute top-0 start-0 badge bg-danger m-2 fs-6">
//                     -{discountPercentage}% OFF
//                   </span>
//                 )}
//               </div>

//               {/* Image Thumbnails */}
//               {product.images && product.images.length > 1 && (
//                 <div className="thumbnail-container d-flex gap-2">
//                   {product.images.map((image, index) => (
//                     <img
//                       key={index}
//                       src={`http://localhost:5000${image}`}
//                       alt={`${product.name} ${index + 1}`}
//                       className={`img-thumbnail cursor-pointer ${selectedImageIndex === index ? 'active border-primary' : ''}`}
//                       style={{
//                         width: '80px',
//                         height: '80px',
//                         objectFit: 'cover',
//                         cursor: 'pointer',
//                         opacity: selectedImageIndex === index ? 1 : 0.7
//                       }}
//                       onClick={() => handleThumbnailClick(index)}
//                       onError={(e) => {
//                         e.target.src = '/Fypimgs/default-product.jpg';
//                       }}
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Product Details */}
//           <div className="col-lg-6">
//             <div className="product-details">
//               {/* Category and Brand */}
//               <div className="mb-3">
//                 <span className="badge black-bg me-2 text-capitalize">
//                   {product.category}
//                 </span>
//                 {product.brand && (
//                   <span className="badge bg-secondary text-capitalize">
//                     {product.brand}
//                   </span>
//                 )}
//               </div>

//               {/* Product Name */}
//               <h1 className="h2 fw-bold mb-3">{product.name}</h1>

//               {/* Rating */}
//               {product.rating && product.rating.count > 0 && (
//                 <div className="d-flex align-items-center mb-3">
//                   <div className="text-warning me-2">
//                     {[...Array(5)].map((_, i) => (
//                       <FaStar
//                         key={i}
//                         className={i < Math.round(product.rating.average) ? 'filled' : 'empty'}
//                         style={{ fontSize: '1.2rem' }}
//                       />
//                     ))}
//                   </div>
//                   <span className="text-muted">
//                     ({product.rating.count} reviews)
//                   </span>
//                 </div>
//               )}

//               {/* Price */}
//               <div className="mb-4">
//                 <h2 className="sc-color fw-bold">
//                   ₨{product.price.toLocaleString()}
//                 </h2>
//                 {hasDiscount && (
//                   <div>
//                     <span className="text-muted text-decoration-line-through me-2">
//                       ₨{product.originalPrice.toLocaleString()}
//                     </span>
//                     <span className=" fw-bold">
//                       Save ₨{(product.originalPrice - product.price).toLocaleString()} ({discountPercentage}%)
//                     </span>
//                   </div>
//                 )}
//               </div>

//               {/* Description */}
//               <div className="mb-4">
//                 <h5 className="fw-bold mb-2">Description</h5>
//                 <p className="text-muted" style={{ lineHeight: '1.6' }}>
//                   {product.description}
//                 </p>
//               </div>

//               {/* Features */}
//               {product.features && product.features.length > 0 && (
//                 <div className="mb-4">
//                   <h5 className="fw-bold mb-2">Key Features</h5>
//                   <ul className="list-unstyled">
//                     {product.features.map((feature, index) => (
//                       <li key={index} className="mb-1">
//                         <FaCheck className="text-success me-2" />
//                         {feature}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {/* Stock Status */}
//               <div className="mb-4">
//                 <p className={product.stock > 0 ? 'text-success' : 'text-danger'}>
//                   <strong>
//                     {product.stock > 0 
//                       ? `In Stock (${product.stock} available)`
//                       : 'Out of Stock'
//                     }
//                   </strong>
//                 </p>
//               </div>

//               {/* Quantity Selector */}
//               {product.stock > 0 && (
//                 <div className="row mb-4">
//                   <div className="col-md-4">
//                     <label htmlFor="quantity" className="form-label fw-bold">Quantity:</label>
//                     <select
//                       id="quantity"
//                       className="form-select"
//                       value={quantity}
//                       onChange={(e) => setQuantity(parseInt(e.target.value))}
//                     >
//                       {[...Array(Math.min(product.stock, 10))].map((_, i) => (
//                         <option key={i + 1} value={i + 1}>
//                           {i + 1}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               )}

//               {/* Action Buttons */}
//               <div className="d-flex flex-wrap gap-3 mb-4">
//                 {product.stock > 0 ? (
//                   <>
//                     <button
//                       className="btn orange-btn flex-grow-1"
//                       onClick={handleBuyNow}
//                       style={{ minWidth: '200px' }}
//                     >
//                       <FaShoppingCart className="me-2" />
//                       Buy Now
//                     </button>
                    
//                     <button
//                       className="btn black-btn flex-grow-1"
//                       onClick={handleAddToCart}
//                       style={{ minWidth: '200px' }}
//                     >
//                       <FaShoppingCart className="me-2" />
//                       Add to Cart
//                     </button>
//                   </>
//                 ) : (
//                   <button className="btn btn-secondary" disabled>
//                     Out of Stock
//                   </button>
//                 )}
                
//                 <button
//                   className={`btn ${isWishlisted ? 'btn-danger' : 'btn-outline-danger'}`}
//                   onClick={handleToggleWishlist}
//                   title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
//                 >
//                   <FaHeart />
//                 </button>
                
//                 <button className="btn btn-outline-secondary" title="Share">
//                   <FaShare />
//                 </button>
//               </div>

//               {/* Product Benefits */}
//               <div className="border-top pt-4">
//                 <div className="row">
//                   <div className="col-md-4 text-center mb-3">
//                     <FaTruck className="text-primary mb-2" size={24} />
//                     <h6 className="fw-bold">Free Shipping</h6>
//                     <small className="text-muted">On orders over ₨5000</small>
//                   </div>
//                   <div className="col-md-4 text-center mb-3">
//                     <FaUndo className="text-primary mb-2" size={24} />
//                     <h6 className="fw-bold">30-Day Returns</h6>
//                     <small className="text-muted">Money-back guarantee</small>
//                   </div>
//                   <div className="col-md-4 text-center mb-3">
//                     <FaShieldAlt className="text-primary mb-2" size={24} />
//                     <h6 className="fw-bold">Secure Payment</h6>
//                     <small className="text-muted">SSL encrypted</small>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Specifications */}
//         {product.specifications && Object.keys(product.specifications).length > 0 && (
//           <div className="row mt-5">
//             <div className="col-12">
//               <div className="card">
//                 <div className="card-header bg-light">
//                   <h4 className="mb-0">Specifications</h4>
//                 </div>
//                 <div className="card-body">
//                   <div className="row">
//                     {Object.entries(product.specifications).map(([key, value], index) => (
//                       <div key={index} className="col-md-6 mb-2">
//                         <strong>{key}:</strong> {value}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Related Products (You can implement this later) */}
//         <div className="row mt-5">
//           <div className="col-12">
//             <h3 className="mb-4">Related Products</h3>
//             <div className="alert alert-info">
//               Related products section will be implemented soon.
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default ProductDetail;



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useAuth } from '../store/auth';
import { useCart } from '../store/cart';
import { 
  FaShoppingCart, FaHeart, FaStar, FaShare, FaChevronLeft, 
  FaChevronRight, FaCheck, FaTruck, FaUndo, FaShieldAlt,
  FaMinus, FaPlus
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, AuthorizationToken } = useAuth();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        
        if (!response.ok) {
          throw new Error('Product not found');
        }
        
        const data = await response.json();
        
        if (data.success) {
          setProduct(data.product);
        } else {
          throw new Error(data.message || 'Failed to fetch product');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: `/product/${id}` } });
      return;
    }
    
    setAddingToCart(true);
    try {
      addToCart(product, quantity);
      toast.success(`${quantity} ${product.name} added to cart!`);
    } catch (error) {
      toast.error('Failed to add to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: `/product/${id}` } });
      return;
    }
    
    await handleAddToCart();
    navigate('/cart');
  };

  const handleToggleWishlist = async () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: `/product/${id}` } });
      return;
    }
    
    try {
      // Implement wishlist functionality
      setIsWishlisted(!isWishlisted);
      toast.success(!isWishlisted ? 'Added to wishlist' : 'Removed from wishlist');
    } catch (error) {
      toast.error('Failed to update wishlist');
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) newQuantity = 1;
    if (product && newQuantity > product.stock) newQuantity = product.stock;
    setQuantity(newQuantity);
  };

  const handleNextImage = () => {
    if (product.images && product.images.length > 0) {
      setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const handlePrevImage = () => {
    if (product.images && product.images.length > 0) {
      setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  if (loading) {
    return (
      <>
        <Navbar firstName="GB-Home-" lastName="Solutions" />
        <div className="container py-5">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading product details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar firstName="GB-Home-" lastName="Solutions" />
        <div className="container py-5">
          <div className="text-center py-5">
            <h2>Product Not Found</h2>
            <p className="text-muted">{error}</p>
            <button className="btn orange-btn mt-3" onClick={() => navigate('/shop')}>
              Back to Shop
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return null;
  }

  const mainImage = product.images && product.images.length > 0 
    ? `http://localhost:5000${product.images[selectedImageIndex]}`
    : '/Fypimgs/default-product.jpg';

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const totalPrice = product.price * quantity;

  return (
    <>
      <Navbar firstName="GB-Home-" lastName="Solutions" />
      
      {/* Breadcrumb */}
      <div className="container-fluid bg-light py-3">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a href="/" className="text-decoration-none">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="/shop" className="text-decoration-none">Shop</a>
              </li>
              <li className="breadcrumb-item">
                <a href={`/shop?category=${product.category}`} className="text-decoration-none text-capitalize">
                  {product.category}
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <div className="container py-5">
        <div className="row">
          {/* Product Images */}
          <div className="col-lg-6">
            <div className="product-image-container mb-4">
              <div className="main-image position-relative mb-3">
                <img
                  src={mainImage}
                  alt={product.name}
                  className="img-fluid rounded border"
                  style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = '/Fypimgs/default-product.jpg';
                  }}
                />
                
                {product.images && product.images.length > 1 && (
                  <>
                    <button
                      className="position-absolute top-50 start-0 translate-middle-y btn btn-dark rounded-circle ms-2"
                      onClick={handlePrevImage}
                      style={{ zIndex: 2 }}
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      className="position-absolute top-50 end-0 translate-middle-y btn btn-dark rounded-circle me-2"
                      onClick={handleNextImage}
                      style={{ zIndex: 2 }}
                    >
                      <FaChevronRight />
                    </button>
                  </>
                )}
                
                {hasDiscount && (
                  <span className="position-absolute top-0 start-0 badge bg-danger m-2 fs-6">
                    -{discountPercentage}% OFF
                  </span>
                )}
              </div>

              {/* Image Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="thumbnail-container d-flex gap-2 flex-wrap">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={`http://localhost:5000${image}`}
                      alt={`${product.name} ${index + 1}`}
                      className={`img-thumbnail cursor-pointer ${selectedImageIndex === index ? 'active border-primary' : ''}`}
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        opacity: selectedImageIndex === index ? 1 : 0.7
                      }}
                      onClick={() => handleThumbnailClick(index)}
                      onError={(e) => {
                        e.target.src = '/Fypimgs/default-product.jpg';
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="col-lg-6">
            <div className="product-details">
              {/* Category and Brand */}
              <div className="mb-3">
                <span className="badge black-bg me-2 text-capitalize">
                  {product.category}
                </span>
                {product.brand && (
                  <span className="badge bg-secondary text-capitalize">
                    {product.brand}
                  </span>
                )}
              </div>

              {/* Product Name */}
              <h1 className="h2 fw-bold mb-3">{product.name}</h1>

              {/* Rating */}
              {product.rating && product.rating.count > 0 && (
                <div className="d-flex align-items-center mb-3">
                  <div className="text-warning me-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.round(product.rating.average) ? 'filled' : 'empty'}
                        style={{ fontSize: '1.2rem' }}
                      />
                    ))}
                  </div>
                  <span className="text-muted">
                    ({product.rating.count} reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="mb-4">
                <h2 className="sc-color fw-bold">
                  ₨{product.price.toLocaleString()}
                </h2>
                {hasDiscount && (
                  <div>
                    <span className="text-muted text-decoration-line-through me-2">
                      ₨{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-success fw-bold">
                      Save ₨{(product.originalPrice - product.price).toLocaleString()} ({discountPercentage}%)
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-4">
                <h5 className="fw-bold mb-2">Description</h5>
                <p className="text-muted" style={{ lineHeight: '1.6' }}>
                  {product.description}
                </p>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mb-4">
                  <h5 className="fw-bold mb-2">Key Features</h5>
                  <ul className="list-unstyled">
                    {product.features.map((feature, index) => (
                      <li key={index} className="mb-1">
                        <FaCheck className="text-success me-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Stock Status */}
              <div className="mb-4">
                <p className={product.stock > 0 ? 'text-success' : 'text-danger'}>
                  <strong>
                    {product.stock > 0 
                      ? `In Stock (${product.stock} available)`
                      : 'Out of Stock'
                    }
                  </strong>
                </p>
              </div>

              {/* Quantity Selector */}
              {product.stock > 0 && (
                <div className="row mb-4">
                  <div className="col-md-6">
                    <label htmlFor="quantity" className="form-label fw-bold">Quantity:</label>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                      >
                        <FaMinus />
                      </button>
                      <input
                        type="number"
                        className="form-control mx-2 text-center"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                        min="1"
                        max={product.stock}
                        style={{ width: '80px' }}
                      />
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= product.stock}
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mt-4">
                      <h5 className="fw-bold">Total: ₨{totalPrice.toLocaleString()}</h5>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="d-flex flex-wrap gap-3 mb-4">
                {product.stock > 0 ? (
                  <>
                    <button
                      className="btn orange-btn flex-grow-1"
                      onClick={handleBuyNow}
                      style={{ minWidth: '200px' }}
                      disabled={addingToCart}
                    >
                      <FaShoppingCart className="me-2" />
                      Buy Now
                    </button>
                    
                    <button
                      className="btn black-btn flex-grow-1"
                      onClick={handleAddToCart}
                      style={{ minWidth: '200px' }}
                      disabled={addingToCart}
                    >
                      {addingToCart ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <FaShoppingCart className="me-2" />
                          Add to Cart
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <button className="btn btn-secondary" disabled>
                    Out of Stock
                  </button>
                )}
                
                <button
                  className={`btn ${isWishlisted ? 'btn-danger' : 'btn-outline-danger'}`}
                  onClick={handleToggleWishlist}
                  title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <FaHeart />
                </button>
                
                <button className="btn btn-outline-secondary" title="Share">
                  <FaShare />
                </button>
              </div>

              {/* Product Benefits */}
              <div className="border-top pt-4">
                <div className="row">
                  <div className="col-md-4 text-center mb-3">
                    <FaTruck className="text-primary mb-2" size={24} />
                    <h6 className="fw-bold">Free Shipping</h6>
                    <small className="text-muted">On orders over ₨5000</small>
                  </div>
                  <div className="col-md-4 text-center mb-3">
                    <FaUndo className="text-primary mb-2" size={24} />
                    <h6 className="fw-bold">30-Day Returns</h6>
                    <small className="text-muted">Money-back guarantee</small>
                  </div>
                  <div className="col-md-4 text-center mb-3">
                    <FaShieldAlt className="text-primary mb-2" size={24} />
                    <h6 className="fw-bold">Secure Payment</h6>
                    <small className="text-muted">SSL encrypted</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <div className="row mt-5">
            <div className="col-12">
              <div className="card">
                <div className="card-header bg-light">
                  <h4 className="mb-0">Specifications</h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    {Object.entries(product.specifications).map(([key, value], index) => (
                      <div key={index} className="col-md-6 mb-2">
                        <strong>{key}:</strong> {value}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Related Products (You can implement this later) */}
        <div className="row mt-5">
          <div className="col-12">
            <h3 className="mb-4">Related Products</h3>
            <div className="alert alert-info">
              Related products section will be implemented soon.
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetail;