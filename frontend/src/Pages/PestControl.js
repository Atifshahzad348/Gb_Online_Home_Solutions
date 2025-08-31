import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import NewOrderForm from '../Components/NewOrderForm';


/**
 * 
 */
const PestControl = (props) => {
    return (
        <>
        <Navbar firstName="GB-Home-" lastName="Services" />
        <div className="container-fluid py-5">
        <div className="row">
            <h2 className='text-center display-5 fw-bold'>PestControl Control Serivices</h2>
            <p className='text-center display-6'>Gb-home-Services provides top-notch fumigation services to ensure your home/office is pest-free and safe. Our domestic fumigation services are designed to eliminate a wide range of pests, including termites, cockroaches, bed bugs, ants, and more.</p>

        </div>
        <div className="row HomeSection-bg py-5 px-3 px-5 my-5">
            <div className="col-md-8">
                <h2>Best Pest Control Services.</h2>
                <h5 className='mb-md-5'>
                Gb-Home-Services provides top-notch fumigation services to ensure your home/office is pest-free and safe. Our experienced and certified professionals conduct thorough inspections and apply targeted treatments to eradicate pests from their source.</h5>
                <img src="./Fypimgs/pest.jpg" alt="" className='img-fluid' />
              
                <h5 className=''>Our experts have more than 7+ years of experience in the fumigation industry and we have served more than 100,000+ customers in the last few years.</h5>
                
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



export default PestControl;