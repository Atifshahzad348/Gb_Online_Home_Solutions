import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../store/auth';
import Navbar from './Navbar';
import Footer from './Footer';
import NewOrderForm from './NewOrderForm';

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchServiceById } = useAuth();

  useEffect(() => {
    const getService = async () => {
      try {
        setLoading(true);
        const serviceData = await fetchServiceById(id);
        setService(serviceData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getService();
  }, [id, fetchServiceById]);

  if (loading) return (
    <>
      <Navbar firstName="GB-Home-" lastName="Services"/>
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading service details...</p>
      </div>
      <Footer/>
    </>
  );
  
  if (error) return (
    <>
      <Navbar firstName="GB-Home-" lastName="Services"/>
      <div className="alert alert-danger text-center my-5">Error: {error}</div>
      <Footer/>
    </>
  );
  
  if (!service) return (
    <>
      <Navbar firstName="GB-Home-" lastName="Services"/>
      <div className="text-center py-5">Service not found</div>
      <Footer/>
    </>
  );

  const imageUrl = service.image && service.image.startsWith('/uploads/') 
    ? `http://localhost:5000${service.image}` 
    : service.image || "/Fypimgs/default-service.jpg";

  return (
    <>
      <Navbar firstName="GB-Home-" lastName="Services"/>
      <div className="container-fluid md-py-5 py-3">
        <div className="row">
          <h2 className='text-center display-5 fw-bold main-heading'>{service.title} Services</h2>
          <p className='text-center display-6 main-paragraph'>{service.description}</p>
        </div>
        
        <div className="row HomeSection-bg py-5 px-2 md-px-3 my-5">
          <div className="col-md-8">
            <h2 className='main-heading'>{service.title} Services</h2>
            <h5 className='mb-md-5 main-paragraph'>
              GB-Home-Services provides professional and reliable {service.title} services at your doorstep. 
              We provide the best {service.title} services with quality assurance and post-service guarantee.
            </h5>
            
            <img 
              src={imageUrl} 
              alt={service.title}
              className='img-fluid rounded'
              onError={(e) => {
                e.target.src = "/Fypimgs/default-service.jpg";
              }}
            />
            
            <h5 className='mt-md-5 main-paragraph mt-2'>
              Our certified and highly trained in-house staff have years of experience in {service.title} services. 
              Trust GB-Home-Services for a hassle-free experience like never before.
            </h5>
            
            {service.features && service.features.length > 0 && (
              <div className="mt-4">
                <h4 className='main-heading'>Service Features</h4>
                <ul className="main-paragraph">
                  {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="mt-4">
              <h4 className='main-heading'>Service Details</h4>
              <div className="row">
                <div className="col-md-6">
                  <p className='main-paragraph'><strong>Category:</strong> {service.category}</p>
                  <p className='main-paragraph'><strong>Starting Price:</strong> ${service.basePrice}</p>
                </div>
                <div className="col-md-6">
                  <p className='main-paragraph'><strong>Duration:</strong> {service.duration}</p>
                  <p className='main-paragraph'><strong>Status:</strong> {service.isActive ? 'Available' : 'Not Available'}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-4 py-4">
            <NewOrderForm service={service} />
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ServiceDetail;