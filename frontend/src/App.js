
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Shop1 from "./Pages/Shop";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import LogIn from "./Pages/LogIn";
import SignUp from "./Pages/SignUp";

import Kitchen from "./Pages/Kitchen";
import PaintServices from "./Pages/PaintServices";
import ElectricalServices from "./Pages/ElectricalServices";
import Plumbing from "./Pages/Plumbing";


import Logout from "./Pages/Logout";
import { useAuth } from "./store/auth";
import Profile from "./Pages/Profile";
import Payemnt from "./Pages/Payement";
import OrdersPage from "./Pages/OrdersPage";
import Cart from "./Pages/Cart";

// dashboard------------------------
import DashboardHome from "./Dashboard/DashboardHome";
import Users from "./Dashboard/Users";
import "./App.css";
import Messages from "./Dashboard/Messages";
import CallRequests from "./Dashboard/CallRequests";
import Orders from "./Dashboard/Orders";
import LogInOptions from "./Pages/LogInOptions";
import ProfessionalLogIn from "./Pages/ProfessionalLogIn";
import SignUpOptions from "./Pages/SignUpOptions";
import ProfessionalSignUp from "./Pages/ProfessionalSignUp";
import Professionals from "./Dashboard/Professionals";
import AiChatBot from "./Pages/AiChatBot";
import AddServices from "./Dashboard/AddServices";
import CategoryPage from './Pages/CategoryPage'; // Import the generic category page
// import { ServicesProvider } from './store/services'; //new change
import ServiceDetail from './Components/ServiceDetail';
import Available_services from "./Dashboard/Available_services";
import Addproducts from "./Dashboard/Addproducts";
import ProductDetail from './Pages/ProductDetail';
import AvailableProducts from "./Dashboard/AvailableProducts";
import Product_orders from "./Dashboard/Product_orders";


// Create a wrapper component for activity monitoring
const ActivityMonitor = ({ children }) => {
  const { AuthorizationToken, user } = useAuth();
  
  useEffect(() => {
    if (user && AuthorizationToken) {
      // Send periodic activity updates to keep user status active
      const activityInterval = setInterval(async () => {
        try {
          await fetch("http://localhost:5000/status", {
            method: "GET",
            headers: {
              Authorization: AuthorizationToken,
            },
          });
        } catch (error) {
          console.error("Activity update failed:", error);
        }
      }, 60000); // Update every minute
      
      return () => clearInterval(activityInterval);
    }
  }, [user, AuthorizationToken]);
  
  return children;
};

function App() {
  return (
    <>
      <Router>
        {/* Wrap your Routes with ActivityMonitor */}
        <ActivityMonitor>
          <Routes>
            {/* ##################### navigation bar routing ##################### */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/shop" element={<Shop1 />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/chatbot" element={<AiChatBot />} />

            <Route path="/login" element={<LogIn/>}/>
            <Route path="/professionallogin" element={<ProfessionalLogIn/>}/>
            <Route path="/loginoption" element={<LogInOptions/>}/>

            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/signupoption" element={<SignUpOptions/>}/>
            <Route path="/professionalsignup" element={<ProfessionalSignUp/>}/>
            
            {/* ##################### top Services routing ##################### */}
            <Route path="/kitchen" element={<Kitchen/>}/>
            <Route path="/paint" element={<PaintServices/>}/>
            <Route path="/electrical" element={<ElectricalServices/>}/>
            <Route path="/plumbing" element={<Plumbing/>}/>
            
            {/* ##################### Recomended Services routing ##################### */}
          
            <Route path="/logout" element={<Logout/>}/>
            
            {/* after log in */}
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/payment" element={<Payemnt/>}/> 
            <Route path="/orderpage" element={<OrdersPage/>}/> 
            <Route path="/cart" element={<Cart />} />

            {/* dashboard route */}
            <Route path="/admin" element={<DashboardHome />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/messages" element={<Messages />} />
            <Route path="/admin/call-requests" element={<CallRequests />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/professionals" element={<Professionals />} />
            <Route path="/admin/addServices" element={<AddServices/>} />
            <Route path="/admin/addproducts" element={<Addproducts/>} />
            <Route path="/admin/availableproducts" element={<AvailableProducts/>} />
            <Route path="/admin/productOrders" element={<Product_orders />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/admin/availableservices" element={<Available_services/>} />
            <Route path="/service/:id" element={<ServiceDetail />} />
          
            <Route path="/category/:category" element={<CategoryPage />} />
         

          </Routes>
        </ActivityMonitor>
      </Router>
    </>
  );
}

export default App;
