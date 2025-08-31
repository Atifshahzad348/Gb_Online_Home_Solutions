import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import NewOrderForm from '../Components/NewOrderForm';

/**
 * 
 */
const Curton = () => {
    return (
        <>
         <Navbar firstName="GB-Home-" lastName="Services"/>
        <div className="container-fluid py-5">
        <div className="row">
            <h2 className='text-center display-5 fw-bold'>Curton Cleaning Serivices</h2>
            <p className='text-center display-6'>Elevate your interior with our curtain cleaning expertise. We bring life back to your curtains, ensuring they hang beautifully and brighten up your space once again.</p>

        </div>
        <div className="row HomeSection-bg py-5 px-3 px-5 my-5">
            <div className="col-md-8">
                <h2>Curton Cleanig Services</h2>
                <h5 className='mb-md-5'>
                The most effective curtain cleaning services in Pakistan at your convenience, Kam Kaj is recognized as a leading curtain/blinds cleaning service provider. Our curtain/blinds cleaning services are the best cleaning services in Karachi, Lahore, and other cities in Pakistan.</h5>
                <img src="./Fypimgs/curtun.jpg" alt="" className='img-fluid' />
                <h3 className='mt-md-4 fw-bold'> GB-Home-Services specialized in Curton Cleaning.</h3>
                <h5 className=''>Our team of experienced cleaner eco-friendly products ensures outstanding results every time. Our cleaners have served more than 100,000+ commercial and residential customers in the last few years.

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



export default Curton;