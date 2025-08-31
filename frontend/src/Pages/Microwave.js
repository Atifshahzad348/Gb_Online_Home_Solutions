import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import NewOrderForm from '../Components/NewOrderForm';


/**
 * 
 */
const MicroWave = () => {
    return (
        <>
        <Navbar firstName="GB-Home-" lastName="Services" />
        <div className="container-fluid py-5">
        <div className="row">
            <h2 className='text-center display-5 fw-bold'>MicroWave Repairing Serivices</h2>
            <p className='text-center display-6'>Gb-Home-servives provides top-notch fumigation services to ensure your home/office is pest-free and safe. Our domestic fumigation services are designed to eliminate a wide range of pests, including termites, cockroaches, bed bugs, ants, and more</p>

        </div>
        <div className="row HomeSection-bg py-5 px-3 px-5 my-5">
            <div className="col-md-8">
                <h2>Microwave Maintenance Services</h2>
                <h5 className='mb-md-5'>
                Kam Kaj provides top-notch fumigation services to ensure your home/office is pest-free and safe. Our experienced and certified professionals conduct thorough inspections and apply targeted treatments to eradicate pests from their source.</h5>
                <img src="./Fypimgs/microwave.jpg" alt="" className='img-fluid' />
            
                <h5 className=''>With our in-house 6+ years of experienced staff, we have repaired more than 30,000+ microwaves in the last few years. Our repair services are the best services in Karachi, Lahore, and other cities in Pakistan.</h5>
                
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



export default MicroWave;