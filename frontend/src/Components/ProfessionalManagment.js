



// final test code

import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch, FaPhone, FaIdCard, FaBriefcase, FaStar, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { AuthorizationToken } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/professionals", {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      const userData = await response.json();
      setUsers(userData);
    } catch (error) {
      console.error("Error fetching professionals:", error);
    }
  };

  const deleteUser = async (id) => {
    console.log(id);
    try {
      const response = await fetch(`http://localhost:5000/api/admin/professionals/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      const userData = await response.json();
      console.log("users after delete", userData);
      toast.success("Professional's account delete successfully");
      if (response.ok) {
        getAllUsersData();
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

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
      const profession = user.profession?.toLowerCase() || "";
      return (
        name.includes(searchTerm.toLowerCase()) ||
        email.includes(searchTerm.toLowerCase()) ||
        profession.includes(searchTerm.toLowerCase())
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
          <h2 className="fw-bold "><FaUsers className="me-2 my-0 py-0 title-icon" /> Registered Professionals</h2>
          <div className="input-group" style={{ maxWidth: "300px" }}>
            <input
              type="text"
              className="form-control shadow-none search-bdr"
              placeholder="Search by name, email or profession..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsSearchActive(false);
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
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

        {displayedUsers.length > 0 ? (
          <div className="row">
            {displayedUsers.map((currUser, index) => (
              <div key={index} className="col-xl-4 col-lg-6 col-md-6 mb-4">
                <div className="card h-100 shadow-sm border-0 professional-card">
                  <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                    <h6 className="mb-0 fw-bold">{currUser.name}</h6>
                    <span className="badge primary-bg text-dark">
                      {currUser.experience} {currUser.experience === '1' ? 'year' : 'years'} exp
                    </span>
                  </div>
                  
                  <div className="card-body">
                    <div className="professional-info">
                      <div className="info-item mb-2">
                        <FaIdCard className="text-orange me-2" />
                        <span className="text-muted">CNIC: </span>
                        <strong>{currUser.cnic}</strong>
                      </div>
                      
                      <div className="info-item mb-2">
                        <FaBriefcase className="text-orange me-2" />
                        <span className="text-muted">Profession: </span>
                        <strong className="text-capitalize">{currUser.profession}</strong>
                      </div>
                      
                      <div className="info-item mb-2">
                        <FaStar className="text-orange me-2" />
                        <span className="text-muted">Specialization: </span>
                        <strong>{currUser.specialization}</strong>
                      </div>
                      
                      <div className="info-item mb-2">
                        <FaPhone className="text-orange me-2" />
                        <span className="text-muted">Contact: </span>
                        <strong>{currUser.contact1}</strong>
                        {currUser.contact2 && <>, <strong>{currUser.contact2}</strong></>}
                      </div>
                      
                      <div className="info-item mb-2">
                        <FaMapMarkerAlt className="text-orange me-2" />
                        <span className="text-muted">City: </span>
                        <strong>{currUser.city}</strong>
                      </div>
                      
                      <div className="info-item mb-2">
                        <small className="text-muted">Address: </small>
                        <div className="small">{currUser.address}</div>
                      </div>
                      
                      {currUser.permenentAdress && (
                        <div className="info-item mb-2">
                          <small className="text-muted">Permanent Address: </small>
                          <div className="small">{currUser.permenentAdress}</div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="card-footer bg-transparent d-flex justify-content-between">
                    <Link to={`/admin/users/${currUser._id}/edit`}>
                      <button className="btn admin-btn2 btn-sm">
                        <FaEdit className="me-1" /> Edit
                      </button>
                    </Link>
                    <button 
                      onClick={() => deleteUser(currUser._id)} 
                      className="btn admin-btn1 btn-sm"
                    >
                      <FaTrash className="me-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <div className="text-muted mb-3">
              <FaUsers size={48} className="opacity-25" />
            </div>
            <h5 className="text-muted">No professionals found</h5>
            <p className="text-muted">Try adjusting your search terms or register new professionals</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .professional-card {
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
          border-radius: 12px;
          overflow: hidden;
        }
        
        .professional-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        
        .bg-orange {
          background-color: #fd7e14 !important;
        }
        
        .text-orange {
          color: #fd7e14 !important;
        }
        
        .professional-info {
          font-size: 0.9rem;
        }
        
        .info-item {
          display: flex;
          align-items: flex-start;
        }
        
        .search-bdr {
          border-radius: 8px 0 0 8px;
        }
        
        .search-icon {
          border-radius: 0 8px 8px 0;
          background-color: #fd7e14;
          color: white;
          border: 1px solid #fd7e14;
        }
        
        .card-header {
          border-radius: 12px 12px 0 0 !important;
        }
      `}</style>
    </>
  );
};

export default UserManagement;








// final test
