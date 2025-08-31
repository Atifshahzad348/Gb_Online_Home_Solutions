
// final test code

import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { useAuth } from "../store/auth";
import { FaUsers } from "react-icons/fa";
import {toast } from 'react-toastify';
import { Link } from "react-router-dom";
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
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
  // delete the user when click on the delete button
  const deleteUser = async(id)=>{
    console.log(id);
      try {
      const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      const userData = await response.json();
      console.log("users after delet", userData);
      toast.success("User deleted");
      if(response.ok){
        getAllUsersData();
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }

  }

  useEffect(() => {
    getAllUsersData();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setIsSearchActive(false);
      setFilteredUsers([]);
      return;
    }

    const filtered = users.filter((user) => {
      const name = user.name?.toLowerCase() || "";
      const email = user.email?.toLowerCase() || "";
      return (
        name.includes(searchTerm.toLowerCase()) ||
        email.includes(searchTerm.toLowerCase())
      );
    });

    setFilteredUsers(filtered);
    setIsSearchActive(true);
  };

  const displayedUsers = isSearchActive ? filteredUsers : users;

  return (
    <>
      <div className="col-md-12 px-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
         <h2 className="fw-bold "><FaUsers className="me-2 my-0 py-0 title-icon" /> Registered Clients</h2>
          <div className="input-group" style={{ maxWidth: "300px" }}>
            <input
              type="text"
              className="form-control shadow-none search-bdr"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsSearchActive(false); // Reset filtering until search icon is clicked again
              }}
            />
            <span
              className="input-group-text search-icon"
              style={{ cursor: "pointer" }}
              onClick={handleSearch}
            >
              <FaSearch className="" />
            </span>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-bordered w-100">
            <thead>
              <tr>
                <th style={{ color: "#fd7e14" }}>Name</th>
                <th style={{ color: "#fd7e14" }}>Email</th>
                <th style={{ color: "#fd7e14" }}>Phone</th>
                <th style={{ color: "#fd7e14" }}>Active</th>
                <th style={{ color: "#fd7e14" }}>Orders</th>
                <th style={{ color: "#fd7e14" }}>Status</th>
                <th className="text-center" style={{ color: "#fd7e14" }}>Update</th>
                <th className="text-center" style={{ color: "#fd7e14" }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers.length > 0 ? (
                displayedUsers.map((currUser, index) => (
                  <tr key={index} style={{ height: "60px" }}>
                    <td>{currUser.name}</td>
                    <td>{currUser.email}</td>
                    <td>{currUser.contact}</td>
                    <td>{currUser.active ? "Yes" : "No"}</td>
                    <td>{currUser.orders || 0}</td>
                    <td>{currUser.status || "Pending"}</td>
                    <td className="text-center">
                      <Link to={`/admin/users/${currUser._id}/edit`}><button  className="btn admin-btn2 fw-bold">Edit</button></Link>
                      
                    </td>
                    <td className="text-center">
                     <button onClick={()=> deleteUser(currUser._id)} className="btn admin-btn1 fw-bold">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-muted">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
