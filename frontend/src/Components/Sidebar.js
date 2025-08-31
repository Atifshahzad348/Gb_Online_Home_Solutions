

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

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const {isLoggedIn} = useAuth();

  return (
    <div className={`sidebar-bg text-white col-md-3 ${isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`} 
         style={{ 
           minHeight: '100vh', 
           width: isCollapsed ? '80px' : '230px', 
           transition: 'width 0.3s',
           flex: '0 0 auto' // Prevent flex-grow
         }}>
      
      <div className="d-flex flex-column h-100">
        {/* Sidebar Header */}
        <div className="p-3 d-flex justify-content-between align-items-center border-bottom">
          {!isCollapsed && <h5 className="mb-0">User Name</h5>}
          <button 
            className="btn collapse-btn btn-sm" 
            onClick={toggleSidebar}
          >
            {isCollapsed ? '→' : '←'}
          </button>
        </div>
        
        {/* Sidebar Navigation */}
        <nav className="flex-grow-1 p-3">
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link to="/home" className='text-decoration-none'> 
                <a href="#home" className="nav-link sidebar-links d-flex align-items-center fw-bold">
                  <FaHome className='me-2 text-white sidebar-icon' />
                  {!isCollapsed && 'Home'}
                </a>
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/Profile" className='text-decoration-none'> 
                <a href="#home" className="nav-link sidebar-links d-flex align-items-center fw-bold">
                  <AiFillProfile className='me-2 text-white sidebar-icon' />
                  {!isCollapsed && 'Profile'}
                </a>
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link className='text-decoration-none'>
                <a href="#dashboard" className="nav-link sidebar-links d-flex align-items-center fw-bold">
                  <MdMedicalServices className='me-2 text-white sidebar-icon' />
                  {!isCollapsed && 'Services'}
                </a>
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/orderpage"className='text-decoration-none'>
                <a href="#orders" className="nav-link sidebar-links d-flex align-items-center fw-bold">
                  <AiFillProduct className='me-2 text-white sidebar-icon' />
                  {!isCollapsed && 'Orders'}
                </a>
              </Link> 
            </li>
            <li className="nav-item mb-2">
              <Link to="/payment" className='text-decoration-none'>
                <a href="#products" className="nav-link sidebar-links d-flex align-items-center fw-bold">
                  <RiMoneyDollarBoxFill className='me-2 text-white sidebar-icon'/>
                  {!isCollapsed && 'Payment'}
                </a>
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link className='text-decoration-none'>
                <a href="#customers" className="nav-link sidebar-links d-flex align-items-center fw-bold">
                  <FaCartArrowDown className='me-2 text-white sidebar-icon'/>
                  {!isCollapsed && 'Cart'}
                </a>
              </Link>
            </li>

            <div className="d-flex align-items-center">
              {!isCollapsed && (
                <div>
                  <div className="">
                    <Link to="/logout">
                      <button className='btn log-out-btn me-md-3 ms-md-3 me-0 ms-0 fw-bold'>
                        <CiLogout className='me-1 fw-bold' /> Log out
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </ul>
        </nav>
        
        {/* Sidebar Footer */}
        <div className="p-3 border-top"></div>
      </div>
    </div>
  );
};

export default Sidebar;