import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import LogIn from "./Pages/LogIn";
import SignUp from "./Pages/SignUp";

import Kitchen from "./Pages/Kitchen";
import PaintServices from "./Pages/PaintServices";
import ElectricalServices from "./Pages/ElectricalServices";
import Plumbing from "./Pages/Plumbing";
import AcInstallation from "./Pages/AcInstallation";
import SofaCleaning from "./Pages/SofaCleaning";
import Curton from "./Pages/Curton";
import DeepCleaning from "./Pages/DeepCleaning";
import CarpetCleaning from "./Pages/CarpetCleaning";
import WaterTank from "./Pages/WaterTank";
import WaterDespensor from "./Pages/WaterDespensor";
import Refrigirator from "./Pages/Refrigirator";
import PestControl from "./Pages/PestControl";
import WashingMachine from "./Pages/WashingMachine";
import MicroWave from "./Pages/Microwave";
import Electrition from "./Pages/Electrition";
// import { useEffect } from "react";

import Logout from "./Pages/Logout";
// import { useAuth } from "./store/auth";
import Profile from "./Pages/Profile";
import Payemnt from "./Pages/Payement";
import OrdersPage from "./Pages/OrdersPage";

// dashboard------------------------
import DashboardHome from "./Dashboard/DashboardHome";
import Users from "./Dashboard/Users";
import "./App.css";
import Messages from "./Dashboard/Messages";
import  CallRequests from "./Dashboard/CallRequests";
import Orders from "./Dashboard/Orders";
import LogInOptions from "./Pages/LogInOptions";
import ProfessionalLogIn from "./Pages/ProfessionalLogIn";
import SignUpOptions from "./Pages/SignUpOptions";
import ProfessionalSignUp from "./Pages/ProfessionalSignUp";
import Professionals from "./Dashboard/Professionals";
import AiChatBot from "./Pages/AiChatBot";





function App() {

  return (
    <>
    
      <Router>
      
        <Routes>
            {/* ##################### navigation bar routing ##################### */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
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
            {/* ##################### Recomended SErvices routing ##################### */}
          <Route path="/acinstallation" element={<AcInstallation/>}/>
          <Route path="/sofacleaning" element={<SofaCleaning/>}/>
          <Route path="/deepcleaning" element={<DeepCleaning/>}/>
          <Route path="/curton" element={<Curton/>}/>
          <Route path="/carpetcleaning" element={<CarpetCleaning/>}/>
          <Route path="/washingmachine" element={<WashingMachine/>}/>
          <Route path="/microwave" element={<MicroWave/>}/>
          <Route path="/refrigirator" element={<Refrigirator/>}/>
          <Route path="/watertank" element={<WaterTank/>}/>
          <Route path="/WaterDespensor" element={<WaterDespensor/>}/>
          <Route path="/pestcontrol" element={<PestControl/>}/>
          <Route path="/electrition" element={<Electrition/>}/>
          <Route path="/logout" element={<Logout/>}/>
          {/* after log in */}
          
           <Route path="/profile" element={<Profile/>}/>
          <Route path="/payment" element={<Payemnt/>}/> 
         <Route path="/orderpage" element={<OrdersPage/>}/> 


         {/* dashboard route */}
           <Route path="/admin" element={<DashboardHome />} />
           <Route path="/admin/users" element={<Users />} />
           <Route path="/admin/messages" element={<Messages />} />
           <Route path="/admin/call-requests" element={<CallRequests />} />
           <Route path="/admin/orders" element={<Orders />} />
           <Route path="/admin/professionals" element={<Professionals />} />
        </Routes>
      </Router>
      
    </>
  );
}

export default App;
