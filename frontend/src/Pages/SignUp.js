import Navbar from "../Components/Navbar";
import {Link} from "react-router-dom"
import React from 'react';
import {useForm} from 'react-hook-form'
import { useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import {toast } from 'react-toastify';




const SignUp = () => {

const [user, setUser] = useState({
        name: "",
        email: "", 
        contact: "",
        password: ""
});
const { storeTokenInLS } = useAuth();
const navigate = useNavigate();

// handle the input values
const handleInput =(event)=>{
        let name  = event.target.name;
        let value = event.target.value;
    setUser({
         ...user,
         [name]: value
    })
}

    const {
        register,
        handleSubmit,
        formState: {errors}
        
    } = useForm();
    const submitCall = async (data) =>{
        try{
        console.log(data);
        console.log(user)
        const response = await fetch(`http://localhost:5000/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        });



        
        if(response.ok){
            const res_data = await response.json();
         
            // storeTokenInLS(res_data.token);
           

            setUser({ name: "", email: "", contact: "", password: "" });
            navigate("/login");
            toast.success("Registered successfully");
            setTimeout(() => {navigate("/login")}, 2000); 
           
        }
        console.log(response.ok);
    } catch(error){
            console.log("register", error);
    }
    
    
    };
    return <div>
        <Navbar firstName="GB-Home-" lastName="Services" />
        <div className="container mt-md-5 md-p-5 mb-md-3">
            <div className="row shadow-lg p-0 rounded">
                <div className="col-md-6 p-0 login-right d-flex  justify-content-center ">
                    <img src="../Fypimgs/client.jpg" alt="" className='img-fluid' />

                </div>
                <div className="col-md-6 p-md-5 pt-md-4 pt-4 pb-4 md-pb-5  login-left d-flex flex-column justify-content-center">
                    <img src="../Fypimgs/logo.png" alt="" className='m-auto' width={200}/>
                    {/* <h1 className='login-heading text-center fw-bold'>GB-HOME-SERVICES</h1> */}
                    <h2 className='mt-md-2 mb-3 text-center fw-bold'>Sign Up As Client</h2>
                    <form onSubmit={handleSubmit(submitCall)}>
                    <div className="mb-3">
                            <label htmlFor="name"  className="form-label">Full Name</label>
                            <input name="name" type="text" {...register("name", {required: "name is required", minLength: {value: 3, message: "name must be atleast 3 characters."}})}  autoComplete="username"  className="form-control w-100 input-height shadow-none" id="name" value={user.name} onChange={handleInput} aria-describedby="emailHelp"/>
                            {errors.name && <div className="text-danger">{errors.name.message}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" {...register("email", {required:"Email is required", pattern:{value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, message: "invalid email address" }})}    autoComplete="username"  className="form-control w-100 input-height shadow-none" name="email" id="email" value={user.email} onChange={handleInput} aria-describedby="emailHelp"/>
                           {errors.email && <div className="text-danger">{errors.email.message}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contact" className="form-labe">Contact No.</label>
                            <input type="text"  {...register("contact", {required:"contact num is required", minLength:{value: 11, message: "invalid contact number"}, maxLength:{value: 11, message:"invalid contact number"}, pattern:{value: /^[0-9]+$/, message: "Only numbers are allowed"}})} className="form-control w-100 input-height shadow-none" name="contact" id="contact" value={user.contact} onChange={handleInput}/>
                            {errors.contactNo && <div className="text-danger">{errors.contactNo.message}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword2" className="form-labe">Password</label>
                            <input type="password" {...register("password", {required: "Password is required", minLength: {value: 8, message: "Password must be at least 8 characters"}, validate: (value) => { return [/[A-Z]/.test(value), /[!@#$%^&*(),.?":{}|<>]/.test(value)].every(Boolean) || "Password must contain at least 1 capital letter and 1 special character"; }})} className="form-control w-100 input-height shadow-none " autoComplete="current-password" value={user.password} onChange={handleInput} id="password"/>{errors.password && <div className="text-danger">{errors.password.message} </div>}
                        </div>
                        
                        <button type="submit" className="nav-btn btn w-100 fw-bold mt-md-2">Sign Up</button>
                        <label className="form-check-label m-auto text-center w-100 fw-bold my-2" htmlFor="exampleCheck1">Already have an account</label>
                        
                        {/* <button type="submit" className="nav-btn btn w-100 me-auto fw-bold">Log In</button> */}
                        </form>
                        <Link className="nav-link active fw-bold" to="/login">
                        <button type="submit" className="nav-btn btn w-100 me-auto fw-bold">Log In</button>
                        </Link>
                </div>
              
            </div>
        </div>
        {/* <Footer/> */}
    </div>;
}



export default SignUp;