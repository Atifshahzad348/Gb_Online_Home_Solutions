
// checking the img path ------------------------------------------------------
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function ServiceCards({ service }) {
  const { 
    _id, 
    title, 
    description, 
    image, 
    basePrice 
  } = service;
  
  const [imageUrl, setImageUrl] = useState("/Fypimgs/default-service.jpg");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (image) {
      console.log('Service image path from API:', image);
      
      let finalUrl;
      
      // Handle different image path formats
      if (image.startsWith('http://') || image.startsWith('https://')) {
        finalUrl = image; // Already a full URL
      } else if (image.startsWith('/uploads/')) {
        finalUrl = `http://localhost:5000${image}`; // Prepend backend URL
      } else if (image.startsWith('uploads/')) {
        finalUrl = `http://localhost:5000/${image}`; // Prepend backend URL with slash
      } else {
        finalUrl = image; // Use as-is (relative path)
      }
      
      console.log('Final image URL:', finalUrl);
      setImageUrl(finalUrl);
      setImageError(false);
    }
  }, [image]);

  const handleImageError = (e) => {
    console.error('Image failed to load:', imageUrl);
    setImageError(true);
    setImageUrl("/Fypimgs/default-service.jpg");
  };

  return (
    <div className='h-100'>
      <div className="card shadow-lg h-100">
        <img 
          src={imageUrl} 
          className="card-img-top service-card-img" 
          alt={title}
          style={{ height: '200px', objectFit: 'cover' }}
          onError={handleImageError}
        />
        <div className="card-body d-flex flex-column">
          <div className="text-center mb-2">
            <h5 className="card-title sc-color m-0">{title}</h5>
          </div>
          <p className="card-text flex-grow-1 text-center">{description}</p>
          {basePrice && (
            <div className="mb-2">
              <strong>Starting from: {basePrice} pkr</strong>
            </div>
          )}
         
          <Link to={`/service/${_id}`}>
             <button className='btn orange-btn w-100 bolder'>Book now</button>
          </Link>
          {imageError && (
            <small className="text-muted text-center mt-2">
              Image not available
            </small>
          )}
        </div>
      </div>
    </div>
  )
}