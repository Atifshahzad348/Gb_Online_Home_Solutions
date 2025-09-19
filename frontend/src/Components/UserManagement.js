


import React, { useState, useEffect } from "react";
import { FaTrash, FaSearch, FaUser } from "react-icons/fa";
import { useAuth } from "../store/auth";
import { FaUsers } from "react-icons/fa";
import { toast } from 'react-toastify';

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
            console.log("Users data received:", userData);
            setUsers(userData);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const deleteUser = async(id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: AuthorizationToken,
                },
            });
            
            if(response.ok){
                toast.success("User deleted");
                getAllUsersData();
            } else {
                toast.error("Failed to delete user");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Error deleting user");
        }
    };

    useEffect(() => {
        getAllUsersData();
        const interval = setInterval(getAllUsersData, 30000);
        return () => clearInterval(interval);
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

    const getUserStatus = (user) => {
        if (user.isOnline) {
            return { text: "Online", color: "success" };
        }
        
        const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
        const lastActive = new Date(user.lastActive || 0);
        
        if (lastActive > fifteenMinutesAgo) {
            return { text: "Recently Active", color: "warning" };
        }
        
        return { text: "Offline", color: "secondary" };
    };

    // Function to get profile image URL
    const getProfileImageUrl = (user) => {
        if (!user.profileImage || user.profileImage === "") {
            return null;
        }
        
        // Check if it's already a full URL
        if (user.profileImage.startsWith('http')) {
            return user.profileImage;
        }
        
        // Handle relative paths
        if (user.profileImage.startsWith('/uploads/')) {
            return `http://localhost:5000${user.profileImage}`;
        }
        
        // Handle cases where it might be just the filename
        return `http://localhost:5000/uploads/${user.profileImage}`;
    };

    return (
        <>
            <div className="col-md-12 px-3">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold ">
                        <FaUsers className="me-2 my-0 py-0 title-icon" /> Registered Clients
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
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
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
                                <th style={{ color: "#fd7e14" }}>Profile</th>
                                <th style={{ color: "#fd7e14" }}>Name</th>
                                <th style={{ color: "#fd7e14" }}>Email</th>
                                <th style={{ color: "#fd7e14" }}>Phone</th>
                                <th style={{ color: "#fd7e14" }}>Address</th>
                                <th style={{ color: "#fd7e14" }}>Status</th>
                                <th style={{ color: "#fd7e14" }}>Last Active</th>
                                <th className="text-center" style={{ color: "#fd7e14" }}>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedUsers.length > 0 ? (
                                displayedUsers.map((currUser, index) => {
                                    const status = getUserStatus(currUser);
                                    const profileImageUrl = getProfileImageUrl(currUser);
                                    
                                    return (
                                        <tr key={index} style={{ height: "60px" }}>
                                            <td className="d-flex justify-content-center">
                                                <div className="d-flex align-items-center">
                                                    {profileImageUrl ? (
                                                        <img
                                                            src={profileImageUrl}
                                                            alt={currUser.name}
                                                            className="rounded-circle"
                                                            style={{
                                                                width: '50px',
                                                                height: '50px',
                                                                objectFit: 'cover',
                                                                border: '2px solid #dee2e6'
                                                            }}
                                                        />
                                                    ) : (
                                                        <div style={{ width: '40px', height: '40px' }}></div>
                                                    )}
                                                </div>
                                            </td>
                                            <td>{currUser.name}</td>
                                            <td>{currUser.email}</td>
                                            <td>{currUser.contact}</td>
                                            <td>
                                                {currUser.address ? currUser.address : "Not updated yet"}
                                            </td>
                                            <td>
                                                <span className={`badge bg-${status.color}`}>
                                                    {status.text}
                                                </span>
                                            </td>
                                            <td>
                                                {currUser.lastActive 
                                                    ? new Date(currUser.lastActive).toLocaleString() 
                                                    : 'Never'
                                                }
                                            </td>
                                            <td className="text-center">
                                                <button 
                                                    onClick={() => deleteUser(currUser._id)} 
                                                    className="btn btn admin-btn1 fw-bold"
                                                    title="Delete User"
                                                  
                                                >
                                                    {/* <FaTrash size={14} /> */} Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
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