import React from 'react';
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import { useAuth } from '../store/auth';

import { FaCircleUser } from "react-icons/fa6";

import { SiImessage } from "react-icons/si";
import { AiFillAppstore } from "react-icons/ai";



const Navbar = (props) => {
  const {isLoggedIn} = useAuth();
    return <div>
   <nav className="nav-bg navbar navbar-expand-lg shadow-lg py-2  px-md-4 mb-md-4 mb-2">
  <div className="container-fluid">
  {/* <a className="navbar-brand me-5 fw-bolder" href="/"><img src="../Fypimgs/logo.png" alt="" className='logo img-fluid' /></a> */}
    <a className="navbar-brand me-5 fw-bolder" href="/"><span className='orange-color'>{props.firstName}</span><span className='primary-color'>{props.lastName}</span></a>
    <button className="navbar-toggler menu-icon" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      {/* <span className="navbar-toggler-icon"></span> */}
      <AiFillAppstore className='text-primary' />
    </button>
    <div className="collapse navbar-collapse" id="navbarScroll">
      <ul className="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll">
        <li>
          <Link className="nav-link active fw-bold navbar-titles" to="/home">Home</Link>
        </li>
        
        <li>
          <Link className="nav-link active fw-bold navbar-titles" to="/shop">Shop</Link>
        </li>
        <li>
          <Link className="nav-link active fw-bold navbar-titles" to="/about">About</Link>
        </li>
        <li>
          <Link className="nav-link active fw-bold navbar-titles" to="/contact">Contact</Link>
        </li>
        <li>
          <Link className="nav-link active fw-bold  ms-3" to="/chatbot"><SiImessage className='nav-icon fs-2 fs-md-3 fs-lg-2 ' /></Link>
        </li>

         
       
        {isLoggedIn ? (
        
         <li> <Link className="nav-link active fw-bold " to="/profile"><FaCircleUser className='nav-icon fs-2 fs-md-3 fs-lg-2'/></Link> </li>
        
          
        ):(
          <>
           <li>
             {/* <Link to="/login"><button className='btn acc-btn me-2  md-me-3 md-ms-4 mb-2 mx-md-3 mx-0' to="/login">Log In</button></Link>   */}
            <Link to="/loginoption"><button className='btn acc-btn me-2  md-me-3 md-ms-4 mb-2 mx-md-3 mx-0' to="/login">Log In</button></Link>  
            </li>
            <li>
            <Link to="/signupoption"><button className='btn acc-btn'>Sign Up</button></Link>  
            </li> 
          </>
        )
        }
         
      

        
      </ul>

    
      
    </div>
  </div>
</nav>
    </div>;
}

// Navbar.propTypes = propTypes;
// Navbar.defaultProps = defaultProps;
// #endregion
Navbar.propTypes = {
    firstName: PropTypes.string, 
    lastName: PropTypes.string
}


export default Navbar;