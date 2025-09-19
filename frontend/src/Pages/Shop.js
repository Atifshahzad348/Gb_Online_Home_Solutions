import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ProductCard from '../Components/ProductCard';
import { useProducts } from '../store/products';

const Shop = () => {
  const { products, loading, error, filters, pagination, updateFilters } = useProducts();
  const [searchTerm, setSearchTerm] = useState(filters.search || '');

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'plumbing', label: 'Plumbing Products' },
    { value: 'electrical', label: 'Electrical Products' },
    { value: 'paint', label: 'Paint Products' },
    { value: 'kitchen', label: 'Kitchen Designing Products' },
    { value: 'tools', label: 'Tools & Equipment' },
    { value: 'safety', label: 'Safety Gear' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    updateFilters({ search: searchTerm });
  };

  const handleCategoryChange = (category) => {
    updateFilters({ category });
  };

  const handleSortChange = (sortBy) => {
    updateFilters({ sortBy });
  };

  const handlePriceFilter = (min, max) => {
    updateFilters({ minPrice: min, maxPrice: max });
  };

  return (
    <>
      <Navbar firstName="Gilgit-" lastName="Shop" />
      
      {/* Hero Section */}
      <div className="container-fluid bg-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="display-4 fw-bold orange-color text-dark">Construction Products Shop</h1>
              <p className="lead">Quality materials for all your construction needs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container-fluid bg-white border-bottom py-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4 mb-3 mb-md-0">
              <form onSubmit={handleSearch} className="d-flex">
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="btn orange-btn">
                  Search
                </button>
              </form>
            </div>
            
            <div className="col-md-4 mb-3 mb-md-0">
              <select
                className="form-select"
                value={filters.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="col-md-4">
              <select
                className="form-select"
                value={filters.sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price Filter */}
          <div className="row mt-3">
            <div className="col-12">
              <div className="d-flex align-items-center">
                <span className="me-2">Price Range:</span>
                <input
                  type="number"
                  className="form-control me-2"
                  style={{ width: '100px' }}
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => handlePriceFilter(e.target.value, filters.maxPrice)}
                />
                <span className="me-2">-</span>
                <input
                  type="number"
                  className="form-control me-2"
                  style={{ width: '100px' }}
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => handlePriceFilter(filters.minPrice, e.target.value)}
                />
                <button 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => handlePriceFilter('', '')}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container-fluid py-5">
        <div className="container">
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading products...</p>
            </div>
          )}

          {error && (
            <div className="alert alert-danger text-center" role="alert">
              Error: {error}
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div className="text-center py-5">
              <h3>No products found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <>
              <div className="row mb-4">
                <div className="col-12">
                  <p className="text-muted">
                    Showing {products.length} of {pagination.total} products
                  </p>
                </div>
              </div>

              <div className="row">
                {products.map((product) => (
                  <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="row mt-5">
                  <div className="col-12">
                    <nav>
                      <ul className="pagination justify-content-center">
                        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                          <li key={page} className={`page-item ${pagination.currentPage === page ? 'active' : ''}`}>
                            <button 
                              className="page-link" 
                              onClick={() => updateFilters({ page })}
                            >
                              {page}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer/>
    </>
  );
};

export default Shop;