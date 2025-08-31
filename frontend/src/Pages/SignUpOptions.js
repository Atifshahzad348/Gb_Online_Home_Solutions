
import React from 'react';
import Navbar from '../Components/Navbar';
import { FaUser, FaUserTie } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function SignUpOptions() {
  return (
    <div>
      <Navbar firstName="GB-Home-" lastName="Services" />
      <div className="container mt-md-5 p-md-5 px-4 py-4">
        <div className="row justify-content-center">
          {/* Client Card */}
          <div className="col-md-5 mb-4 mb-md-0">
            <div className="card shadow-lg h-100 border-top log-in-box-border border-3">
              <div className="card-body text-center p-4 d-flex flex-column">
                <div className="my-3">
                  <FaUser size={50} className="text-dark" />
                </div>
                <h2 className="card-title primary-color">Sign Up as Client</h2>
                <p className="card-text text-muted mb-4">
                  Find the perfect home services for your needs
                </p>
                <div className="mt-auto">
                    <Link to="/signup">
                    <button className="btn acc-btn1 w-100 py-2">
                    Sign Up
                   </button>  
                    </Link>
                  
                </div>
              </div>
            </div>
          </div>

          {/* Professional Card */}
          <div className="col-md-5">
            <div className="card shadow-lg h-100  border-3">
              <div className="card-body text-center p-4 d-flex flex-column">
                <div className="my-3">
                  <FaUserTie size={50} className="text-dark" />
                </div>
                <h2 className="card-title primary-color">Sign Up as Professional</h2>
                <p className="card-text  text-muted mb-4">
                  Connect with us to get work orders
                </p>
                <div className="mt-auto">
                    <Link to="/professionalsignup">
                    <button className="btn acc-btn1 w-100 py-2">
                    Sign Up
                    </button>
                    </Link>
                  
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}