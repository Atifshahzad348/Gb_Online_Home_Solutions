import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import NewOrderForm from '../Components/NewOrderForm';


const AcInstallation = () => {
    return <>
     <Navbar firstName="GB-Home-" lastName="Services"/>
     <div className="container-fluid md-py-5 py-3">
        <div className="row">
            <h2 className='text-center display-5 fw-bold main-heading'>Ac Installation And Repair Services</h2>
            <p className='text-center display-6 main-paragraph'>GB-Home-Services offers the ultimate, reliable solution for all your AC repair needs. Our comprehensive services encompass AC repair, installation, as well as HVAC installation and repair. Our team of skilled and certified professionals is dedicated to providing a quick and effective solution. Trust GB-Home-Services for a hassle-free cooling experience like never before.</p>

        </div>
        <div className="row HomeSection-bg py-5 px-2 md-px-3 my-5">
            <div className="col-md-8">
                <h2 className='main-heading'>AC Repair and Installation Services</h2>
                <h5 className='mb-md-5 main-paragraph'>
                GB-Home-Services provides professional and reliable AC installation, AC maintenance, and AC repair services at your doorstep. We provide the best AC services in Karachi and Lahore. Our post-service guarantee speaks for our quality services.</h5>
                <img src="./Fypimgs/ac.jpg" alt="" className='img-fluid' />
                <h5 className='mt-md-5 main-paragraph mt-2'>GB-Home Services is your go-to solution for any AC repair and AC installation services. Our certified and highly trained in-house staff have more than 8+ years of experience in repairing any inverter AC, non-inverter AC, and floor standing AC.</h5>
                
            </div>
           
             <div className="col-md-4 py-4">
             {/* <OrderForm opt1="AC" opt2="DC"/> */}
               <NewOrderForm/>
             </div>
            
            
        </div>

     </div>
    <Footer/>
    </>;
}


export default AcInstallation;