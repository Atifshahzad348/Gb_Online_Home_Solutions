import React from 'react';
import {Link} from "react-router-dom"
import { BsWhatsapp } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";



const Footer = () => {
    return <div>
        <div className="container-fluid footer-img px-md-5 md-px-3 px-2 pt-3 pt-md-5 ">
          
            <div className="row">
                <div className="col-md-3 text-white">
                    <h2 className='fw-bold'>Social media</h2>
                    <h5>follow us on social media to keep updated</h5>
                    <div className='w-100 d-flex flex-row mt-2 '>
                        <div className="col-3 pt-2 ">
                            <h6>Follow Us</h6>
                        </div>
                        <div className="col-2 ps-2">
                          <Link><BsTwitter className='s-icon' /></Link>
                        </div>
                        <div className="col-2 ps-2">
                          <Link> <BsFacebook  className='s-icon'/></Link>
                        </div>
                        <div className="col-2 ps-2">
                            <BsYoutube className='s-icon' />
                        </div>
                        <div className="col-2 ps-2">
                          <Link to=""> <BsWhatsapp className='s-icon' />  </Link>
                        </div>
                        

                    </div>
                  
                </div>
                <div className="col-md-3 text-white ">
                   <h2 className='fw-bold'>Company</h2>
                   <Link className="nav-link active fw-bold" to="/blog">Blog</Link>
                   <Link className="nav-link active fw-bold" to="/about">About Us</Link>
                   <Link className="nav-link active fw-bold" to="/Career">Careers</Link>
                </div>
                <div className="col-md-3 text-white">
                  <h2 className='fw-bold'>Customers</h2> 
                  <Link className="nav-link active fw-bold" to="/blog">How it work</Link>
                   <Link className="nav-link active fw-bold" to="/about">I phone app</Link>
                   <Link className="nav-link active fw-bold" to="/Career">Andriod app</Link>
                </div>
                <div className="col-md-3 text-white">
                  <h2 className='fw-bold '>Support</h2>
                  <Link className="nav-link active fw-bold" to="/blog">Contact Us</Link>
                   <Link className="nav-link active fw-bold" to="/about">0341-0727692</Link>
                   <Link className="nav-link active fw-bold" to="/Career">GB_home_services@gmail.com</Link>
                </div>
            </div>
            <hr className='text-white'/>
            <div className='w-100 text-center text-white pb-3'>Copyright Reserved by Gb-Online-Home-Soutions</div>
            </div>
            
            

    </div>;
}


// #endregion

export default Footer;