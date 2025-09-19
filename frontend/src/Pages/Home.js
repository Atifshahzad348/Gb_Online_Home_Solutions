

import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import HeroSection from "../Components/HeroSection";
import Footer from "../Components/Footer";
import HomeSecondSection from "../Components/HomeSecondSection";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import ServiceCards from "../Components/ServiceCards";
import Progress from "../Components/Progress";
import { useServices } from "../store/services";

const Home = () => {
  const { services, loading, error } = useServices();
  
  // Filter services by 'recommended' category instead of taking first 12
  const recommendedServices = services
    .filter(service => service.category === 'recommended')
    .slice(0, 12);
  
  // Function to chunk services into rows of 4
  const chunkServices = (servicesArray, chunkSize = 4) => {
    const chunks = [];
    for (let i = 0; i < servicesArray.length; i += chunkSize) {
      chunks.push(servicesArray.slice(i, i + chunkSize));
    }
    return chunks;
  };
  
  const serviceChunks = chunkServices(recommendedServices);

  // Debug useEffect
  useEffect(() => {
    if (services.length > 0) {
      console.log('Services loaded:', services.length);
      console.log('Recommended services:', recommendedServices.length);
      services.forEach((service, index) => {
        console.log(`Service ${index + 1}:`, {
          title: service.title,
          category: service.category,
          image: service.image,
          hasImage: !!service.image
        });
      });
    }
  }, [services, recommendedServices]);

  return (
    <>
      <Navbar firstName="GB-Home-" lastName="Solutions"/>
      <HeroSection/>
      <Progress/>
      
      {/* Top Services Section */}
      <div className="container-fluid mt-5 px-md-4 top-services py-md-5 py-3">
        <h1 className="text-center mb-3 fw-bold ubuntu-bold herosection-title">Our Top Services</h1>
        <h5 className="text-center mb-4 herosection-paragraph">GB-home-services provides ultimate installations, repairs, maintenance, and grooming services at your doorstep.</h5>
        <div className="row">
          <div className="col-lg-3 col-6 col-md-6 mb-3">
            <Link className="text-decoration-none" to="/category/kitchen">
              <div className="s-card card text-center md-h-100 py-5 shadow-lg">
                <div className="card-body">
                  <img src="./Fypimgs/ktchenicon.png" alt="" className="img-size mb-3"/>
                  <h5 className="card-title ubuntu-bold">Kitchen Designing</h5>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-6 col-md-6 mb-3">
            <Link className="text-decoration-none" to="/category/paint">
              <div className="s-card card text-center md-h-100 py-5 shadow-lg">
                <div className="card-body">
                  <img src="./Fypimgs/housepainticon.png" alt="" className="img-size mb-3" />
                  <h5 className="card-title ubuntu-bold">House Paint Services</h5>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-6 col-md-6 mb-3">
            <Link className="text-decoration-none" to="/category/electrical">
              <div className="s-card card text-center md-h-100 py-5 shadow-lg">
                <div className="card-body">
                  <img src="./Fypimgs/electric.png" alt="img" className="mb-3 img-size"/>
                  <h5 className="card-title ubuntu-bold">Electrical Services</h5>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-6 col-md-6 mb-3">
            <Link className="text-decoration-none" to="/category/plumbing">
              <div className="s-card card text-center md-h-100 py-5 shadow-lg">
                <div className="card-body">
                  <img src="./Fypimgs/plumbingicon.png" alt="" className="img-size mb-3" />
                  <h5 className="card-title ubuntu-bold">Plumbing Services</h5>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Recommended Services Section */}
      <div className="container-fluid recommended-services">
        <div className="container mt-md-4 py-5 px-md-4 mb-md-5">
          <h1 className="fw-bold text-center mb-md-4 ubuntu-bold herosection-title">Recommended Services For You</h1>
          
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading services...</p>
            </div>
          )}
          
          {error && (
            <div className="alert alert-danger text-center" role="alert">
              Failed to load services: {error}
            </div>
          )}
          
          {!loading && !error && recommendedServices.length === 0 && (
            <div className="text-center py-5">
              <p>No recommended services available yet.</p>
              <p className="text-muted">Services marked as "recommended" will appear here.</p>
            </div>
          )}
          
          {!loading && !error && recommendedServices.length > 0 && (
            <>
              {serviceChunks.map((chunk, rowIndex) => (
                <div key={rowIndex} className="row mb-4">
                  {chunk.map((service) => (
                    <div key={service._id} className="col-lg-3 col-md-6 mb-4">
                      <ServiceCards service={service} />
                    </div>
                  ))}
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <HomeSecondSection/>
      <Footer/>
    </>
  );
}

Home.propTypes = {
  firstName: PropTypes.string,
}

export default Home;