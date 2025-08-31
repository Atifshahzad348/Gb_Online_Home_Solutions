import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const About =()=>{
    return(
        <>
        <Navbar  firstName="GB-Home-" lastName="Solutions"/>
        <div className="container-fluid  px-3 md-px-5  md-py-5">
           <div className="row">
             <div className="col-12">
                <h2 className="fw-bold mb-md-4 display-5 about-title">About Us</h2>
                <p className="display-6 about-section-paragraph">
                GB-Home-Services was established in 2017 with the sole purpose of adding value to people’s lives by providing solutions to their multiple problems in one single stop. Since then, we have gained the trust of our customers through our diligence and reliability. Our apparent and obvious post-service results speak for our quality services.</p>
                <p className="display-6 about-section-paragraph">
                We provide all kind of services including cleaning services, pest control services, plumbing and electrician services, AC installation or repair services, geyser installation or repair services, home salon services, and more.
                </p>
             </div>
           </div>
        </div>
        <div className="container-fluid HomeSection-bg py-4 px-3 md-py-5 md-px-5">
            <div className="row">
                <div className="col-md-12">
                    <h2 className="text-center fw-bold">OUR MISSION</h2>
                    <p className="display-6 about-section-paragraph">We provide all kind of services including cleaning services, pest control services, plumbing and electrician services, AC installation or repair services, geyser installation or repair services, home salon services, and more.</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <img src="../Fypimgs/about.png" className="img-fluid" alt="aboutimg" />
                </div>
                <div className="col-md-7 ">
                    <div className="bg-white py-4 px-3 mb-3">
                            <h2 className="sc-color about-title">Our Company</h2>
                            <h5 className="about-section-paragraph">GB-Home-Services is formed with the idea of giving all an improved and worriless lifestyle, promoting trustworthiness and goodwill.</h5>
                    </div>
                    <div className="bg-black text-white py-4 px-3 mb-3 rounded">
                        <h2 className="sc-color about-title">Our Vision</h2>
                        <h5 className="about-section-paragraph">Our vision at GB-Home-Services is to revolutionize the service industry by becoming the go-to platform for seamless solutions. We aspire to create a society where every service need is met with ease and efficiency. Through cutting-edge technology and a relentless pursuit of excellence, we aim to set new standards in service delivery. We envision a future where GB-Home-Services is synonymous with reliability, innovation, and customer satisfaction. Together, let's redefine convenience and elevate the way services are accessed and experienced.</h5>
                    </div>
                    <div className="bg-white py-4 px-3 mb-3">
                            <h2 className="sc-color about-title">Our Passion</h2>
                            <h5 className="about-section-paragraph">We are passionate about our goals and are always willing to go to extra mile to give customers the experience they yearn for and deserve!</h5>
                    </div>
                    

                </div>
            </div>
          
        </div>
        <div className="container-fluid py-md-5 py-2 mt-mb-5 mt-0 mb-3 mb-md-4">
        <div className="row">
                <div className="col-md-12">
                    <h2 className="fw-bold text-center mb-md-4 about-title">What Gb-Home-Services Does?</h2>
                    <h5 className="text-center fw-bold about-section-paragraph">
                    At Kam Kaj, we take pride in our consistently high quality of services and guarantee against work done, all of which is possible only because of our carefully articulated processes and our strict adherence to them.All the technicians listed on Kam Kaj are background-verified, trustworthy, work-efficient people who are veterans in their respective professions.</h5>
                </div>
            </div>
        </div>
        <Footer/>
        </>


    );
}
export default About;