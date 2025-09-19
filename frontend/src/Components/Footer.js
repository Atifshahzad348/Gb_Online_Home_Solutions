// import React from 'react';
// import {Link} from "react-router-dom"
// import { BsWhatsapp } from "react-icons/bs";
// import { BsYoutube } from "react-icons/bs";
// import { BsFacebook } from "react-icons/bs";
// import { BsTwitter } from "react-icons/bs";



// const Footer = () => {
//     return <div>
//         <div className="container-fluid footer-img px-md-5 md-px-3 px-2 pt-3 pt-md-5 ">
          
//             <div className="row">
//                 <div className="col-md-3 text-white">
//                     <h2 className='fw-bold'>Social media</h2>
//                     <h5>follow us on social media to keep updated</h5>
//                     <div className='w-100 d-flex flex-row mt-2 '>
//                         <div className="col-3 pt-2 ">
//                             <h6>Follow Us</h6>
//                         </div>
//                         <div className="col-2 ps-2">
//                           <Link><BsTwitter className='s-icon' /></Link>
//                         </div>
//                         <div className="col-2 ps-2">
//                           <Link> <BsFacebook  className='s-icon'/></Link>
//                         </div>
//                         <div className="col-2 ps-2">
//                             <BsYoutube className='s-icon' />
//                         </div>
//                         <div className="col-2 ps-2">
//                           <Link to=""> <BsWhatsapp className='s-icon' />  </Link>
//                         </div>
                        

//                     </div>
                  
//                 </div>
//                 <div className="col-md-3 text-white ">
//                    <h2 className='fw-bold'>Company</h2>
//                    <Link className="nav-link active fw-bold" to="/blog">Blog</Link>
//                    <Link className="nav-link active fw-bold" to="/about">About Us</Link>
//                    <Link className="nav-link active fw-bold" to="/Career">Careers</Link>
//                 </div>
//                 <div className="col-md-3 text-white">
//                   <h2 className='fw-bold'>Customers</h2> 
//                   <Link className="nav-link active fw-bold" to="/blog">How it work</Link>
//                    <Link className="nav-link active fw-bold" to="/about">I phone app</Link>
//                    <Link className="nav-link active fw-bold" to="/Career">Andriod app</Link>
//                 </div>
//                 <div className="col-md-3 text-white">
//                   <h2 className='fw-bold '>Support</h2>
//                   <Link className="nav-link active fw-bold" to="/blog">Contact Us</Link>
//                    <Link className="nav-link active fw-bold" to="/about">0341-0727692</Link>
//                    <Link className="nav-link active fw-bold" to="/Career">GB_home_services@gmail.com</Link>
//                 </div>
//             </div>
//             <hr className='text-white'/>
//             <div className='w-100 text-center text-white pb-3'>Copyright Reserved by Gb-Online-Home-Soutions</div>
//             </div>
            
            

//     </div>;
// }


// // #endregion

// export default Footer;












import React from 'react';
import { Link } from "react-router-dom";
import { BsWhatsapp, BsYoutube, BsFacebook, BsTwitter, BsInstagram, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleEmailClick = () => {
    window.location.href = "mailto:GB_home_services@gmail.com";
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+923410727692";
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/923410727692", "_blank");
  };

  return (
    <footer className="footer-img pt-4 pt-md-5 mt-5">
      <div className="container-fluid px-md-5 px-3">
        <div className="row">
          {/* Social Media Section */}
          <div className="col-md-3 col-6 mb-4 text-white">
            <h5 className='fw-bold mb-3'>Social Media</h5>
            <p className='mb-3'>Follow us on social media to stay updated</p>
            <div className='d-flex flex-wrap gap-3 mt-3'>
              <Link 
                to="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-decoration-none text-white"
                title="Follow us on Twitter"
              >
                <BsTwitter className='s-icon fs-4' />
              </Link>
              <Link 
                to="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-decoration-none text-white"
                title="Like us on Facebook"
              >
                <BsFacebook className='s-icon fs-4' />
              </Link>
              <Link 
                to="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-decoration-none text-white"
                title="Subscribe on YouTube"
              >
                <BsYoutube className='s-icon fs-4' />
              </Link>
              <Link 
                to="#" 
                onClick={handleWhatsAppClick}
                className="text-decoration-none text-white"
                title="Message us on WhatsApp"
              >
                <BsWhatsapp className='s-icon fs-4' />
              </Link>
              <Link 
                to="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-decoration-none text-white"
                title="Follow us on Instagram"
              >
                <BsInstagram className='s-icon fs-4' />
              </Link>
              <Link 
                to="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-decoration-none text-white"
                title="Connect on LinkedIn"
              >
                <BsLinkedin className='s-icon fs-4' />
              </Link>
            </div>
          </div>

          {/* Company Section */}
          <div className="col-md-3 col-6 mb-4 text-white">
            <h5 className='fw-bold mb-3'>Company</h5>
            <div className="d-flex flex-column gap-2">
              <Link className="text-decoration-none text-white hover-light" to="/blog">
                Blog
              </Link>
              <Link className="text-decoration-none text-white hover-light" to="/about">
                About Us
              </Link>
              <Link className="text-decoration-none text-white hover-light" to="/careers">
                Careers
              </Link>
              <Link className="text-decoration-none text-white hover-light" to="/privacy">
                Privacy Policy
              </Link>
              <Link className="text-decoration-none text-white hover-light" to="/terms">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Customers Section */}
          <div className="col-md-3 col-6 mb-4 text-white">
            <h5 className='fw-bold mb-3'>Customers</h5>
            <div className="d-flex flex-column gap-2">
              <Link className="text-decoration-none text-white hover-light" to="/how-it-works">
                How it Works
              </Link>
              <Link className="text-decoration-none text-white hover-light" to="/iphone-app">
                iPhone App
              </Link>
              <Link className="text-decoration-none text-white hover-light" to="/android-app">
                Android App
              </Link>
              <Link className="text-decoration-none text-white hover-light" to="/faq">
                FAQ
              </Link>
              <Link className="text-decoration-none text-white hover-light" to="/testimonials">
                Testimonials
              </Link>
            </div>
          </div>

          {/* Support Section */}
          <div className="col-md-3 col-6 mb-4 text-white">
            <h5 className='fw-bold mb-3'>Support</h5>
            <div className="d-flex flex-column gap-2">
              <Link className="text-decoration-none text-white hover-light" to="/contact">
                Contact Us
              </Link>
              <Link 
                className="text-decoration-none text-white hover-light" 
                to="#" 
                onClick={handlePhoneClick}
              >
                📞 0341-0727692
              </Link>
              <Link 
                className="text-decoration-none text-white hover-light" 
                to="#" 
                onClick={handleEmailClick}
              >
                ✉️ GB_home_services@gmail.com
              </Link>
              <Link className="text-decoration-none text-white hover-light" to="/help-center">
                Help Center
              </Link>
              <Link className="text-decoration-none text-white hover-light" to="/support">
                24/7 Support
              </Link>
            </div>
          </div>
        </div>

        <hr className='text-white my-4' />
        
        {/* Copyright Section */}
        <div className='row align-items-center py-3'>
          <div className="col-md-6 text-center text-md-start text-white mb-2 mb-md-0">
            <span className='fw-light'>
              © {currentYear} GB Home Solutions. All rights reserved.
            </span>
          </div>
          <div className="col-md-6 text-center text-md-end text-white">
            <span className='fw-light'>
              Proudly serving homes across Gilgit-Baltistan
            </span>
          </div>
        </div>

        {/* Additional Info */}
        <div className="row">
          <div className="col-12 text-center">
            <div className="text-white-50 small mt-2">
              <span>ISO 9001 Certified | 🏆 Award Winning Service | ⭐ 4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </div>

      
    </footer>
  );
};

export default Footer;