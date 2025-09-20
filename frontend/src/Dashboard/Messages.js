import React from "react";
import { Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// react icons
import { FaHome } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { LuMessageSquareMore } from "react-icons/lu";
import { FaBorderAll } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { MdOutlineEngineering } from "react-icons/md";
import UserMessagesManagment from "../Components/UserMessagesManagment"
import { MdLocalShipping } from "react-icons/md";



const Messages = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-3 col-lg-2  bg-dark sidebar text-white " style={{ minHeight: "100vh" }}>
          <h4 className="text-white mt-2">Dashboard</h4>
          <ul className="nav flex-column mt-4">
            <li className="nav-item dash-menu mb-2"><Link to="/admin" className="nav-link text-white"><FaHome className="me-2 my-0 py-0 dash-icon" /> Home</Link></li>
            <li className="nav-item dash-menu mb-2"><Link to="/admin/users" className="nav-link text-white"><FaUsers className="me-2 my-0 py-0 dash-icon" />Users</Link></li>
            <li className="nav-item dash-menu mb-2"><Link to="/admin/professionals" className="nav-link text-white"><MdOutlineEngineering className="me-2 my-0 py-0 dash-icon" /> Professionals</Link></li>
             <li className="nav-item dash-menu mb-2"><Link to="/admin/call-requests" className="nav-link text-white"><IoMdCall  className="me-2 my-0 py-0 dash-icon"/> Call Requests</Link></li>
             <li className="nav-item dash-menu mb-2"><Link to="/admin/messages" className="nav-link text-white"><LuMessageSquareMore className="me-2 my-0 py-0 dash-icon"/> Client Messages</Link></li>
            <li className="nav-item dash-menu mb-2"><Link to="/admin/orders" className="nav-link text-white"><FaBorderAll className="me-2 my-0 py-0 dash-icon"  /> Orders</Link></li>
            <li className="nav-item dash-menu mb-2"><Link to="/admin/earnings" className="nav-link text-white"><FaMoneyCheckDollar className="me-2 my-0 py-0 dash-icon" /> Earnings</Link></li>
        <li className="nav-item dash-menu mb-2"><Link to="/admin/addproducts" className="nav-link text-white"><FaMoneyCheckDollar className="me-2 my-0 py-0 dash-icon" />Add Products</Link></li>
        <li className="nav-item dash-menu mb-2"><Link to="/admin/availableproducts" className="nav-link text-white"><FaMoneyCheckDollar className="me-2 my-0 py-0 dash-icon" />Available Products</Link></li>
         <li className="nav-item dash-menu mb-2"><Link to="/admin/productOrders" className="nav-link text-white"><MdLocalShipping className="me-2 my-0 py-0 dash-icon" />Products Orders</Link></li>
          <li className="nav-item dash-menu mb-2"><Link to="/admin/addServices" className="nav-link text-white"><FaMoneyCheckDollar className="me-2 my-0 py-0 dash-icon" />Add Services</Link></li>
          <li className="nav-item dash-menu mb-2"><Link to="/admin/availableservices" className="nav-link text-white"><FaMoneyCheckDollar className="me-2 my-0 py-0 dash-icon" />Available Services</Link></li>
          </ul>
        </nav>

        {/* Page Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-1 py-4">
         <UserMessagesManagment />
        </main>
      </div>
    </div>
  );
};

export default Messages;
