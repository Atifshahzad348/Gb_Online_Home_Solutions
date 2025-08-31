

// test code
import React, { useState, useEffect } from "react";
import { FaTrash, FaSearch } from "react-icons/fa";
import { useAuth } from "../store/auth";
import { FaTools } from "react-icons/fa";
import { toast } from 'react-toastify';

const OrderManagment = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { AuthorizationToken } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/clientorders", {
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

  // const deleteUser = async (id) => {
  //   try {
  //     const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: AuthorizationToken,
  //       },
  //     });
  //     const userData = await response.json();
  //     toast.success("User deleted");
  //     if (response.ok) {
  //       getAllUsersData();
  //     }
  //   } catch (error) {
  //     console.error("Error deleting user:", error);
  //   }
  // }

  // deleting orders 
   const deleteOrder = async(id)=>{
      console.log(id);
        try {
        const response = await fetch(`http://localhost:5000/api/admin/clientorders/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: AuthorizationToken,
          },
        });
        const userData = await response.json();
        console.log("users after delet", userData);
        toast.success("Order deleted");
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
          <h2 className="fw-bold ">
            <FaTools className="me-2 my-0 py-0 title-icon" /> SERVICE ORDERS
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
              className="input-group-text search-icon"
              style={{ cursor: "pointer" }}
              onClick={handleSearch}
            >
              <FaSearch />
            </span>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-light">
              <tr>
                <th style={{ color: "#fd7e14" }}>Name</th>
                <th style={{ color: "#fd7e14" }}>Contact</th>
                <th style={{ color: "#fd7e14" }}>City</th>
                <th style={{ color: "#fd7e14" }}>Address</th>
                <th style={{ color: "#fd7e14" }}>Service</th>
                <th style={{ color: "#fd7e14" }}>Type</th>
                <th style={{ color: "#fd7e14" }}>Description</th>
                <th className="text-center" style={{ color: "#fd7e14" }}>Action</th>
              </tr>
            </thead>
            <tbody className="">
              {displayedUsers.length > 0 ? (
                displayedUsers.map((currUser, index) => (
                  <tr key={index}>
                    <td>{currUser.name}</td>
                    <td>{currUser.contact}</td>
                    <td>{currUser.city}</td>
                    <td>{currUser.address}</td>
                    <td>{currUser.service}</td>
                    <td>{currUser.service_type}</td>
                    <td>{currUser.problem}</td>
                    <td className="text-center">
                     <button onClick={()=> deleteOrder(currUser._id)} className="btn admin-btn1">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-muted">
                    No orders found.
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

export default OrderManagment;
