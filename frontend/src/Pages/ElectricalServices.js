import React from 'react';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import {Link} from "react-router-dom";




/**
 * 
 */
const ElectricalServices = () => {
    return (
        <>
        <div>
        <Navbar firstName="GB-Home-" lastName="Services"/>
         {/* ***************************  kitchen services home *************************** */}
         <div className='container py-md-5 py-2'>
        <div className="row">
            <div className="col-md-7 mt-md-5 mt-1">
                <h1 className='hero-heading'>Electrical Services</h1>
                <p className='HeroPragraph mt-4 px-md-3'>
                Ensure the safety and efficiency of your home’s electrical system with our expert wiring and rewiring services. Whether you’re building a new home or renovating an old one, our skilled electricians can handle all your wiring needs, ensuring compliance with the latest safety standards and regulations.
                </p>
                <form className="d-flex me-4 mt-md-5">
                    <input className="form-outline form-control me-2 p-2 mb-md-0 mb-3 border shadow-none" type="search" placeholder="Search services" aria-label="Search"/>
                    <button className="nav-btn btn mb-md-0 mb-3" type="submit">Search</button>
                </form>
            </div>
            <div className="col-md-5 mt-md-0 mt-3">
                 <img src="/Fypimgs/Electricimg.jpg"  style={{ width: '600px', height: '400px' }}   className="img-fluid kitchen-img" alt="Description" />
            </div>
        </div>
    </div>
         {/* ***************************  kitchen services home  end*************************** */}

        {/* select your desired service section */}
        <div className="container-fluid mt-md-4 px-md-4 mb-md-5 HomeSection-bg py-5">
        <h1 className="fw-bold text-center mb-md-4">Selecte Your Desire Service</h1>
        <h5 className="text-center mb-4">GB-home-services provides ultimate installations, repairs, maintenance, and grooming services at your doorstep.</h5>
    <div className="row">
    <div className="col-lg-6 col-md-6 mb-3">
        <Link className="text-decoration-none" to="/log">
        <div className="s-card card text-center h-100 pt-5 pb-2 shadow-lg service-card-bg1" onclick="window.location='#'">
            <div className="card-body">
            <i class="fa-solid fa-house-laptop mb-3"></i> 
            <h5 className="card-title fw-bold mb-md-5 text-white ">Lighting Installation and Repair
            </h5>
            <button className="btn card-btn w-100">BOOK NOW</button>
            </div>
        </div>
        </Link>
        </div>
        <div className="col-lg-6 col-md-6 mb-3">
        <Link className="text-decoration-none" to="/log">
        <div className="s-card card text-center h-100 pt-5 pb-2 shadow-lg  service-card-bg2" onclick="window.location='#'">
            <div className="card-body">
            <i class="fa-solid fa-house-laptop mb-3"></i> 
            <h5 className="card-title fw-bold mb-md-5 text-white">Electrical Panel Upgrades</h5>
            <button className="btn card-btn w-100">BOOK NOW</button>
            </div>
        </div>
        </Link>
        </div>
      
 </div>
{/* ################################# */}
<div className="row">
<div className="col-lg-6 col-md-6 mb-3">
        <Link className="text-decoration-none" to="/log">
        <div className="s-card card text-center h-100 pt-5 pb-2 shadow-lg" onclick="window.location='#'">
            <div className="card-body">
            <i class="fa-solid fa-house-laptop mb-3"></i> 
            <h5 className="card-title fw-bold mb-md-5 ">Emergency Electrical Services</h5>
            <button className="btn card-btn w-100">BOOK NOW</button>
            </div>
        </div>
        </Link>
        </div>
        <div className="col-lg-6 col-md-6 mb-6">
        <Link className="text-decoration-none" to="/log">
        <div className="s-card card text-center h-100 pt-5 pb-2 shadow-lg" onclick="window.location='#'">
            <div className="card-body">
            <i class="fa-solid fa-house-laptop mb-3"></i> 
            <h5 className="card-title fw-bold mb-md-5 ">Emergency Electrical Services</h5>
            <button className="btn card-btn w-100">BOOK NOW</button>
            </div>
        </div>
        </Link>
        </div>
</div>

{/* ################################# */}

 
</div>
 {/* select your desired service section */}
 {/* latest customer review section */}
 <div className="container mb-md-5">
    <div className="row">
    <h4 className='text-center fw-bold'>Latest Custumers Review</h4>
    <p className='text-center'>Here’s what some of our customers say about us.</p>
    <div className="col-lg-3 col-md-6 mb-3">
   <div className="card h-100 shadow-lg" onclick="window.location='#'">
        <div className="card-body">
           <h5 className="card-title">Malik Abul Hassan</h5>
           <p className=''>GILGit</p>
           <p className='mt-4'>I am very satisfied with KamKaj they came to me timely and did my work professionally</p>
        </div>
      </div>
   </div>

   <div className="col-lg-3 col-md-6 mb-3">
   <div className="card h-100 shadow-lg" onclick="window.location='#'">
        <div className="card-body">
           <h5 className="card-title">Atif shahzad</h5>
           <p className=''>Amphary</p>
           <p className='mt-4'>I am very satisfied with KamKaj they came to me timely and did my work professionally</p>
        </div>
      </div>
   </div>
 
   
   <div className="col-lg-3 col-md-6 mb-3">
   <div className="card h-100 shadow-lg" onclick="window.location='#'">
        <div className="card-body">
           <h5 className="card-title">Aftab Hussain</h5>
           <p className=''>jutiyal</p>
           <p className='mt-4'>I am very satisfied with KamKaj they came to me timely and did my work professionally</p>
        </div>
    </div>
   </div>
   <div className="col-lg-3 col-md-6 mb-3">
   <div className="card h-100 shadow-lg" onclick="window.location='#'">
        <div className="card-body">
           <h5 className="card-title ">Sunail ayub</h5>
           <p className=''>konudas</p>
           <p className='mt-4'>I am very satisfied with KamKaj they came to me timely and did my work professionally</p>
        </div>
    </div>

   </div>
   </div>
   


    
   </div>


 

   
    </div>

 
 {/* latest customer review section */}
 <div className="container-fluid HomeSection-bg py-5 px-md-5">
    <div className="row">
        <h2 className='text-center mb-md-4'>More About Paint Services</h2>
        <div className="col-md-12">
            <h4>Professional Residential, Commercial, and Apartment Painting Services</h4>
            <p>
            A dedicated house painting service is essential for enhancing and protecting your property. We are the leading residential and commercial painting company in Pakistan, and for over 4 years, we have been providing professional house painting services and office painting services throughout Karachi and Lahore. At Gb-home-services, we love to provide the best home painting services to our customers to show them we care. Our professional in-house commercial and residential painters are happy to take on all sorts of painting projects. We use advanced painting equipment and only high-quality imported paints that ensure a beautiful, long-lasting finish for your home or office.
            </p>
            <h3>Why You Need Professional Painting Services?</h3>
            <p>All businesses and homeowners can see astonishing painting results and will notice many benefits when they avail themselves of professional residential and commercial painting services. A few of them are</p>
            <h4>Advanced Painting Tools and Equipment</h4>
            <p>
            Professional residential, commercial, and apartment painting service providers or office painting service providers like Gb-home-services are aware of all the major innovations and developments in the painting industry. We have invested our resources into finding the absolute best painting machinery and equipment available in the market. We use imported paints and painting products to deliver impeccable and high-quality painting results.
            </p>
            <h4>Skilled In-House Painting Staff</h4>
            <p>At Gb-home-services, we have a team of highly skilled in-house painting professionals who are experts in their job. We also provide training to our painting staff to ensure they provide the best painting results. All our in-house painters are vetted and background checked so that you are confident when you are availing our residential and commercial painting services with complete peace of mind.</p>
            <h4>We Deliver Exceptional Painting Results</h4>
            <p>The most significant overall benefit of having a professional house painting service like Gb-home-services is that you will be amazed at just how much difference a professional home painting service provider can make in the look of your home or office. Also, with professional painting services, you can enhance the aesthetic appeal and value of your property, ensuring a welcoming and vibrant environment for your family and employees.</p>
           <h4>Flexible Appointment:</h4>
            <p>You can book an appointment by calling our UAN: 0304-111-1526, by downloading the Gb-home-services app at Google Play or the App Store. You can also visit our website at gb-home-services.pk.</p>
        </div>
       
        
    </div>
 </div>
        <Footer/>
        </>
    );
}




export default ElectricalServices;