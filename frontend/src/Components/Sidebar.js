

// test code
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/auth';

// react icons
import { FaHome } from "react-icons/fa";
import { AiFillProfile } from "react-icons/ai";
import { AiFillProduct } from "react-icons/ai";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { MdMedicalServices } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
// import { useAuth } from '../store/auth';

const Sidebar = () => {
  
  const [isExpanded, setIsExpanded] = useState(false);
  const { isLoggedIn, user } = useAuth();

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };
  
 let name = user.name;

 
  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-3">
      <div className="container-fluid">
        <h2  className="navbar-brand fw-bold primary-color me-5 ms-3">{name}</h2>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleNavbar}
          aria-controls="navbarContent"
          aria-expanded={isExpanded}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${isExpanded ? 'show' : ''}`} id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/home" className="nav-link d-flex align-items-center">
                <FaHome className="me-1" />
                <span>Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Profile" className="nav-link d-flex align-items-center">
                <AiFillProfile className="me-1" />
                <span>Profile</span>
              </Link>
            </li>
           
            <li className="nav-item">
              <Link to="/orderpage" className="nav-link d-flex align-items-center">
                <AiFillProduct className="me-1" />
                <span>Orders</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/payment" className="nav-link d-flex align-items-center">
                <RiMoneyDollarBoxFill className="me-1" />
                <span>Payment</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link d-flex align-items-center">
                <FaCartArrowDown className="me-1" />
                <span>Cart</span>
              </Link>
            </li>
          </ul>
          
          <div className="d-flex">
            {isLoggedIn && (
              <Link to="/logout"  class="link-underline link-underline-opacity-0 me-3">
                <button className="btn log-out-btn d-flex align-items-center text-style-none">
                  <CiLogout className="me-1" />
                  <span>Log out</span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;