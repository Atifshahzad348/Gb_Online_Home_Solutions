
// final test code

import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { LuMessageSquareMore } from "react-icons/lu";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { useAuth } from "../store/auth";
import {toast } from 'react-toastify';
const UserMessagesManagment = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { AuthorizationToken } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/contact", {
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

  // deleting client messages
  const deleteMessage = async(id)=>{
     console.log(id);
          try {
          const response = await fetch(`http://localhost:5000/api/admin/contact/delete/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: AuthorizationToken,
            },
          });
          const userData = await response.json();
          console.log("users messages after delet", userData);
          toast.success("Client msg is Deleted");
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
          <h2 className="fw-bold  px-3 py-3">
            <LuMessageSquareMore className="me-2 my-0 " />
            Client Messages
          </h2>
          <div className="input-group" style={{ maxWidth: "300px" }}>
            <input
              type="text"
              className="form-control shadow-none search-bdr"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsSearchActive(false);
              }}
            />
            <span
              className="input-group-text search-icon px-3"
              style={{ cursor: "pointer" }}
              onClick={handleSearch}
            >
              <FaSearch />
            </span>
          </div>
        </div>

        <div className="row">
          {displayedUsers.length > 0 ? (
            displayedUsers.map((currUser, index) => (
              <div className="col-md-6 col-lg-4 mb-4  " key={index}>
                <div
                  className="card h-100"
                  style={{
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    border: "none",
                    borderRadius: "10px",
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title"><FaUser className="me-2" />{currUser.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted"><MdEmail className="me-2" />{currUser.email}</h6>
                    <p className="card-text">
                      <FaRegMessage className="me-2" />{currUser.text }
                    </p>
                  </div>
                  <div className="card-footer d-flex justify-content-end gap-3 bg-white border-0">
                    {/* <FaEdit className="edit-icon" style={{ cursor: "pointer" }} /> */}
                    {/* <FaTrash className="delet-icon" style={{ cursor: "pointer" }} /> */}
                    <button className="btn admin-btn2">Edit</button>
                    <button onClick={()=> deleteMessage(currUser._id)} className="btn admin-btn1">Delete</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center text-muted">
              No users found.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserMessagesManagment;
