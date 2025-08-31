
import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaUser,
  FaPhone,
  FaTools,
  FaCity,
  FaMapMarkerAlt,
  FaHome,
} from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { useAuth } from "../store/auth";
import {toast } from 'react-toastify';

const CallRequestManagment = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { AuthorizationToken } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/callRequest", {
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
// deleting clinet call request 
const deleteCallRequest = async(id)=>{
    console.log(id);
      try {
      const response = await fetch(`http://localhost:5000/api/admin/callRequest/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      const userData = await response.json();
      console.log("call request after delet", userData);
      toast.success("Client call-Request is deleted");
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

  // ✅ Safely reverse the displayed users
  const displayedUsers = isSearchActive
    ? [...filteredUsers].reverse()
    : [...users].reverse();

  return (
    <div className="col-md-12 px-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold px-3 py-3">
          <IoMdCall className="me-2 my-0 py-0 title-icon" />
          Call request for service
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
            <div className="col-md-6 col-lg-4 mb-4" key={index}>
              <div
                className="card h-100"
                style={{
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                <div className="card-body">
                  <p className="card-text mb-2">
                    <FaUser className="me-2 text-secondary" />
                    <strong>Name:</strong>
                    <span style={{ marginLeft: "8px" }}>{currUser.name}</span>
                  </p>
                  <p className="card-text mb-2">
                    <FaPhone className="me-2 text-secondary" />
                    <strong>Contact:</strong>
                    <span style={{ marginLeft: "8px" }}>{currUser.contact}</span>
                  </p>
                  <p className="card-text mb-2">
                    <FaTools className="me-2 text-secondary" />
                    <strong>Service Type:</strong>
                    <span className="fw-bold" style={{ marginLeft: "8px" }}>{currUser.service}</span>
                  </p>
                  <p className="card-text mb-2">
                    <FaCity className="me-2 text-secondary" />
                    <strong>City:</strong>
                    <span style={{ marginLeft: "8px" }}>{currUser.city}</span>
                  </p>
                  <p className="card-text mb-2">
                    <FaMapMarkerAlt className="me-2 text-secondary" />
                    <strong>Area:</strong>
                    <span style={{ marginLeft: "8px" }}>{currUser.area}</span>
                  </p>
                  <p className="card-text mb-0">
                    <FaHome className="me-2 text-secondary" />
                    <strong>Address:</strong>
                    <span style={{ marginLeft: "8px" }}>{currUser.address}</span>
                  </p>
                </div>
                <div className="card-footer d-flex justify-content-end gap-3 bg-white border-0">
                  <button className="btn admin-btn2">Edit</button>
                  <button onClick={()=>deleteCallRequest(currUser._id)} className="btn admin-btn1">Delete</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center text-muted">No users found.</div>
        )}
      </div>
    </div>
  );
};

export default CallRequestManagment;



