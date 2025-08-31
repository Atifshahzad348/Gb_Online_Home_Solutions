import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import NewOrderForm from '../Components/NewOrderForm';


/**
 * 
 */
const Electrition = () => {
    return (
        <>
         <Navbar firstName="GB-Home-" lastName="Services"/>
        <div className="container-fluid py-5">
        <div className="row">
            <h2 className='text-center display-5 fw-bold'>Electricity installation Serivices</h2>
            <p className='text-center display-6'>Kam Kaj offers reliable and professional electrician services for all your electrical needs. Our certified electricians are equipped to handle a wide range of tasks, including electrical repairs, wiring, installations, and maintenance. Whether you need help with lighting installations, circuit breaker upgrades, or troubleshooting electrical issues, our team ensures safe and efficient solutions.</p>

        </div>
        <div className="row HomeSection-bg py-5 px-3 px-5 my-5">
            <div className="col-md-8">
                <h2>Electrition Services</h2>
                <h5 className='mb-md-5'>
                Gb-home-Services top-notch electrician services bring reliable and efficient solutions to your doorstep. Whether you need a quick fix or a complete overhaul, our team of skilled electricians is equipped to easily handle any electrical problem. our electrician services are best in Karachi and Lahore.</h5>
                <img src="./Fypimgs/electriction.jpg" alt="" className='img-fluid' />
                <h3 className='mt-md-4 fw-bold'>Why Choose Kam Kaj Electricians Services:</h3>
                <h5 className=''>With more than 6+ years of experience in the industry, we are well-versed in handling a wide range of electrical projects, from residential to commercial and industrial settings. We have served more than 50,000+ customers in the last few years.

</h5>
                
            </div>
            <div className="col-md-4 py-4">
               <NewOrderForm/>
             </div>
        </div>

     </div>
        <Footer/>
        </>
    );
}



export default Electrition;