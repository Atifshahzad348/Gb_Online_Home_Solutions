import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import NewOrderForm from '../Components/OrderForm';
;

/**
 * 
 */
const WashingMachine = () => {
    return (
        <>
        <Navbar firstName="GB-Home-" lastName="Services" />
        <div className="container-fluid py-5">
        <div className="row">
            <h2 className='text-center display-5 fw-bold'>washing Machine Repairing Services</h2>
            <p className='text-center display-6'>Are appliance troubles disrupting your life? Like washing machines? Show your appliances some care they deserve. Reach out to Kam Kaj for quick solutions. Our team is ready to provide swift and efficient results.</p>

        </div>
        <div className="row HomeSection-bg py-5 px-3 px-5 my-5">
            <div className="col-md-8">
                <h2>washing Machine repairing Services</h2>
                <h5 className='mb-md-5'>
                Gb-Home-Services provides the best & most reliable Washing Machine Repair, Maintenance, and Installation Services at your doorstep. Our experienced & specialized technicians can repair all types of Automatic and Manual Washing Machines.</h5>
                <img src="./Fypimgs/washingmachine.jpg" alt="" className='img-fluid' />
                <h3 className='mt-md-4 fw-bold'>Automatic Washing Machine Repair Services</h3>
                <h5 className=''>
                Our more than 7+ years of experienced technicians have repaired more than 50,000+ washing machines in the last few years and they are experts in repairing both front-load washing machines and top-load washing machines.</h5>
                
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



export default WashingMachine;