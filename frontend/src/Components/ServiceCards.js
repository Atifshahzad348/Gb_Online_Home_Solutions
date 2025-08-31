import React from 'react'
import { Link } from 'react-router-dom'
import { FaCartArrowDown } from "react-icons/fa";


export default function ServiceCards(props) {
  
  return (
    <div className=''>
        
      
         <div className="card shadow-lg">

              <img src={props.imglink} className="card-img-top" alt="..." />
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title m-0">{props.cardTitle}</h5>
                  <FaCartArrowDown className='service-icon' />
                </div>
                <p className="card-text text-center">{props.paragraph}</p>  
                <Link to={props.link}><button className='btn service-btn w-100 bolder'>Book now</button></Link>
              </div>
         </div>
      
   
 
  </div>
  
  )
}
