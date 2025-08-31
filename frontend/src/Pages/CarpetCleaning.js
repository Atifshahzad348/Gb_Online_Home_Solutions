import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import NewOrderForm from '../Components/OrderForm';


/**
 * 
 */
const CarpetCleaning = () => {
    return (
        <>
         <Navbar firstName="GB-Home-" lastName="Services"/>
        <div className="container-fluid py-5">
        <div className="row">
            <h2 className='text-center display-5 fw-bold'>Carpet Cleaning Services</h2>
            <p className='text-center display-6'>Transform your carpets from dull to dazzling with our expert carpet cleaning. Our advanced techniques remove deep-seated dirt and revive the colors, making your floors a pleasure to walk on.</p>

        </div>
        <div className="row HomeSection-bg py-5 px-3 px-5 my-5">
            <div className="col-md-8">
                <h2>Carpet Cleanig Services</h2>
                <h5 className='mb-md-5'>
                GB-Home Services is a well-known sofa-cleaning service provider in Gilgit. We provide the best sofa cleaning services right at your doorstep, with our in-house 10+ years of experienced staff. From leather to velvet, we specialize in cleaning all types of sofa fabrics.</h5>
                <img src="./Fypimgs/carpet.jpg" alt="" className='img-fluid' />
                <h3 className='mt-md-4 fw-bold'> GB-Home-Services specialized in Sofa Cleaning.</h3>
                <h5 className=''>We provide sofa cleaning and microfiber cleaning for restaurant chairs, office chairs, sofas, and other upholstered furniture at your own home and office. GB-Home Services' sofa cleaning services deal with both corporate and residential needs. We have 6+ years of experienced in-house staff, and we have served more than 100,000 customers in the last few years.</h5>
                
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



export default CarpetCleaning;