

import React from 'react';
import Navbar from '../Components/Navbar';
import { useState } from 'react';
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import {toast } from 'react-toastify';
import { FaIdCard, FaEye, FaEyeSlash } from 'react-icons/fa';

const ProfessionalLogIn = (props) => {
    const navigate = useNavigate();
    const {storeTokenInLS} = useAuth();
    const [user, setUser] = useState({
        cnic: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    //handle input 
    const handleInput =(event)=>{
        let name  = event.target.name;
        let value = event.target.value;
        setUser({
            ...user,
            [name]: value
        })
    }

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    //form validation
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const submitCall = async (data) => {
        try {
            console.log(data);
            console.log(user);
            const response = await fetch(`http://localhost:5000/professionallogin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            });
            
            if(response.ok){
                const res_data = await response.json();
                storeTokenInLS(res_data.token);
                setUser({cnic: "", password: "" });
                toast.success("Login successful.");
                navigate("/home");
            } else {
                toast.error("Invalid credentials");
            }
        } catch {
            toast.error("Login failed. Please try again.");
        }
    }

    return (
        <div>
            <Navbar firstName="GB-Home-" lastName="Services" />
            <div className="container mt-md-5 p-md-5 px-4 py-4">
                <div className="row shadow-lg p-0 rounded">
                    <div className="col-md-6 p-md-5 pt-md-4 pt-3 pb-5 login-left d-flex flex-column justify-content-center order-md-1 order-2">
                        <img src="../Fypimgs/logo.png" alt="" className='m-auto' width={200}/>
                        <h2 className='mt-md-4 mb-3 text-center fw-bold'>PROFESSIONAL LOG IN</h2>
                        <form onSubmit={handleSubmit(submitCall)}>
                            <div className="mb-3">
                                <label htmlFor="cnic" className="form-label">CNIC Number</label>
                                <div className="input-group">
                                    <span className="input-group-text black-bg" style={{ borderColor: 'black' }}>
                                        <FaIdCard />
                                    </span>
                                    <input 
                                        type="text" 
                                        {...register("cnic", {
                                            required: "CNIC is required",
                                            pattern: {
                                                value: /^[0-9]{13}$/,
                                                message: "CNIC must be 13 digits without dashes"
                                            }
                                        })} 
                                        className="form-control input-height shadow-none" 
                                        name="cnic" 
                                        id="cnic" 
                                        value={user.cnic} 
                                        onChange={handleInput}
                                        placeholder="1234512345678"
                                        maxLength="13"
                                    />
                                </div>
                                {errors.cnic && <div className="text-danger">{errors.cnic.message}</div>}
                                <div className="form-text">Enter 13-digit CNIC without dashes</div>
                            </div>
                            
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <div className="input-group">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        {...register("password", {required: "Password is required"})} 
                                        className="form-control input-height shadow-none" 
                                        autoComplete="current-password" 
                                        value={user.password} 
                                        onChange={handleInput} 
                                        id="password" 
                                        placeholder="Enter your password"
                                    />
                                    <button 
                                        className="btn black-bg" 
                                        type="button" 
                                        onClick={togglePasswordVisibility}
                                        style={{ borderColor: 'black' }}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {errors.password && <div className="text-danger">{errors.password.message}</div>}
                            </div>
                            
                            <div className="mb-3 form-check">
                                <label className="form-check-label me-4 ms-md-auto" htmlFor="exampleCheck1">I don't have an account :</label>
                                <a href="/professional-signup" className='text-decoration-none fw-bold'>Sign Up</a>
                            </div>
                            
                            <button type="submit" className="nav-btn btn w-100 fw-bold">Log in</button>
                        </form>
                    </div>
                    <div className="col-md-6 order-md-2 order-1 p-0 login-right hide-img">
                        <img src="../Fypimgs/professional.jpg" alt="" className='img-fluid' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfessionalLogIn;