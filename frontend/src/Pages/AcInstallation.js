import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import NewOrderForm from '../Components/NewOrderForm';





// #region constants

// #endregion

// #region styled-components

// #endregion

// #region functions

// #endregion

// #region component


/**
 * 
 */
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
            {/* <div className="col-md-4 py-4">
                <form action="" className='bg-black text-white py-5 px-4 rounded-3'>
                    <h2 className='sc-color text-center fw-bold main-paragraph'>Please Fill the Form below</h2>
                    <h5 className='main-paragraph'>You will recive a call in few minutes to guide you regarding your query.</h5>
                    <input type="text" placeholder='Name'  className="order-form-input w-100 form-control me-2 p-2 mb-md-0 mb-3 border mt-3"/>
                    <input type="text" placeholder='03xxxxxxxx'  className="order-form-input w-100 form-control me-2 p-2 mb-md-0 mb-3 border mt-3"/>
                    <input type="text" placeholder='City'  className="order-form-input w-100 form-control me-2 p-2 mb-md-0 mb-3 border mt-3"/>
                    <input type="text" placeholder='Address'  className="order-form-input w-100 form-control me-2 p-2 mb-md-0 mb-3 border mt-3"/>
                    <label htmlFor="" className="fw-bold mt-3 mb-3">Choose your AC Type</label>
                    <div className='d-flex justify-content-between'>
                        <div className='border border-rounde radio-btn'>
                           <label htmlFor="" className="fw-bold"><input type="radio" name='actype' /> Invertor</label>
                        </div>
                        <div className='border border-rounde radio-btn'>
                           <label htmlFor="" className="fw-bold"><input type="radio" name='actype' /> non-Invertor</label>
                        </div>
                      
                    </div>

                    <label htmlFor="" className="fw-bold mt-3 mb-3">Choose your Service Type</label>
                    <div className='d-flex justify-content-between'>
                        <div className='border border-rounde radio-btn'>
                           <label htmlFor="" className="fw-bold"><input type="radio" name='actype' /> <br /> Repair</label>
                        </div>
                        <div className='border border-rounde radio-btn'>
                           <label htmlFor="" className="fw-bold"><input type="radio" name='actype' />  <br /> Visit</label>
                        </div>
                       
                      
                    </div>
                    <div className='d-flex justify-content-between mt-3'>
                    <div className='border border-rounde radio-btn'>
                           <label htmlFor="" className="fw-bold"><input type="radio" name='actype' />   <br />Installation</label>
                   </div>
                        <div className='border border-rounde radio-btn'>
                           <label htmlFor="" className="fw-bold"><input type="radio" name='actype' /> <br /> Service</label>
                        </div>
                    </div>
                    <div>
                    <label htmlFor="" className="fw-bold"><br />Explain your problem (optional)</label>
                    <textarea class="form-control mt-md-3 " id="exampleFormControlTextarea1" rows="5"></textarea>
                    </div>
                    <button className='btn order-form-btn fw-bold w-100 mt-3'>Confirm Order</button>
                </form>

             </div>......... */}
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