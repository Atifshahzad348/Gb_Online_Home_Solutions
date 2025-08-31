import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import NewOrderForm from '../Components/NewOrderForm';


/**
 * 
 */
const Refrigirator = () => {
    return (
        <>
        <Navbar firstName="GB-Home-" lastName="Services" />
        <div className="container-fluid py-5">
        <div className="row">
            <h2 className='text-center display-5 fw-bold'>Refrigirator Repairing Serivices</h2>
            <p className='text-center display-6'>Our skilled technicians are well-versed in repairing a variety of refrigerator and deep freezer models. From cooling issues to faulty compressors, we've got you covered. Trust us to keep your appliances running smoothly.</p>

        </div>
        <div className="row HomeSection-bg py-5 px-3 px-5 my-5">
            <div className="col-md-8">
                <h2>Refrigerator Repair & Maintenance Services</h2>
                <h5 className='mb-md-5'>
                Gb-Home-Services provides quality and reliable Refrigerator Repair Services. We provide all types of deep freezer repair services, non-frost fridge repair services, deep-frost fridge repair services, and double-door fridge repair services at your doorstep.</h5>
                <img src="./Fypimgs/refirigrator.jpg" alt="" className='img-fluid' />
                
                <h5 className=''>Our certified and experienced staff have more than 7+ years of experience and have repaired 70,000+ refrigerators over the last few years.</h5>
                
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


export default Refrigirator;