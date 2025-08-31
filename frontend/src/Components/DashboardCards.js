

// final test code

import React, { useState, useEffect } from "react";
import { FaUsers, FaBriefcase, FaTools } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../store/auth";

const DashboardCards = () => {
  const [users, setUsers] = useState([]);
  const [professional, setProfessional] = useState([]);
  const { AuthorizationToken } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      const userData = await response.json();
      setUsers(userData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };




  // professionals data
   const getAllProfessionalData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/professionals", {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      const professionalData = await response.json();
      setProfessional(professionalData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getAllUsersData();
    getAllProfessionalData();
  }, []);

  const cardStyle = {
    borderRadius: "15px",
    padding: "25px",
    marginBottom: "20px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
    color: "#fff",
    transition: "transform 0.2s ease",
    backgroundColor: "black", // Updated background
  };

  const iconStyle = {
    fontSize: "2rem",
    marginRight: "10px",
  };

  const cardHeader = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  };

  // Dummy chart data
  const userStats = [
    { name: "Mon", users: 20 },
    { name: "Tue", users: 35 },
    { name: "Wed", users: 50 },
    { name: "Thu", users: 40 },
    { name: "Fri", users: 55 },
  ];

  const professionalStats = [
    { name: "Mon", professionals: 10 },
    { name: "Tue", professionals: 18 },
    { name: "Wed", professionals: 25 },
    { name: "Thu", professionals: 22 },
    { name: "Fri", professionals: 30 },
  ];

  const vendorStats = [
    { name: "Mon", vendors: 5 },
    { name: "Tue", vendors: 8 },
    { name: "Wed", vendors: 12 },
    { name: "Thu", vendors: 15 },
    { name: "Fri", vendors: 18 },
  ];

  return (
    <div className="row">
      {/* Total Users */}
      <div className="col-md-4">
        <div className="bg-dark" style={cardStyle}>
          <div style={cardHeader}>
            <h4 className="primary-color" style={{ display: "flex", alignItems: "center" }}>
              <FaUsers className="primary-color" style={iconStyle} /> Total Users
            </h4>
            <h2>{users.length}</h2>
          </div>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={userStats}>
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="users" fill="currentColor" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Professionals */}
      <div className="col-md-4">
        <div className="bg-dark" style={cardStyle}>
          <div style={cardHeader}>
            <h4 className="primary-color" style={{ display: "flex", alignItems: "center" }}>
              <FaBriefcase className="primary-color" style={iconStyle} /> Professionals
            </h4>
            <h2>{professional.length}</h2>
          </div>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={professionalStats}>
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="professionals" fill="currentColor" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Vendors */}
      <div className="col-md-4">
        <div className="bg-dark" style={cardStyle}>
          <div style={cardHeader}>
            <h4 className="primary-color" style={{ display: "flex", alignItems: "center" }}>
              <FaTools className="primary-color" style={iconStyle} /> Vendors
            </h4>
            <h2>75</h2>
          </div>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={vendorStats}>
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="vendors" fill="currentColor" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;

