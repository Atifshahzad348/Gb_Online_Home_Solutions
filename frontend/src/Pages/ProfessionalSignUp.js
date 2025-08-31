// test code

import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const ProfessionalSignUp = () => {
  const [professional, setProfessional] = useState({
    name: "",
    cnic: "",
    contact1: "",
    contact2: "",
    profession: "",
    specialization: "",
    experience: "",
    address: "",
    city: "",
    permenentAdress: "", // FIXED: Changed to match backend schema
    password: "" // FIXED: Changed to lowercase 'p' to match backend
  });

  const { storeTokenInLS } = useAuth();
  const navigate = useNavigate();

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setProfessional({
      ...professional,
      [name]: value
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const submitCall = async (data) => {
    try {
      const response = await fetch(`http://localhost:5000/professionalregister`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(professional)
      });

      if (response.ok) {
        const res_data = await response.json();
        // storeTokenInLS(res_data.token);

        setProfessional({
          name: "",
          cnic: "",
          contact1: "",
          contact2: "",
          profession: "",
          specialization: "",
          experience: "",
          address: "",
          city: "",
          permenentAdress: "", // FIXED: Changed here too
          password: "" // FIXED: Changed here too
        });

        toast.success("Professional registered successfully");
        setTimeout(() => { navigate("/professionallogin"); }, 2000);
      }
    } catch (error) {
      console.log("register", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <Navbar firstName="GB-Home-" lastName="Services" />
      <div className="container mt-md-5 mb-md-3">
        <div className="row shadow-lg p-0 rounded">
          <div className="col-12 p-md-5 pt-md-4 pt-4 pb-4 login-left d-flex flex-column justify-content-center">
            <img src="../Fypimgs/logo.png" alt="" className='m-auto mb-3' width={200} />
            <h2 className='mt-md-2 mb-4 text-center fw-bold'>Sign Up As Professional</h2>

            <form onSubmit={handleSubmit(submitCall)} className="row">

              <div className="col-md-6 mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  name="name"
                  type="text"
                  {...register("name", {
                    required: "Name is required",
                    minLength: { value: 3, message: "Name must be at least 3 characters" }
                  })}
                  autoComplete="username"
                  className="form-control w-100 input-height shadow-none"
                  id="name"
                  value={professional.name}
                  onChange={handleInput}
                />
                {errors.name && <div className="text-danger">{errors.name.message}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="cnic" className="form-label">CNIC (without dashes)</label>
                <input
                  type="text"
                  {...register("cnic", {
                    required: "CNIC is required",
                    pattern: {
                      value: /^[0-9]{13}$/,
                      message: "CNIC must be 13 digits"
                    }
                  })}
                  className="form-control w-100 input-height shadow-none"
                  name="cnic"
                  id="cnic"
                  value={professional.cnic}
                  onChange={handleInput}
                />
                {errors.cnic && <div className="text-danger">{errors.cnic.message}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="contact1" className="form-label">Contact No.1</label>
                <input
                  type="text"
                  {...register("contact1", {
                    required: "Contact number is required",
                    minLength: { value: 11, message: "Invalid contact number" },
                    maxLength: { value: 11, message: "Invalid contact number" },
                    pattern: { value: /^[0-9]+$/, message: "Only numbers are allowed" }
                  })}
                  className="form-control w-100 input-height shadow-none"
                  name="contact1"
                  id="contact1"
                  value={professional.contact1}
                  onChange={handleInput}
                />
                {errors.contact1 && <div className="text-danger">{errors.contact1.message}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="contact2" className="form-label">Contact No.2</label>
                <input
                  type="text"
                  {...register("contact2", {
                    required: "Second contact is required",
                    minLength: { value: 11, message: "Contact must be 11 digits" },
                    maxLength: { value: 11, message: "Contact must be 11 digits" },
                    pattern: { value: /^[0-9]+$/, message: "Only numbers are allowed" }
                  })}
                  className="form-control w-100 input-height shadow-none"
                  name="contact2"
                  id="contact2"
                  value={professional.contact2}
                  onChange={handleInput}
                />
                {errors.contact2 && <div className="text-danger">{errors.contact2.message}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="profession" className="form-label">Profession</label>
                <select
                  name="profession"
                  id="profession"
                  className="form-select input-height shadow-none"
                  {...register("profession", { required: "Please select your profession" })}
                  value={professional.profession}
                  onChange={handleInput}
                >
                  <option value="">Select Profession</option>
                  <option value="painter">Painter</option>
                  <option value="carpenter">Carpenter</option>
                  <option value="electrician">Electrician</option>
                  <option value="plumber">Plumber</option>
                  <option value="mason">Mason</option>
                  <option value="ac-technician">AC Technician</option>
                  <option value="mechanic">Mechanic</option>
                </select>
                {errors.profession && <div className="text-danger">{errors.profession.message}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="specialization" className="form-label">Other Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  id="specialization"
                  className="form-control w-100 input-height shadow-none"
                  placeholder="e.g., House Painting, Furniture Making, Wiring, etc."
                  {...register("specialization", {
                    required: "Specialization is required",
                    minLength: { value: 3, message: "Specialization must be at least 3 characters" }
                  })}
                  value={professional.specialization}
                  onChange={handleInput}
                />
                {errors.specialization && <div className="text-danger">{errors.specialization.message}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="experience" className="form-label">Years of Experience</label>
                <input
                  type="number"
                  name="experience"
                  id="experience"
                  min="0"
                  max="50"
                  className="form-control w-100 input-height shadow-none"
                  {...register("experience", {
                    required: "Experience is required",
                    min: { value: 0, message: "Experience cannot be negative" },
                    max: { value: 50, message: "Experience seems too high" }
                  })}
                  value={professional.experience}
                  onChange={handleInput}
                />
                {errors.experience && <div className="text-danger">{errors.experience.message}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="city" className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  className="form-control w-100 input-height shadow-none"
                  {...register("city", {
                    required: "City is required",
                    minLength: { value: 3, message: "City must be at least 3 characters" }
                  })}
                  value={professional.city}
                  onChange={handleInput}
                />
                {errors.city && <div className="text-danger">{errors.city.message}</div>}
              </div>

              <div className="col-12 mb-3">
                <label htmlFor="address" className="form-label">Address as per CNIC</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="form-control w-100 input-height shadow-none"
                  {...register("address", {
                    required: "Address is required",
                    minLength: { value: 5, message: "Address must be at least 5 characters" }
                  })}
                  value={professional.address}
                  onChange={handleInput}
                />
                {errors.address && <div className="text-danger">{errors.address.message}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="permenentAdress" className="form-label">Permanent Address</label>
                <input
                  type="text"
                  {...register("permenentAdress", {
                    required: "Permanent address is required"
                  })}
                  name="permenentAdress"
                  className="form-control w-100 input-height shadow-none"
                  value={professional.permenentAdress}
                  onChange={handleInput}
                  id="permenentAdress"
                />
                {errors.permenentAdress && <div className="text-danger">{errors.permenentAdress.message}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  name="password"
                  className="form-control w-100 input-height shadow-none"
                  autoComplete="new-password"
                  id="password"
                  value={professional.password}
                  onChange={handleInput}
                />
                {errors.password && <div className="text-danger">{errors.password.message}</div>}
              </div>

              <div className="col-12 mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input shadow-none"
                  id="termsCheck"
                  {...register("terms", {
                    required: "You must accept the terms and conditions"
                  })}
                />
                <label className="form-check-label" htmlFor="termsCheck">
                  I agree to the <Link to="/terms">Terms and Conditions</Link>
                </label>
                {errors.terms && <div className="text-danger">{errors.terms.message}</div>}
              </div>

              <div className="col-12 text-center">
                <div className="justify-content-center align-items-center">
                  <button type="submit" className="nav-btn btn w-100 px-4 fw-bold mt-md-2">
                    Sign Up
                  </button>
                  <br />
                  <span className="fw-bold mx-2">Already have an account?</span>
                  <Link className="nav-link active fw-bold" to="/professionallogin">
                    <button type="button" className="nav-btn btn w-100 px-4 fw-bold">
                      Log In
                    </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSignUp;