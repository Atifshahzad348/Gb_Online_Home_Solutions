import React from 'react';
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import { FaCircleUser } from "react-icons/fa6";




const Navbar = (props) => {
    return <div>
   <nav className="nav-bg navbar navbar-expand-lg shadow-lg py-3 px-0 px-md-4 mb-md-4 mb-2">
  <div className="container-fluid">
  {/* <a className="navbar-brand me-5 fw-bolder" href="/"><img src="../Fypimgs/logo.png" alt="" className='logo img-fluid' /></a> */}
     <a className="navbar-brand me-5 fw-bolder" href="/"><span className='secoundary-color'>{props.firstName}</span><span className='primary-color'>{props.lastName}</span></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarScroll">
      <ul className="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll">
        <li>
          <Link className="nav-link active fw-bold navbar-titles" to="/home">Home</Link>
        </li>
        {/* <li className='link-hover'>
          <Link className="nav-link active fw-bold" to="/services">Services</Link>
        </li> */}
        <li>
          <Link className="nav-link active fw-bold navbar-titles" to="/shop">Shop</Link>
        </li>
        <li>
          <Link className="nav-link active fw-bold navbar-titles" to="/about">About</Link>
        </li>
        <li>
          <Link className="nav-link active fw-bold navbar-titles" to="/contact">Contact</Link>
        </li>

{/*          
        <li>
         <Link to="/login"><button className='btn acc-btn me-2  md-me-3 md-ms-4 mb-2 mx-md-3 mx-0' to="/login">Log In</button></Link>  
        </li>
        <li>
        <Link to="/signup"><button className='btn acc-btn'>Sign Up</button></Link>  
        </li> */}
       <div className='ms-2'><FaCircleUser style={{ fontSize: '32px', color: 'orange' }} className='me-2 mb-2' /><h7 className="card-title">{props.ClientName}</h7></div>
        
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