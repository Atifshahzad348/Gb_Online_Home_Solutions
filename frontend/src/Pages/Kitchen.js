import React from 'react';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import ServiceCards from '../Components/ServiceCards';
import ClientReview from '../Components/ClientReview';






const Kitchen = () => {

    return (
    <>
     <div>
        <Navbar firstName="GB-Home-" lastName="Services" />
         {/* ***************************  kitchen services home *************************** */}
         <div className='container py-md-5 py-2'>
        <div className="row">
            <div className="col-md-7 order-2 order-md-1 mt-md-5 mt-1">
                <h1 className='hero-heading gradient-heading main-heading'>Kitchen Designing Services</h1>
                <p className='HeroPragraph mt-4 px-md-3 main-paragraph'>
                No need to worry about your kitchen design troubles anymore! Our skilled in-house designers from Gb-home-services are here to ensure your kitchen is in top-notch condition. Count on us for the most reliable and comprehensive range of kitchen designing and remodeling services available.
                </p>
                <form className="d-flex me-4 mt-md-5">
                    <input className="form-outline form-control me-2 p-2 mb-md-0 mb-3 border shadow-none" type="search" placeholder="Search services" aria-label="Search"/>
                    <button className="nav-btn btn mb-md-0 mb-3" type="submit">Search</button>
                </form>
            </div>
            <div className="col-md-5  order-1 order-md-2 mt-md-0  align-items-center d-flex justify-content-center">
                <img src="/Fypimgs/Kitchenimg.jpg"  style={{ width: '600px', height: '550px' }}   className="img-fluid kitchen-img" alt="Description" />

            </div>
        </div>
    </div>
         {/* ***************************  kitchen services home  end*************************** */}

        {/* select your desired service section */}
        <div className="container-fluid mt-md-4 px-md-4 mb-md-5 HomeSection-bg py-5">
        <h1 className="fw-bold text-center mb-md-4 main-heading">Selecte Your Desire Service</h1>
        <h5 className="text-center mb-4 main-paragraph">GB-home-services provides ultimate installations, repairs, maintenance, and grooming services at your doorstep.</h5>
{/* ############# First row #################### */}
<div className="row  mb-md-4">
  <div className="col-lg-3">
        <ServiceCards imglink="/Fypimgs/Kitchen Renovation.jpg" cardTitle="1.Kitchen Renovation and repairing existing designs" paragraph="we are providing curtun cleaning services to you" link="/Curton" />
      </div>
      <div className="col-lg-3">
        <ServiceCards imglink="/Fypimgs/HoodDesign.jpg" cardTitle="2.Kitchen Hood Design & Installation" paragraph="we are providing curtun cleaning services to you" link="/AcInstallation" />
      </div>
      <div className="col-lg-3">
        <ServiceCards imglink="/Fypimgs/KitchenTile.jpg" cardTitle="3.Kitchen Tile Fitting & Wall Finishing" paragraph="we are providing curtun cleaning services to you" link="CarpetCleaning" />
      </div>
      <div className="col-lg-3">
        <ServiceCards imglink="/Fypimgs/kitchenCupboard.jpg" cardTitle="4.Cupboards & Cabinet Design" paragraph="we are providing curtun cleaning services to you" link="/WatrerDespensor" />
      </div>
    
  </div>
{/* ############# Sercound row #################### */}
 <div className="row  mb-md-4">
  <div className="col-lg-3">
        <ServiceCards imglink="/Fypimgs/CounterTop.jpg" cardTitle="5.Countertop Installation" paragraph="we are providing curtun cleaning services to you" link="/Curton" />
      </div>
      <div className="col-lg-3">
        <ServiceCards imglink="/Fypimgs/KitchenLigh.jpg" cardTitle="6.Lighting Design for Kitchens" paragraph="we are providing curtun cleaning services to you" link="/AcInstallation" />
      </div>
      <div className="col-lg-3">
        <ServiceCards imglink="/Fypimgs/KitchenSink.jpg" cardTitle="7.Plumbing & Sink Installation" paragraph="we are providing curtun cleaning services to you" link="CarpetCleaning" />
      </div>
      <div className="col-lg-3">
        <ServiceCards imglink="/Fypimgs/KitchenAppliances.jpg" cardTitle="8.Appliance Integration" paragraph="we are providing curtun cleaning services to you" link="/WatrerDespensor" />
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
        <ClientReview ClientName="Atif shahzad" ClientAdress="Skarkue" ClientMsg="I am very satisfied with KamKaj they came to me timely and did my work professionally"/>
    </div>

   <div className="col-lg-3 col-md-6 mb-3">
   <ClientReview ClientName="Atif shahzad" ClientAdress="Skarkue" ClientMsg="I am very satisfied with KamKaj they came to me timely and did my work professionally"/>
   </div>
 
   
   <div className="col-lg-3 col-md-6 mb-3">
   <ClientReview ClientName="Atif shahzad" ClientAdress="Skarkue" ClientMsg="I am very satisfied with KamKaj they came to me timely and did my work professionally"/>
   </div>
   <div className="col-lg-3 col-md-6 mb-3">
   <ClientReview ClientName="Atif shahzad" ClientAdress="Skarkue" ClientMsg="I am very satisfied with KamKaj they came to me timely and did my work professionally"/>
   </div>
   </div>
   


    
   </div>


 

   
    </div>

 
 {/* latest customer review section */}
        <Footer/>


    </>
    );
}



export default Kitchen;