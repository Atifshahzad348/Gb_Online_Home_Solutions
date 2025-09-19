
// import React from 'react'
// import { useAuth } from '../store/auth';
// import { useState } from 'react';
// import {useForm} from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import {toast } from 'react-toastify';

// export default function NewOrderForm() {
//   const { AuthorizationToken } = useAuth();
//   const navigate = useNavigate();
//   const {storeTokenInLS} = useAuth();
  
//   // Initialize with empty values
//   const [user, setUser] = useState({
//     name: "", 
//     contact: "",
//     city: "",
//     address: "",
//     service: "",
//     service_type: "",
//     problem: "",
//   });

//   // Handle input changes and update state
//   const handleInput = (event) => {
//     const { name, value } = event.target;
//     setUser(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   }

//   // Form validation
//   const {
//     register,
//     handleSubmit,
//     formState: { errors }
//   } = useForm();

//   // const submitCall = async () => {
//   //   try {
//   //     console.log("Submitting:", user);
//   //     const response = await fetch(`http://localhost:5000/api/order/clientorder`, {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify(user)
//   //     });

//   //     if(response.ok) {
//   //       const res_data = await response.json();
//   //       storeTokenInLS(res_data.token);
//   //       setUser({
//   //         name: "", 
//   //         contact: "",
//   //         city: "",
//   //         address: "",
//   //         service: "",
//   //         service_type: "",
//   //         problem: "",
//   //       });
//   //       toast.success("Your order is booked.");
//   //     } else {
//   //       toast.error("Invalid credentials");
//   //     }
//   //   } catch(error) {
//   //     console.error("Submission error:", error);
//   //     toast.error("Submission failed");
//   //   }
//   // }



//   // ----------------------------------------------------test code start 
//   const submitCall = async () => {
//     try {
//         console.log("Submitting:", user);
        
//         const response = await fetch(`http://localhost:5000/api/order/clientorder`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: AuthorizationToken, // ADD THIS LINE - CRITICAL!
//             },
//             body: JSON.stringify(user)
//         });

//         if(response.ok) {
//             const res_data = await response.json();
//             // storeTokenInLS(res_data.token); // You probably don't need this for orders
//             setUser({
//                 name: "", 
//                 contact: "",
//                 city: "",
//                 address: "",
//                 service: "",
//                 service_type: "",
//                 problem: "",
//             });
//             toast.success("Your order is booked.");
//         } else {
//             toast.error("Order booking failed");
//         }
//     } catch(error) {
//         console.error("Submission error:", error);
//         toast.error("Submission failed");
//     }
// }

//   return (
//     <div className='bg-black py-5 px-4 rounded px-3'>
//       <form onSubmit={handleSubmit(submitCall)}>
//         <h2 className='text-center text-white order_form_heading'>Book You Service</h2>
//         <h6 className='text-white text-center'>You will recive a call in few minutes to guide you regarding your query.</h6>
        
//         <input 
//           type="text" 
//           {...register("name", {
//             required: "Name is required", 
//             minLength: {value: 3, message: "Name must be at least 3 characters."}
//           })}
//           onChange={handleInput}
//           value={user.name}
//           className="form-control me-2 p-2 mb-md-0 mb-3 border mt-3"  
//           name="name" 
//           placeholder="Name" 
//         />
//         {errors.name && <div className="text-danger">{errors.name.message}</div>}
        
//         <input 
//           {...register("contact", {
//             required: "Contact is required", 
//             minLength: {value: 11, message: "Contact must be 11 digits."},
//             maxLength: {value: 11, message: "Contact must be 11 digits."}
//           })}
//           onChange={handleInput}
//           value={user.contact}
//           className="form-control me-2 p-2 mb-md-0 mb-3 border mt-3" 
//           type="text" 
//           name='contact' 
//           placeholder="03xxxxxxxx" 
//         />
//         {errors.contact && <div className="text-danger">{errors.contact.message}</div>}
        
//         <input 
//           {...register("city", {
//             required: "City is required", 
//             minLength: {value: 3, message: "City must be at least 3 characters."}
//           })}
//           onChange={handleInput}
//           value={user.city}
//           className="form-control me-2 p-2 mb-md-0 mb-3 border mt-3" 
//           type="text" 
//           name='city' 
//           placeholder="City" 
//         />
//         {errors.city && <div className="text-danger">{errors.city.message}</div>}
        
//         <input 
//           {...register("address", {
//             required: "Address is required", 
//             minLength: {value: 5, message: "Address must be at least 5 characters."}
//           })}
//           onChange={handleInput}
//           value={user.address}
//           className="form-control me-2 p-2 mb-md-0 mb-3 border mt-3" 
//           type="text" 
//           name='address' 
//           placeholder="Address" 
//         />
//         {errors.address && <div className="text-danger">{errors.address.message}</div>}
        
//         <input 
//           {...register("service", {
//             required: "Service is required"
//           })}
//           onChange={handleInput}
//           value={user.service}
//           className="form-control me-2 p-2 mb-md-0 mb-3 border mt-3"
//           type="text" 
//           name="service"  
//           placeholder="Services" 
//           list="services-list"
//         />
//         {errors.service && <div className="text-danger">{errors.service.message}</div>}
//         <datalist id="services-list">
//           <option value="AC installation" />
//           <option value="Sofa cleaning" />
//           <option value="Pest control" />
//           <option value="Washing machine repairing" />
//           <option value="Curtain cleaning" />
//         </datalist>
        
//         <input 
//           {...register("service_type", {
//             required: "Service type is required"
//           })}
//           onChange={handleInput}
//           value={user.service_type}
//           className="form-control me-2 p-2 mb-md-0 mb-3 border mt-3"
//           type="text" 
//           name='service_type' 
//           placeholder="Service Type" 
//           list="servicetype"
//         />
//         {errors.service_type && <div className="text-danger">{errors.service_type.message}</div>}
//         <datalist id="servicetype">
//           <option value="Repair" />
//           <option value="Visit for Estimation" />
//           <option value="install" />
//           <option value="Cleaning" />
//           <option value="Visit to Diagnose" />
//         </datalist>
        
//         <div>
//           <label htmlFor="" className="fw-bold text-white"><br />Explain your problem (optional)</label>
//           <textarea 
//             {...register("problem")}
//             onChange={handleInput}
//             value={user.problem}
//             name='problem' 
//             className="form-control mt-md-3"  
//             rows="5"
//           ></textarea>
//         </div>
        
//         <button type="submit" className='btn order-form-btn fw-bold w-100 mt-3'>Confirm Order</button>
//       </form>
//     </div>
//   )
// }

import React from 'react'
import { useAuth } from '../store/auth';
import { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {toast } from 'react-toastify';

export default function NewOrderForm({ service }) {
  const { AuthorizationToken, user: authUser } = useAuth();
  const navigate = useNavigate();
  
  // Initialize with empty values or pre-filled from auth user
  const [orderData, setOrderData] = useState({
    name: authUser?.name || "", 
    contact: authUser?.phone || "",
    city: authUser?.city || "",
    address: authUser?.address || "",
    service: service?.title || "",
    service_type: "",
    problem: "",
  });

  // Update form when service prop changes
  useEffect(() => {
    if (service) {
      setOrderData(prev => ({
        ...prev,
        service: service.title
      }));
    }
  }, [service]);

  // Handle input changes and update state
  const handleInput = (event) => {
    const { name, value } = event.target;
    setOrderData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  // Form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  // Set default service value when component mounts
  useEffect(() => {
    if (service) {
      setValue('service', service.title);
    }
  }, [service, setValue]);

  const submitOrder = async () => {
    try {
      console.log("Submitting order:", orderData);
      
      const response = await fetch(`http://localhost:5000/api/order/clientorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthorizationToken,
        },
        body: JSON.stringify(orderData)
      });

      if(response.ok) {
        const res_data = await response.json();
        setOrderData({
          name: authUser?.name || "", 
          contact: authUser?.phone || "",
          city: authUser?.city || "",
          address: authUser?.address || "",
          service: service?.title || "",
          service_type: "",
          problem: "",
        });
        toast.success("Your order is booked successfully!");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Order booking failed");
      }
    } catch(error) {
      console.error("Submission error:", error);
      toast.error("Submission failed. Please try again.");
    }
  }

  return (
    <div className='bg-black py-5 px-4 rounded px-3'>
      <form onSubmit={handleSubmit(submitOrder)}>
        <h2 className='text-center text-white order_form_heading'>Book Your Service</h2>
        <h6 className='text-white text-center'>You will receive a call in few minutes to guide you regarding your query.</h6>
        
        <input 
          type="text" 
          {...register("name", {
            required: "Name is required", 
            minLength: {value: 3, message: "Name must be at least 3 characters."}
          })}
          onChange={handleInput}
          value={orderData.name}
          className="form-control me-2 p-2 mb-md-0 mb-3 border mt-3"  
          name="name" 
          placeholder="Name" 
        />
        {errors.name && <div className="text-danger">{errors.name.message}</div>}
        
        <input 
          {...register("contact", {
            required: "Contact is required", 
            minLength: {value: 11, message: "Contact must be 11 digits."},
            maxLength: {value: 11, message: "Contact must be 11 digits."},
            pattern: {
              value: /^03\d{9}$/,
              message: "Contact must start with 03 and be 11 digits long."
            }
          })}
          onChange={handleInput}
          value={orderData.contact}
          className="form-control me-2 p-2 mb-md-0 mb-3 border mt-3" 
          type="text" 
          name='contact' 
          placeholder="03xxxxxxxx" 
        />
        {errors.contact && <div className="text-danger">{errors.contact.message}</div>}
        
        <input 
          {...register("city", {
            required: "City is required", 
            minLength: {value: 3, message: "City must be at least 3 characters."}
          })}
          onChange={handleInput}
          value={orderData.city}
          className="form-control me-2 p-2 mb-md-0 mb-3 border mt-3" 
          type="text" 
          name='city' 
          placeholder="City" 
        />
        {errors.city && <div className="text-danger">{errors.city.message}</div>}
        
        <input 
          {...register("address", {
            required: "Address is required", 
            minLength: {value: 5, message: "Address must be at least 5 characters."}
          })}
          onChange={handleInput}
          value={orderData.address}
          className="form-control me-2 p-2 mb-md-0 mb-3 border mt-3" 
          type="text" 
          name='address' 
          placeholder="Address" 
        />
        {errors.address && <div className="text-danger">{errors.address.message}</div>}
        
        <input 
          {...register("service", {
            required: "Service is required"
          })}
          onChange={handleInput}
          value={orderData.service}
          className="form-control me-2 p-2 mb-md-0 mb-3 border mt-3"
          type="text" 
          name="service"  
          placeholder="Services" 
          readOnly={!!service} // Make readonly if service is provided
        />
        {errors.service && <div className="text-danger">{errors.service.message}</div>}
        
        <input 
          {...register("service_type", {
            required: "Service type is required"
          })}
          onChange={handleInput}
          value={orderData.service_type}
          className="form-control me-2 p-2 mb-md-0 mb-3 border mt-3"
          type="text" 
          name='service_type' 
          placeholder="Service Type" 
          list="servicetype"
        />
        {errors.service_type && <div className="text-danger">{errors.service_type.message}</div>}
        <datalist id="servicetype">
          <option value="Repair" />
          <option value="Visit for Estimation" />
          <option value="Installation" />
          <option value="Cleaning" />
          <option value="Visit to Diagnose" />
          <option value="Maintenance" />
        </datalist>
        
        <div>
          <label htmlFor="problem" className="fw-bold text-white mt-3">Explain your problem (optional)</label>
          <textarea 
            {...register("problem")}
            onChange={handleInput}
            value={orderData.problem}
            name='problem' 
            className="form-control mt-md-3"  
            rows="5"
            placeholder="Describe your issue or specific requirements..."
          ></textarea>
        </div>
        
        <button type="submit" className='btn order-form-btn fw-bold w-100 mt-3'>Confirm Order</button>
      </form>
    </div>
  );
}