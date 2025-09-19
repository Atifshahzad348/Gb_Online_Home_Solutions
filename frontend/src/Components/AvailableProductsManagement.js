

// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../store/auth';
// import { FaEdit, FaTrash, FaPlus, FaSearch, FaSync } from 'react-icons/fa';
// import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';

// const AvailableProductsManagement = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [editFormData, setEditFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     originalPrice: '',
//     category: '',
//     brand: '',
//     stock: '',
//     features: '',
//     isActive: true
//   });
//   const { AuthorizationToken } = useAuth();

//   // Fetch all products
//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('http://localhost:5000/api/products', {
//         headers: {
//           'Authorization': AuthorizationToken,
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch products');
//       }

//       const data = await response.json();
      
//       if (data.success) {
//         setProducts(data.products);
//         setFilteredProducts(data.products);
//       } else {
//         throw new Error(data.message || 'Failed to fetch products');
//       }
//     } catch (err) {
//       setError(err.message);
//       toast.error('Error loading products: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Filter products based on search term
//   useEffect(() => {
//     if (searchTerm === '') {
//       setFilteredProducts(products);
//     } else {
//       const filtered = products.filter(product =>
//         product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredProducts(filtered);
//     }
//   }, [searchTerm, products]);

//   // Start editing a product
//   const handleEditClick = (product) => {
//     setEditingProduct(product._id);
//     setEditFormData({
//       name: product.name,
//       description: product.description,
//       price: product.price,
//       originalPrice: product.originalPrice || '',
//       category: product.category,
//       brand: product.brand || '',
//       stock: product.stock,
//       features: product.features ? product.features.join(', ') : '',
//       isActive: product.isActive
//     });
//   };

//   // Handle form input changes
//   const handleEditFormChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setEditFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   // Save edited product
//   const handleSaveClick = async (productId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': AuthorizationToken,
//         },
//         body: JSON.stringify({
//           ...editFormData,
//           price: parseFloat(editFormData.price),
//           originalPrice: editFormData.originalPrice ? parseFloat(editFormData.originalPrice) : undefined,
//           stock: parseInt(editFormData.stock),
//           features: editFormData.features.split(',').map(f => f.trim()).filter(f => f)
//         })
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success('Product updated successfully');
//         setEditingProduct(null);
//         // Refresh the products list
//         fetchProducts();
//       } else {
//         throw new Error(data.message || 'Failed to update product');
//       }
//     } catch (error) {
//       toast.error('Error updating product: ' + error.message);
//     }
//   };

//   // Cancel editing
//   const handleCancelClick = () => {
//     setEditingProduct(null);
//   };

//   // Delete product function
//   const handleDeleteProduct = async (productId, productName) => {
//     if (!window.confirm(`Are you sure you want to delete "${productName}"?`)) {
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': AuthorizationToken,
//         }
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success('Product deleted successfully');
//         // Remove the product from the local state
//         setProducts(products.filter(product => product._id !== productId));
//       } else {
//         throw new Error(data.message || 'Failed to delete product');
//       }
//     } catch (error) {
//       toast.error('Error deleting product: ' + error.message);
//     }
//   };

//   // Toggle product active status
//   const handleToggleStatus = async (productId, currentStatus, productName) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': AuthorizationToken,
//         },
//         body: JSON.stringify({
//           isActive: !currentStatus
//         })
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success(`Product ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
//         // Update the product in the local state
//         setProducts(products.map(product =>
//           product._id === productId
//             ? { ...product, isActive: !currentStatus }
//             : product
//         ));
//       } else {
//         throw new Error(data.message || 'Failed to update product status');
//       }
//     } catch (error) {
//       toast.error('Error updating product: ' + error.message);
//     }
//   };

//   if (loading) {
//     return (
//       <>
//         <div className="container-fluid py-4">
//           <div className="text-center py-5">
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//             <p className="mt-3">Loading products...</p>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <div className="container-fluid py-4">
//         <div className="row">
//           <div className="col-12">
//             {/* Header Section */}
//             <div className="d-flex justify-content-between align-items-center mb-4">
//               <div>
//                 <h2 className="mb-1">Products Management</h2>
//                 <p className="text-muted mb-0">Manage your product inventory</p>
//               </div>
//               <div>
//                 <Link to="/admin/addproducts" className="btn orange-bg">
//                   <FaPlus className="me-2" />
//                   Add New Product
//                 </Link>
//               </div>
//             </div>

//             {/* Search and Controls */}
//             <div className="card mb-4">
//               <div className="card-body">
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="input-group">
//                       <input
//                         type="text"
//                         className="form-control shadow-none"
//                         placeholder="Search products by name, category, or brand..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                       />
//                       <button className="btn orange-btn" type="button">
//                         <FaSearch />
//                       </button>
//                     </div>
//                   </div>
//                   <div className="col-md-6 text-end">
//                     <button className="btn black-btn" onClick={fetchProducts}>
//                       <FaSync className="me-2" />
//                       Refresh
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Products Table */}
//             <div className="card">
//               <div className="card-body p-0">
//                 {error ? (
//                   <div className="alert alert-danger m-4" role="alert">
//                     Error: {error}
//                   </div>
//                 ) : filteredProducts.length === 0 ? (
//                   <div className="text-center py-5">
//                     <p className="text-muted">
//                       {searchTerm ? 'No products found matching your search' : 'No products available'}
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="table-responsive">
//                     <table className="table table-hover mb-0">
//                       <thead className="table-light">
//                         <tr>
//                           <th>Image</th>
//                           <th>Name</th>
//                           <th>Category</th>
//                           <th>Brand</th>
//                           <th>Price</th>
//                           <th>Stock</th>
//                           <th>Status</th>
//                           <th>Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {filteredProducts.map((product) => (
//                           <React.Fragment key={product._id}>
//                             {editingProduct === product._id ? (
//                               // Edit Mode
//                               <tr className="bg-light">
//                                 <td>
//                                   <img
//                                     src={product.images && product.images.length > 0 
//                                       ? `http://localhost:5000${product.images[0]}`
//                                       : '/Fypimgs/default-product.jpg'
//                                     }
//                                     alt={product.name}
//                                     className="img-thumbnail"
//                                     style={{ width: '60px', height: '60px', objectFit: 'cover' }}
//                                   />
//                                 </td>
//                                 <td>
//                                   <input
//                                     type="text"
//                                     name="name"
//                                     value={editFormData.name}
//                                     onChange={handleEditFormChange}
//                                     className="form-control form-control-sm mb-1"
//                                     placeholder="Product Name"
//                                   />
//                                   <textarea
//                                     name="description"
//                                     value={editFormData.description}
//                                     onChange={handleEditFormChange}
//                                     className="form-control form-control-sm"
//                                     placeholder="Description"
//                                     rows="2"
//                                   />
//                                 </td>
//                                 <td>
//                                   <select
//                                     name="category"
//                                     value={editFormData.category}
//                                     onChange={handleEditFormChange}
//                                     className="form-select form-select-sm"
//                                   >
//                                     <option value="plumbing">Plumbing</option>
//                                     <option value="electrical">Electrical</option>
//                                     <option value="paint">Paint</option>
//                                     <option value="kitchen">Kitchen</option>
//                                     <option value="tools">Tools</option>
//                                     <option value="safety">Safety</option>
//                                   </select>
//                                 </td>
//                                 <td>
//                                   <input
//                                     type="text"
//                                     name="brand"
//                                     value={editFormData.brand}
//                                     onChange={handleEditFormChange}
//                                     className="form-control form-control-sm"
//                                     placeholder="Brand"
//                                   />
//                                 </td>
//                                 <td>
//                                   <input
//                                     type="number"
//                                     name="price"
//                                     value={editFormData.price}
//                                     onChange={handleEditFormChange}
//                                     className="form-control form-control-sm mb-1"
//                                     placeholder="Price"
//                                     step="0.01"
//                                   />
//                                   <input
//                                     type="number"
//                                     name="originalPrice"
//                                     value={editFormData.originalPrice}
//                                     onChange={handleEditFormChange}
//                                     className="form-control form-control-sm"
//                                     placeholder="Original Price"
//                                     step="0.01"
//                                   />
//                                 </td>
//                                 <td>
//                                   <input
//                                     type="number"
//                                     name="stock"
//                                     value={editFormData.stock}
//                                     onChange={handleEditFormChange}
//                                     className="form-control form-control-sm"
//                                     placeholder="Stock"
//                                     min="0"
//                                   />
//                                 </td>
//                                 <td>
//                                   <div className="form-check form-switch">
//                                     <input
//                                       className="form-check-input"
//                                       type="checkbox"
//                                       name="isActive"
//                                       checked={editFormData.isActive}
//                                       onChange={handleEditFormChange}
//                                     />
//                                     <label className="form-check-label">
//                                       {editFormData.isActive ? 'Active' : 'Inactive'}
//                                     </label>
//                                   </div>
//                                 </td>
//                                 <td>
//                                   <div className="d-flex gap-2">
//                                     <button
//                                       className="btn btn-sm orange-btn"
//                                       onClick={() => handleSaveClick(product._id)}
//                                       title="Save Changes"
//                                     >
//                                       ✓
//                                     </button>
//                                     <button
//                                       className="btn btn-sm black-btn"
//                                       onClick={handleCancelClick}
//                                       title="Cancel"
//                                     >
//                                       ✗
//                                     </button>
//                                   </div>
//                                 </td>
//                               </tr>
//                             ) : (
//                               // View Mode
//                               <tr>
//                                 <td>
//                                   <img
//                                     src={product.images && product.images.length > 0 
//                                       ? `http://localhost:5000${product.images[0]}`
//                                       : '/Fypimgs/default-product.jpg'
//                                     }
//                                     alt={product.name}
//                                     className="img-thumbnail"
//                                     style={{ width: '60px', height: '60px', objectFit: 'cover' }}
//                                     onError={(e) => {
//                                       e.target.src = '/Fypimgs/default-product.jpg';
//                                     }}
//                                   />
//                                 </td>
//                                 <td>
//                                   <div>
//                                     <strong>{product.name}</strong>
//                                     <br />
//                                     <small className="text-muted">{product.description.substring(0, 50)}...</small>
//                                   </div>
//                                 </td>
//                                 <td>
//                                   <span className="badge black-bg text-capitalize">
//                                     {product.category}
//                                   </span>
//                                 </td>
//                                 <td>{product.brand || '-'}</td>
//                                 <td>
//                                   <strong>₨{product.price.toLocaleString()}</strong>
//                                   {product.originalPrice && product.originalPrice > product.price && (
//                                     <div>
//                                       <small className="text-muted text-decoration-line-through">
//                                         ₨{product.originalPrice.toLocaleString()}
//                                       </small>
//                                     </div>
//                                   )}
//                                 </td>
//                                 <td>
//                                   <span className={`badge ${product.stock > 0 ? 'orange-bg' : 'bg-danger'}`}>
//                                     {product.stock}
//                                   </span>
//                                 </td>
//                                 <td>
//                                   <div className="form-check form-switch">
//                                     <input
//                                       className="form-check-input"
//                                       type="checkbox"
//                                       checked={product.isActive}
//                                       onChange={() => handleToggleStatus(product._id, product.isActive, product.name)}
//                                       style={{ cursor: 'pointer' }}
//                                     />
//                                     <label className="form-check-label">
//                                       {product.isActive ? 'Active' : 'Inactive'}
//                                     </label>
//                                   </div>
//                                 </td>
//                                 <td>
//                                   <div className="d-flex gap-2">
//                                     <button
//                                       className="btn btn-sm black-btn"
//                                       onClick={() => handleEditClick(product)}
//                                       title="Edit Product"
//                                     >
//                                       <FaEdit />
//                                     </button>
//                                     <button
//                                       className="btn btn-sm orange-btn"
//                                       onClick={() => handleDeleteProduct(product._id, product.name)}
//                                       title="Delete Product"
//                                     >
//                                       <FaTrash />
//                                     </button>
//                                   </div>
//                                 </td>
//                               </tr>
//                             )}
//                           </React.Fragment>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Pagination */}
//             {filteredProducts.length > 0 && (
//               <nav className="d-flex justify-content-between align-items-center mt-4">
//                 <div>
//                   <p className="text-muted mb-0">
//                     Showing {filteredProducts.length} of {products.length} products
//                   </p>
//                 </div>
//                 <ul className="pagination mb-0">
//                   <li className="page-item disabled">
//                     <button className="page-link">Previous</button>
//                   </li>
//                   <li className="page-item active">
//                     <button className="page-link">1</button>
//                   </li>
//                   <li className="page-item">
//                     <button className="page-link">Next</button>
//                   </li>
//                 </ul>
//               </nav>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AvailableProductsManagement;

// test code


import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/auth';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaSync } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AvailableProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    brand: '',
    stock: '',
    features: '',
    isActive: true
  });
  const { AuthorizationToken } = useAuth();

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/products', {
        headers: {
          'Authorization': AuthorizationToken,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      
      if (data.success) {
        setProducts(data.products);
        setFilteredProducts(data.products);
      } else {
        throw new Error(data.message || 'Failed to fetch products');
      }
    } catch (err) {
      setError(err.message);
      toast.error('Error loading products: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search term
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  // Start editing a product
  const handleEditClick = (product) => {
    setEditingProduct(product._id);
    setEditFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice || '',
      category: product.category,
      brand: product.brand || '',
      stock: product.stock,
      features: product.features ? product.features.join(', ') : '',
      isActive: product.isActive
    });
  };

  // Handle form input changes
  const handleEditFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Save edited product
  const handleSaveClick = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': AuthorizationToken,
        },
        body: JSON.stringify({
          ...editFormData,
          price: parseFloat(editFormData.price),
          originalPrice: editFormData.originalPrice ? parseFloat(editFormData.originalPrice) : undefined,
          stock: parseInt(editFormData.stock),
          features: editFormData.features.split(',').map(f => f.trim()).filter(f => f)
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Product updated successfully');
        setEditingProduct(null);
        // Refresh the products list
        fetchProducts();
      } else {
        throw new Error(data.message || 'Failed to update product');
      }
    } catch (error) {
      toast.error('Error updating product: ' + error.message);
    }
  };

  // Cancel editing
  const handleCancelClick = () => {
    setEditingProduct(null);
  };

  // Delete product function
  const handleDeleteProduct = async (productId, productName) => {
    if (!window.confirm(`Are you sure you want to delete "${productName}"?`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': AuthorizationToken,
        }
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Product deleted successfully');
        // Remove the product from the local state
        setProducts(products.filter(product => product._id !== productId));
      } else {
        throw new Error(data.message || 'Failed to delete product');
      }
    } catch (error) {
      toast.error('Error deleting product: ' + error.message);
    }
  };

  // Toggle product active status
  const handleToggleStatus = async (productId, currentStatus, productName) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': AuthorizationToken,
        },
        body: JSON.stringify({
          isActive: !currentStatus
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Product ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
        // Update the product in the local state
        setProducts(products.map(product =>
          product._id === productId
            ? { ...product, isActive: !currentStatus }
            : product
        ));
      } else {
        throw new Error(data.message || 'Failed to update product status');
      }
    } catch (error) {
      toast.error('Error updating product: ' + error.message);
    }
  };

  if (loading) {
    return (
      <>
        <div className="container-fluid py-4">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading products...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="mb-1">Products Management</h2>
                <p className="text-muted mb-0">Manage your product inventory</p>
              </div>
              <div>
                <Link to="/admin/addproducts" className="btn orange-bg">
                  <FaPlus className="me-2" />
                  Add New Product
                </Link>
              </div>
            </div>

            {/* Search and Controls */}
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control shadow-none"
                        placeholder="Search products by name, category, or brand..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button className="btn orange-btn" type="button">
                        <FaSearch />
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6 text-end">
                    <button className="btn black-btn" onClick={fetchProducts}>
                      <FaSync className="me-2" />
                      Refresh
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Table */}
            <div className="card">
              <div className="card-body p-0">
                {error ? (
                  <div className="alert alert-danger m-4" role="alert">
                    Error: {error}
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-5">
                    <p className="text-muted">
                      {searchTerm ? 'No products found matching your search' : 'No products available'}
                    </p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Brand</th>
                          <th>Price</th>
                          <th>Stock</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map((product) => (
                          <React.Fragment key={product._id}>
                            {editingProduct === product._id ? (
                              // Edit Mode
                              <tr className="bg-light">
                                <td>
                                  <img
                                    src={product.images && product.images.length > 0 
                                      ? `http://localhost:5000${product.images[0]}`
                                      : '/Fypimgs/default-product.jpg'
                                    }
                                    alt={product.name}
                                    className="img-thumbnail"
                                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="name"
                                    value={editFormData.name}
                                    onChange={handleEditFormChange}
                                    className="form-control form-control-sm mb-1"
                                    placeholder="Product Name"
                                  />
                                  <textarea
                                    name="description"
                                    value={editFormData.description}
                                    onChange={handleEditFormChange}
                                    className="form-control form-control-sm"
                                    placeholder="Description"
                                    rows="2"
                                  />
                                </td>
                                <td>
                                  <select
                                    name="category"
                                    value={editFormData.category}
                                    onChange={handleEditFormChange}
                                    className="form-select form-select-sm"
                                  >
                                    <option value="plumbing">Plumbing</option>
                                    <option value="electrical">Electrical</option>
                                    <option value="paint">Paint</option>
                                    <option value="kitchen">Kitchen</option>
                                    <option value="tools">Tools</option>
                                    <option value="safety">Safety</option>
                                  </select>
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="brand"
                                    value={editFormData.brand}
                                    onChange={handleEditFormChange}
                                    className="form-control form-control-sm"
                                    placeholder="Brand"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name="price"
                                    value={editFormData.price}
                                    onChange={handleEditFormChange}
                                    className="form-control form-control-sm mb-1"
                                    placeholder="Price"
                                    step="0.01"
                                  />
                                  <input
                                    type="number"
                                    name="originalPrice"
                                    value={editFormData.originalPrice}
                                    onChange={handleEditFormChange}
                                    className="form-control form-control-sm"
                                    placeholder="Original Price"
                                    step="0.01"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name="stock"
                                    value={editFormData.stock}
                                    onChange={handleEditFormChange}
                                    className="form-control form-control-sm"
                                    placeholder="Stock"
                                    min="0"
                                  />
                                </td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <button
                                      className="btn btn-sm orange-btn"
                                      onClick={() => handleSaveClick(product._id)}
                                      title="Save Changes"
                                    >
                                      ✓
                                    </button>
                                    <button
                                      className="btn btn-sm black-btn"
                                      onClick={handleCancelClick}
                                      title="Cancel"
                                    >
                                      ✗
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ) : (
                              // View Mode
                              <tr>
                                <td>
                                  <img
                                    src={product.images && product.images.length > 0 
                                      ? `http://localhost:5000${product.images[0]}`
                                      : '/Fypimgs/default-product.jpg'
                                    }
                                    alt={product.name}
                                    className="img-thumbnail"
                                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                    onError={(e) => {
                                      e.target.src = '/Fypimgs/default-product.jpg';
                                    }}
                                  />
                                </td>
                                <td>
                                  <div>
                                    <strong>{product.name}</strong>
                                    <br />
                                    <small className="text-muted">{product.description.substring(0, 50)}...</small>
                                  </div>
                                </td>
                                <td>
                                  <span className="badge black-bg text-capitalize">
                                    {product.category}
                                  </span>
                                </td>
                                <td>{product.brand || '-'}</td>
                                <td>
                                  <strong>₨{product.price.toLocaleString()}</strong>
                                  {product.originalPrice && product.originalPrice > product.price && (
                                    <div>
                                      <small className="text-muted text-decoration-line-through">
                                        ₨{product.originalPrice.toLocaleString()}
                                      </small>
                                    </div>
                                  )}
                                </td>
                                <td>
                                  <span className={`badge ${product.stock > 0 ? 'orange-bg' : 'bg-danger'}`}>
                                    {product.stock}
                                  </span>
                                </td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <button
                                      className="btn btn-sm black-btn"
                                      onClick={() => handleEditClick(product)}
                                      title="Edit Product"
                                    >
                                      <FaEdit />
                                    </button>
                                    <button
                                      className="btn btn-sm orange-btn"
                                      onClick={() => handleDeleteProduct(product._id, product.name)}
                                      title="Delete Product"
                                    >
                                      <FaTrash />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <nav className="d-flex justify-content-between align-items-center mt-4">
                <div>
                  <p className="text-muted mb-0">
                    Showing {filteredProducts.length} of {products.length} products
                  </p>
                </div>
                <ul className="pagination mb-0">
                  <li className="page-item disabled">
                    <button className="page-link">Previous</button>
                  </li>
                  <li className="page-item active">
                    <button className="page-link">1</button>
                  </li>
                  <li className="page-item">
                    <button className="page-link">Next</button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AvailableProductsManagement;