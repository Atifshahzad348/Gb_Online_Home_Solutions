import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import {toast } from 'react-toastify';

// #region constants

// #endregion

// #region styled-components

// #endregion

// #region functions

// #endregion

// #region component
const propTypes = {};

const defaultProps = {};

/**
 * 
 */

const HeroSection = () => {
   const [info, setInfo] = useState({
    name: "",
    contact: "",
    service: "",
    city: "",
    area: "",
    address: "",
    isNew: true,
   });
    ////// handle input ////////
    const handleInput =(event)=>{
        let name  = event.target.name;
        let value = event.target.value;
    setInfo({
         ...info,
         [name]: value
    })
}

// form validation
const {
        register,
        handleSubmit,
        formState: {errors},
         reset  
        
    } = useForm();
    const submitCall = async (data) =>{
        
       try{ console.log(data);
          console.log(info)
          const response = await fetch(`http://localhost:5000/api/call/clientcall`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(info)
        });
        if(response.ok){
             reset(); 
            //    setInfo({name:"", contact: "", service: "", city: "", area: "",  address: "" });
               toast.success("Your call Request submited")
            
        }else{
            toast.error("Your message is not submited")
        }
        } catch{
            alert("invalid cridentials!")
        }

    }

// form validation 


    return <div className='container py-md-5 py-2'>
        <div className="row">
            <div className="col-md-8 mt-md-5 mt-1">
                <h1 className='hero-heading ubuntu-bold herosection-title'> <span className='primary-color ubuntu-bold'>Skilled Professional</span> <span className='ubuntu-bold'>At Your</span>   Doorstep.</h1>
                <p className='HeroPragraph mt-4 px-md-3 ubuntu-regular herosection-paragraph'>
                   Gb-home-service providers is a leading multiple service provider company catering to your 360 needs with quality guaranteed.

                    The aim and priority of Gb-home-service providers are to add value to our consumers' lives by providing smart solutions to all their problems. Our pride is providing the most extensive range of services. From home maintenance to personal assistance, we make sure that your safety is never compromised. This is why we hire all the staff under the roof of Gb-home-service providers, just for your satisfaction.
                </p>
                <form className="d-flex me-4 mt-md-5">
                    <input className="form-outline form-control me-2 px-2 py-0 mb-md-0 mb-3 border  shadow-none" type="search" placeholder="Search services" aria-label="Search"/>
                    <button className="nav-btn btn mb-md-0 mb-2 mt-2 mt-md-0 text-white" type="submit">Search</button>
                </form>
            </div>
            <div className="col-md-4 mt-md-0 mt-3">
                <div className="container bg-black text-white px-4 rounded-3 pt-4 pb-4">
                    <div className="col-12">
                        <form onSubmit={handleSubmit(submitCall)}> 
                                <h3 className='text-center fw-bold mb-4 herosection-title'>Book Your Service</h3>
                                <input {...register("name", {required: "required"})} onChange={handleInput}  className="form-control me-2 p-2 mb-md-0 mb-3 border mt-3" type="text" placeholder="Name" name='name' aria-label="Search"/>
                                 {errors.name && <div className="text-danger">{errors.name.message}</div>}
                                <input {...register("contact", {required: "required"})} onChange={handleInput}  className=" form-control me-2 p-2 mb-md-0 mb-3 border mt-3" type="text" placeholder="03xxxxxxxxxxx" name="contact" aria-label="Search"/>
                                 {errors.contact && <div className="text-danger">{errors.contact.message}</div>}
                                <input {...register("service", {required: "required"})} onChange={handleInput}  className=" form-control me-2 p-2 mb-md-0 mb-3 border mt-3" type="text" placeholder="Select Service" name="service" aria-label="Search"/>
                                 {errors.service && <div className="text-danger">{errors.service.message}</div>}
                                <input {...register("city", {required: "required"})}  onChange={handleInput} className=" form-control me-2 p-2 mb-md-0 mb-3 border mt-3" type="text"  placeholder="City" name='city' aria-label="Search"/>
                                 {errors.city && <div className="text-danger">{errors.city.message}</div>}
                                <input {...register("area",{required: "required"})} onChange={handleInput}  className=" form-control me-2 p-2 mb-md-0 mb-3 border mt-3 mb-3" type="text" placeholder="Area" name='area' aria-label="Search"/>
                                 {errors.area && <div className="text-danger">{errors.area.message}</div>}
                                <input {...register("address",{required: "required"})}  onChange={handleInput} className=" form-control me-2 p-2 mb-md-0 mb-3 border mt-3 mb-3" type="text" placeholder="Adress" name="address" aria-label="Search"/>
                                  {errors.address && <div className="text-danger">{errors.address.message}</div>}
                                <button type='submit' className='btn form-btn w-100'>Request to call</button>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

// HeroSection.propTypes = propTypes;
// HeroSection.defaultProps = defaultProps;
// #endregion

export default HeroSection;