// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import Navbar from '../Components/Navbar';
// import Footer from '../Components/Footer';
// import ServiceCards from '../Components/ServiceCards';
// import ClientReview from '../Components/ClientReview';
// import { useCategoryServices } from '../store/category-services';

// const CategoryPage = () => {
//   const { category } = useParams();
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { getServicesByCategory } = useCategoryServices();

//   // Category-specific content
//   const categoryContent = {
//     kitchen: {
//       title: "Kitchen Designing Services",
//       description: "No need to worry about your kitchen design troubles anymore! Our skilled in-house designers from Gb-home-services are here to ensure your kitchen is in top-notch condition. Count on us for the most reliable and comprehensive range of kitchen designing and remodeling services available.",
//       image: "/Fypimgs/Kitchenimg.jpg",
//       featuredServices: [
//         "Kitchen Renovation and repairing existing designs",
//         "Kitchen Hood Design & Installation",
//         "Kitchen Tile Fitting & Wall Finishing",
//         "Cupboards & Cabinet Design",
//         "Countertop Installation",
//         "Lighting Design for Kitchens",
//         "Plumbing & Sink Installation",
//         "Appliance Integration"
//       ]
//     },
//     paint: {
//       title: "Professional Painting Services",
//       description: "Transform your space with our expert painting services. We provide professional residential, commercial, and apartment painting services with the highest quality materials and skilled craftsmen.",
//       image: "/Fypimgs/paint-service.jpg",
//       featuredServices: [
//         "Interior Wall Painting",
//         "Exterior Wall Painting",
//         "Woodwork Painting",
//         "Texture Painting",
//         "Wallpaper Installation",
//         "Color Consultation",
//         "Surface Preparation",
//         "Decorative Painting"
//       ]
//     },
//     electrical: {
//       title: "Electrical Services",
//       description: "Ensure the safety and efficiency of your home's electrical system with our expert wiring and rewiring services. Our skilled electricians handle all your electrical needs with compliance to safety standards.",
//       image: "/Fypimgs/electrical-service.jpg",
//       featuredServices: [
//         "Electrical Wiring Installation",
//         "Switchboard Repair & Upgrade",
//         "Lighting Installation",
//         "Power Outlet Installation",
//         "Circuit Breaker Repair",
//         "Emergency Electrical Services",
//         "Fan Installation & Repair",
//         "Safety Inspection"
//       ]
//     },
//     plumbing: {
//       title: "Plumbing Services",
//       description: "Professional plumbing solutions for your home or business. From leak repairs to complete plumbing system installations, our certified plumbers ensure quality workmanship and reliable service.",
//       image: "/Fypimgs/plumbing-service.jpg",
//       featuredServices: [
//         "Pipe Repair & Replacement",
//         "Faucet Installation & Repair",
//         "Drain Cleaning",
//         "Water Heater Installation",
//         "Bathroom Plumbing",
//         "Kitchen Plumbing",
//         "Emergency Leak Repair",
//         "Water Pressure Adjustment"
//       ]
//     }
//   };

//   const currentCategory = categoryContent[category] || {};

//   useEffect(() => {
//     const loadServices = async () => {
//       try {
//         setLoading(true);
//         const categoryServices = await getServicesByCategory(category);
//         setServices(categoryServices);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadServices();
//   }, [category, getServicesByCategory]);

//   return (
//     <>
//       <Navbar firstName="GB-Home-" lastName="Services" />
      
//       {/* Hero Section */}
//       <div className='container py-md-5 py-2'>
//         <div className="row">
//           <div className="col-md-7 order-2 order-md-1 mt-md-5 mt-1">
//             <h1 className='hero-heading gradient-heading main-heading'>{currentCategory.title}</h1>
//             <p className='HeroPragraph mt-4 px-md-3 main-paragraph'>
//               {currentCategory.description}
//             </p>
//             <form className="d-flex me-4 mt-md-5">
//               <input className="form-outline form-control me-2 p-2 mb-md-0 mb-3 border shadow-none" 
//                 type="search" placeholder="Search services" aria-label="Search"/>
//               <button className="nav-btn btn mb-md-0 mb-3" type="submit">Search</button>
//             </form>
//           </div>
//           <div className="col-md-5 order-1 order-md-2 mt-md-0 align-items-center d-flex justify-content-center">
//             <img src={currentCategory.image} style={{ width: '600px', height: '550px' }} 
//               className="img-fluid" alt={currentCategory.title} />
//           </div>
//         </div>
//       </div>

//       {/* Services Section */}
//       <div className="container-fluid mt-md-4 px-md-4 mb-md-5 HomeSection-bg py-5">
//         <h1 className="fw-bold text-center mb-md-4 main-heading">Select Your Desired Service</h1>
//         <h5 className="text-center mb-4 main-paragraph">
//           GB-home-services provides ultimate installations, repairs, maintenance, and grooming services at your doorstep.
//         </h5>

//         {loading && (
//           <div className="text-center py-5">
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//             <p className="mt-2">Loading services...</p>
//           </div>
//         )}

//         {error && (
//           <div className="alert alert-danger text-center" role="alert">
//             Failed to load services: {error}
//           </div>
//         )}

//         {!loading && !error && services.length === 0 && (
//           <div className="text-center py-5">
//             <p>No services available in this category yet.</p>
//             {/* Show featured services as fallback */}
//             <div className="row mt-4">
//               {currentCategory.featuredServices && currentCategory.featuredServices.map((service, index) => (
//                 <div key={index} className="col-lg-3 col-md-6 mb-4">
//                   <div className="card shadow-lg h-100">
//                     <div className="card-body text-center">
//                       <h5 className="card-title">{service}</h5>
//                       <p className="card-text">Coming soon</p>
//                       <button className="btn btn-outline-primary" disabled>
//                         Coming Soon
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {!loading && !error && services.length > 0 && (
//           <div className="row">
//             {services.map((service) => (
//               <div key={service._id} className="col-lg-3 col-md-6 mb-4">
//                 <ServiceCards service={service} />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Client Reviews Section */}
//       <div className="container mb-md-5">
//         <div className="row">
//           <h4 className='text-center fw-bold'>Latest Customers Review</h4>
//           <p className='text-center'>Here's what some of our customers say about us.</p>
          
//           {[1, 2, 3, 4].map((item) => (
//             <div key={item} className="col-lg-3 col-md-6 mb-3">
//               <ClientReview 
//                 ClientName="Atif shahzad" 
//                 ClientAdress="Skarkue" 
//                 ClientMsg="I am very satisfied with GB-Home-Services they came to me timely and did my work professionally"
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       <Footer/>
//     </>
//   );
// };

// export default CategoryPage;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ServiceCards from '../Components/ServiceCards';
import ClientReview from '../Components/ClientReview';
import { useCategoryServices } from '../store/category-services';

const CategoryPage = () => {
  const { category } = useParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getServicesByCategory } = useCategoryServices();

  // Category-specific content
  const categoryContent = {
    kitchen: {
      title: "Kitchen Designing Services",
      description: "No need to worry about your kitchen design troubles anymore! Our skilled in-house designers from Gb-home-services are here to ensure your kitchen is in top-notch condition. Count on us for the most reliable and comprehensive range of kitchen designing and remodeling services available.",
      image: "/Fypimgs/Kitchenimg.jpg",
      featuredServices: [
        "Kitchen Renovation and repairing existing designs",
        "Kitchen Hood Design & Installation",
        "Kitchen Tile Fitting & Wall Finishing",
        "Cupboards & Cabinet Design",
        "Countertop Installation",
        "Lighting Design for Kitchens",
        "Plumbing & Sink Installation",
        "Appliance Integration"
      ]
    },
    paint: {
      title: "Professional Painting Services",
      description: "Transform your space with our expert painting services. We provide professional residential, commercial, and apartment painting services with the highest quality materials and skilled craftsmen.",
      image: "/Fypimgs/housepainthome.jpg",
      featuredServices: [
        "Interior Wall Painting",
        "Exterior Wall Painting",
        "Woodwork Painting",
        "Texture Painting",
        "Wallpaper Installation",
        "Color Consultation",
        "Surface Preparation",
        "Decorative Painting"
      ]
    },
    electrical: {
      title: "Electrical Services",
      description: "Ensure the safety and efficiency of your home's electrical system with our expert wiring and rewiring services. Our skilled electricians handle all your electrical needs with compliance to safety standards.",
      image: "/Fypimgs/Electricimg.jpg",
      featuredServices: [
        "Electrical Wiring Installation",
        "Switchboard Repair & Upgrade",
        "Lighting Installation",
        "Power Outlet Installation",
        "Circuit Breaker Repair",
        "Emergency Electrical Services",
        "Fan Installation & Repair",
        "Safety Inspection"
      ]
    },
    plumbing: {
      title: "Plumbing Services",
      description: "Professional plumbing solutions for your home or business. From leak repairs to complete plumbing system installations, our certified plumbers ensure quality workmanship and reliable service.",
      image: "/Fypimgs/plumbing.jpg",
      featuredServices: [
        "Pipe Repair & Replacement",
        "Faucet Installation & Repair",
        "Drain Cleaning",
        "Water Heater Installation",
        "Bathroom Plumbing",
        "Kitchen Plumbing",
        "Emergency Leak Repair",
        "Water Pressure Adjustment"
      ]
    },
    recommended: {
      title: "Recommended Services",
      description: "Our most popular and highly recommended services based on customer satisfaction and quality of service.",
      image: "/Fypimgs/recommended-services.jpg",
      featuredServices: [
        "Top-rated Cleaning Services",
        "Most Requested Repairs",
        "Essential Maintenance Packages",
        "Professional Installation Services"
      ]
    }
  };

  const currentCategory = categoryContent[category] || {};

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const categoryServices = await getServicesByCategory(category);
        setServices(categoryServices);
      } catch (err) {
        setError(err.message);
        console.error('Error loading category services:', err);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, [category, getServicesByCategory]);

  return (
    <>
      <Navbar firstName="GB-Home-" lastName="Services" />
      
      {/* Hero Section */}
      <div className='container py-md-5 py-2'>
        <div className="row">
          <div className="col-md-7 order-2 order-md-1 mt-md-5 mt-1">
            <h1 className='hero-heading gradient-heading main-heading'>{currentCategory.title}</h1>
            <p className='HeroPragraph mt-4 px-md-3 main-paragraph'>
              {currentCategory.description}
            </p>
            <form className="d-flex me-4 mt-md-5">
              <input className="form-outline form-control me-2 p-2 mb-md-0 mb-3 border shadow-none" 
                type="search" placeholder="Search services" aria-label="Search"/>
              <button className="nav-btn btn mb-md-0 mb-3" type="submit">Search</button>
            </form>
          </div>
          <div className="col-md-5 order-1 order-md-2 mt-md-0 align-items-center d-flex justify-content-center">
            <img 
              src={currentCategory.image} 
              style={{ width: '600px', height: '550px' }} 
              className="img-fluid" 
              alt={currentCategory.title}
              onError={(e) => {
                e.target.src = "/Fypimgs/default-service.jpg";
              }}
            />
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container-fluid mt-md-4 px-md-4 mb-md-5 HomeSection-bg py-5">
        <h1 className="fw-bold text-center mb-md-4 main-heading">Select Your Desired Service</h1>
        <h5 className="text-center mb-4 main-paragraph">
          GB-home-services provides ultimate installations, repairs, maintenance, and grooming services at your doorstep.
        </h5>

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

        {!loading && !error && services.length === 0 && (
          <div className="text-center py-5">
            <p>No services available in this category yet.</p>
            {/* Show featured services as fallback */}
            <div className="row mt-4">
              {currentCategory.featuredServices && currentCategory.featuredServices.map((service, index) => (
                <div key={index} className="col-lg-3 col-md-6 mb-4">
                  <div className="card shadow-lg h-100">
                    <div className="card-body text-center">
                      <h5 className="card-title">{service}</h5>
                      <p className="card-text text-muted">Coming soon</p>
                      <button className="btn btn-outline-primary" disabled>
                        Coming Soon
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && !error && services.length > 0 && (
          <div className="row">
            {services.map((service) => (
              <div key={service._id} className="col-lg-3 col-md-6 mb-4">
                <ServiceCards service={service} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Client Reviews Section */}
      <div className="container mb-md-5">
        <div className="row">
          <h4 className='text-center fw-bold'>Latest Customers Review</h4>
          <p className='text-center'>Here's what some of our customers say about us.</p>
          
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="col-lg-3 col-md-6 mb-3">
              <ClientReview 
                ClientName="Atif shahzad" 
                ClientAdress="Skarkue" 
                ClientMsg="I am very satisfied with GB-Home-Services they came to me timely and did my work professionally"
              />
            </div>
          ))}
        </div>
      </div>

      <Footer/>
    </>
  );
};

export default CategoryPage;