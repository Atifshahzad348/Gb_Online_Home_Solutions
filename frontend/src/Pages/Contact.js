// import React from "react";
// import Navbar from "../Components/Navbar";
// import Footer from "../Components/Footer";
// import {useForm} from 'react-hook-form';
// import { useState } from "react";
// import { useAuth } from "../store/auth";

import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useForm } from "react-hook-form";
import { useAuth } from "../store/auth";
import {toast } from 'react-toastify';

const Contact =()=>{
  const {isLoggedIn} = useAuth();
const [contact, setContact] = useState({
    name: "", 
    email: "",
    text: "",
});
const [userData, setUserData]= useState(true);
const {user} = useAuth();




// ✅ This is the correct place to set initial form values
  useEffect(() => {
    if (userData && user) {
      setContact({
        name: user.name,
        email: user.email,
        text: "",
      });
      setUserData(false);
    }
  }, [userData, user]);




// handle the input values
const handleInput =(event)=>{
        let name  = event.target.name;
        let value = event.target.value;
    setContact({
         ...contact,
         [name]: value,
    })
}

    const {
        register,
        reset,
        handleSubmit,
        formState: {errors}
        
    } = useForm(
      {
  defaultValues: {
    name: "",
    email: "",
    text: ""
  }
}
    );
    const submitCall = async (data) =>{
        try{
        console.log(data);
        // console.log(contactInfo)
        const response = await fetch(`http://localhost:5000/api/form/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });



        
        if(response.ok){
          setContact({ name: "", email: "",  text: "" });
            
            toast.success("Msg Sent Successfully");

                // ✅ Refill name/email from logged-in user, empty message
      reset({
        name: user?.name || "",
        email: user?.email || "",
        text: ""
      });
           
        }
        console.log(response.ok);
    } catch(error){
            console.log("contact", error);
    }
    
    
    };




    return(
        <>
        <Navbar firstName="GB-Home-" lastName="Services"/>
        <div className="container  md-py-2 py-3 mb-md-5">
           <div className="row">
             <div className="col-12">
              {isLoggedIn?(
                <h3>Hi <span className="primary-color">{contact.name}</span></h3>
              ):(
                 <h3></h3>
              )
              }
                  
             </div>
           </div>
        </div>
     
        <div className="container md-px-5 px-3 md-py-3 py-3 mb-md-5 bg-black text-white py-md-2 rounded px-md-5">
           
            <h2 className="fw-bold mb-md-4 display-5 contact-title"> Contact Us</h2>
              <h5 className="contact-pargraph">Get in touch with GB-Home-Services. Talk to our team for 24/7 customer support.</h5>
            <h5 className="contact-pargraph">Let us know how we can help. We will get in touch as soon as possible based on urgency of your request.</h5>
            <div className="row">
               <div className="col-md-6">
                        <img src="/Fypimgs/contact.jpg"  style={{ width: '600px', height: '550px' }}   className="img-fluid kitchen-img rounded" alt="Description" />
               </div>
               <div className="col-md-6 d-flex flex-column justify-content-center">
                <form onSubmit={handleSubmit(submitCall)}>
                     <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
                     <input type="text" name="name" onChange={handleInput} {...register("name", {required: "name is required", minLength: {value: 3, message: "name must be atleast 3 characters."}})}  className="form-control input-height" id="exampleFormControlInput1"></input>
                      {errors.name && <div className="text-danger">{errors.name.message}</div>}
                      <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                      <input type="email" name="email" onChange={handleInput} {...register("email", {required:"Email is required", pattern:{value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, message: "invalid email address" }})}   className="form-control input-height" id="exampleFormControlInput1"></input> 
                      {errors.email && <div className="text-danger">{errors.email.message}</div>}
                     
                      <label htmlFor="exampleFormControlInput1" className="form-label">Type Your Message</label>
                      <textarea   {...register("text")} type="text" name="text" className="form-control input-border" id="exampleFormControlTextarea1" rows="6"></textarea>
                      {errors.text && <div className="text-danger">{errors.text.message}</div>}
                      <button type="submit" className="btn nav-btn contact-btn my-3">submit</button>
                </form>
               </div>
                

            </div>
           
           
        </div>
        <Footer/>
        </>

    );
}

export default Contact;