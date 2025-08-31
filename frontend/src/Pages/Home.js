import React from "react";
import Navbar from "../Components/Navbar";
import HeroSection from "../Components/HeroSection";
import Footer from "../Components/Footer";
import HomeSecondSection from "../Components/HomeSecondSection";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import ServiceCards from "../Components/ServiceCards";
import Progress from "../Components/Progress";


const Home =()=>{
    return(
        <>
       
        <Navbar firstName="GB-Home-" lastName="Solutions"/>
        <HeroSection/>
        <Progress/>
 <div className="container-fluid mt-5 px-md-4 top-services py-md-5 py-3">
 <h1 className="text-center mb-3 fw-bold ubuntu-bold herosection-title">Our Top Services</h1>
  <h5 className="text-center mb-4 herosection-paragraph">GB-home-services provides ultimate installations, repairs, maintenance, and grooming services at your doorstep.</h5>
  <div className="row">
    <div className="col-lg-3 col-6 col-md-6 mb-3">
    <Link className="text-decoration-none" to="/kitchen">
    <div className="s-card card text-center md-h-100 py-5  shadow-lg" onClick="window.location='#'">
        <div className="card-body">
          <img src="./Fypimgs/ktchenicon.png" alt="" className="img-size  mb-3"/>
          <h5 className="card-title ubuntu-bold">Kitchen Designing </h5>
        </div>
      </div>
    </Link>
    </div>
    <div className="col-lg-3 col-6  col-md-6 mb-3">
    <Link className="text-decoration-none" to="/paint">
    <div className="s-card card text-center md-h-100  py-5 shadow-lg" onClick="window.location='#'">
        <div className="card-body">
         <img src="./Fypimgs/housepainticon.png" alt="" className="img-size mb-3" />
          <h5 className="card-title ubuntu-bold">House Paint Services</h5>
        </div>
      </div>
    </Link>
    </div>
    <div className="col-lg-3 col-6  col-md-6 mb-3">
    <Link className="text-decoration-none" to="/electrical">
    <div className="s-card card text-center md-h-100  py-5 shadow-lg" onClick="window.location='#'">
        <div className="card-body">
          <img src="./Fypimgs/electric.png" alt="img" className="mb-3 img-size"/>
          <h5 className="card-title ubuntu-bold">Electrical Services</h5>
        </div>
      </div>
    </Link>
    </div>
    <div className="col-lg-3 col-6 col-md-6 mb-3">
    <Link className="text-decoration-none" to="/plumbing">
    <div className="s-card card text-center md-h-100 py-5 shadow-lg" onClick="window.location='#'">
        <div className="card-body">
          <img src="./Fypimgs/plumbingicon.png" alt="" className="img-size mb-3" />
          <h5 className="card-title ubuntu-bold">Plumbing Services</h5>
        </div>
      </div>
    </Link>
    </div>
  </div>
</div>

<div className="container-fluid recommended-services">
<div className="container  mt-md-4 py-5 px-md-4 mb-md-5">
  <h1 className="fw-bold text-center mb-md-4 ubuntu-bold herosection-title ">Recomended Services For You</h1>
{/*########## First ROW START ########## */}
  <div className="row  mb-md-4">
  <div className="col-lg-3">
       
        <ServiceCards imglink="/Fypimgs/curtun.jpg" cardTitle="Curtun Cleaning" paragraph="we are providing curtun cleaning services to you" link="/Curton" />
  </div>
  <div className="col-lg-3">
       
        <ServiceCards imglink="/Fypimgs/ac.jpg" cardTitle="Ac Repairing" paragraph="we are providing curtun cleaning services to you" link="/AcInstallation" />
  </div>
  <div className="col-lg-3">
       <ServiceCards imglink="/Fypimgs/carpet.jpg" cardTitle="Carpet Cleaning" paragraph="we are providing curtun cleaning services to you" link="CarpetCleaning" />
  </div>
  <div className="col-lg-3">
       
        <ServiceCards imglink="/Fypimgs/despensor.jpg" cardTitle="Despensor Repairing" paragraph="we are providing curtun cleaning services to you" link="/WaterDespensor" />
  </div>
    
  </div>
 {/*########## SECOUND ROW START ########## */}
 <div className="row mb-md-4">
      <div className="col-lg-3">
        <ServiceCards imglink="/Fypimgs/electriction.jpg" cardTitle="Electric Services" paragraph="we are providing curtun cleaning services to you" link="/Electrition" />
      </div>
      <div className="col-lg-3">
        <ServiceCards imglink="/Fypimgs/microwave.jpg" cardTitle="Micro Repairing" paragraph="we are providing curtun cleaning services to you" link="/Microwave" />
      </div>
      <div className="col-lg-3">
        <ServiceCards imglink="/Fypimgs/refirigrator.jpg" cardTitle="Refirigrator Repairing" paragraph="we are providing curtun cleaning services to you" link="/Refrigirator" />
      </div>
      <div className="col-lg-3">
        <ServiceCards imglink="/Fypimgs/washingmachine.jpg" cardTitle="Washing Machine" paragraph="we are providing curtun cleaning services to you" link="/WashingMachine" />
      </div>
 </div>
 {/*########## Third ROW START ########## */}
 <div className="row mb-md-4">
      <div className="col-lg-3">
        <ServiceCards imglink="/Fypimgs/curtun.jpg" cardTitle="WaterTank Cleaning" paragraph="we are providing curtun cleaning services to you" link="/WaterTank" />
      </div>
      <div className="col-lg-3">
        <ServiceCards imglink="/Fypimgs/curtun.jpg" cardTitle="Deep Cleaning" paragraph="we are providing curtun cleaning services to you" link="/DeepCleaning" />
      </div>
      <div className="col-lg-3">
        <ServiceCards imglink="/Fypimgs/sofa.jpg" cardTitle="Sofa Cleaning" paragraph="we are providing curtun cleaning services to you" link="/SofaCleaning" />
      </div>
      <div className="col-lg-3">
        <ServiceCards imglink="/Fypimgs/sofa.jpg" cardTitle="Pest Control services" paragraph="we are providing curtun cleaning services to you" link="/PestControl" />
      </div>
 </div>

   {/*########## Third  ROW End  ########## */}
 
</div>
</div>

 
        
        
        
        <HomeSecondSection/>
        <Footer/>
        </>

    );
}
Home.propsType={
  firstName: PropTypes.string,
}
export default Home;