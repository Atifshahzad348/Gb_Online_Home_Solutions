import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch, FaPhone, FaIdCard, FaBriefcase, FaStar, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";

const ProfessionalManagement = () => {
  const [professionals, setProfessionals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { AuthorizationToken } = useAuth();

  const getAllProfessionalsData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/professionals", {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const professionalsData = await response.json();
      setProfessionals(professionalsData);
    } catch (error) {
      console.error("Error fetching professionals:", error);
      toast.error("Failed to fetch professionals data");
    }
  };

  const deleteProfessional = async (id) => {
    if (!window.confirm("Are you sure you want to delete this professional?")) {
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:5000/api/admin/professionals/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      
      if (response.ok) {
        toast.success("Professional's account deleted successfully");
        getAllProfessionalsData();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to delete professional");
      }
    } catch (error) {
      console.error("Error deleting professional:", error);
      toast.error("Failed to delete professional");
    }
  };

  useEffect(() => {
    getAllProfessionalsData();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setIsSearchActive(false);
      setFilteredProfessionals([]);
      return;
    }

    const filtered = professionals.filter((professional) => {
      const name = professional.name?.toLowerCase() || "";
      const profession = professional.profession?.toLowerCase() || "";
      const cnic = professional.cnic?.toLowerCase() || "";
      
      return (
        name.includes(searchTerm.toLowerCase()) ||
        profession.includes(searchTerm.toLowerCase()) ||
        cnic.includes(searchTerm.toLowerCase())
      );
    });

    setFilteredProfessionals(filtered);
    setIsSearchActive(true);
  };

  const displayedProfessionals = isSearchActive ? filteredProfessionals : professionals;

  return (
    <>
      <div className="col-md-12 px-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold "><FaUsers className="me-2 my-0 py-0 title-icon" /> Registered Professionals</h2>
          <div className="input-group" style={{ maxWidth: "300px" }}>
            <input
              type="text"
              className="form-control shadow-none search-bdr"
              placeholder="Search by name, profession or CNIC..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (e.target.value === "") {
                  setIsSearchActive(false);
                  setFilteredProfessionals([]);
                }
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

        {displayedProfessionals.length > 0 ? (
          <div className="row">
            {displayedProfessionals.map((professional, index) => (
              <div key={index} className="col-xl-4 col-lg-6 col-md-6 mb-4">
                <div className="card h-100 shadow-sm border-0 professional-card">
                  {/* Profile Header with Image */}
                  <div className="position-relative">
                    <div 
                      className="card-header bg-dark text-white d-flex justify-content-between align-items-center"
                      style={{ 
                        minHeight: '100px',
                        background: professional.profileImage 
                          ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(http://localhost:5000/uploads/professionals/${professional.profileImage}) center/cover`
                          : `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('../Fypimgs/default-profile.jpg') center/cover`
                      }}
                    >
                      <h6 className="mb-0 fw-bold text-white">{professional.name}</h6>
                      <span className="badge primary-bg text-dark">
                        {professional.experience} {professional.experience === '1' ? 'year' : 'years'} exp
                      </span>
                    </div>
                    
                    {/* Profile Image Thumbnail */}
                    <div className="position-absolute top-100 start-50 translate-middle">
                      <img 
                        src={professional.profileImage 
                          ? `http://localhost:5000/uploads/professionals/${professional.profileImage}`
                          : '../Fypimgs/default-profile.jpg'
                        }
                        alt={professional.name}
                        className="rounded-circle border border-3 border-white"
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.src = '../Fypimgs/default-profile.jpg';
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="card-body pt-5">
                    {/* CNIC Images */}
                    {(professional.cnicFrontImage || professional.cnicBackImage) && (
                      <div className="mb-3">
                        <h6 className="text-muted mb-2">
                          <FaIdCard className="text-orange me-2" />
                          CNIC Documents
                        </h6>
                        <div className="d-flex gap-2">
                          {professional.cnicFrontImage && (
                            <img 
                              src={`http://localhost:5000/uploads/professionals/${professional.cnicFrontImage}`}
                              alt="CNIC Front"
                              className="img-thumbnail"
                              style={{ width: '80px', height: '60px', objectFit: 'cover', cursor: 'pointer' }}
                              onClick={() => window.open(`http://localhost:5000/uploads/professionals/${professional.cnicFrontImage}`, '_blank')}
                            />
                          )}
                          {professional.cnicBackImage && (
                            <img 
                              src={`http://localhost:5000/uploads/professionals/${professional.cnicBackImage}`}
                              alt="CNIC Back"
                              className="img-thumbnail"
                              style={{ width: '80px', height: '60px', objectFit: 'cover', cursor: 'pointer' }}
                              onClick={() => window.open(`http://localhost:5000/uploads/professionals/${professional.cnicBackImage}`, '_blank')}
                            />
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Professional Information */}
                    <div className="professional-info">
                      <div className="info-item mb-2">
                        <FaIdCard className="text-orange me-2" />
                        <span className="text-muted">CNIC: </span>
                        <strong>{professional.cnic}</strong>
                      </div>
                      
                      <div className="info-item mb-2">
                        <FaBriefcase className="text-orange me-2" />
                        <span className="text-muted">Profession: </span>
                        <strong className="text-capitalize">{professional.profession}</strong>
                      </div>
                      
                      {professional.specialization && (
                        <div className="info-item mb-2">
                          <FaStar className="text-orange me-2" />
                          <span className="text-muted">Specialization: </span>
                          <strong>{professional.specialization}</strong>
                        </div>
                      )}
                      
                      <div className="info-item mb-2">
                        <FaPhone className="text-orange me-2" />
                        <span className="text-muted">Contact: </span>
                        <strong>{professional.contact1}</strong>
                        {professional.contact2 && <>, <strong>{professional.contact2}</strong></>}
                      </div>
                      
                      {professional.city && (
                        <div className="info-item mb-2">
                          <FaMapMarkerAlt className="text-orange me-2" />
                          <span className="text-muted">City: </span>
                          <strong>{professional.city}</strong>
                        </div>
                      )}
                      
                      {professional.address && (
                        <div className="info-item mb-2">
                          <small className="text-muted">Address: </small>
                          <div className="small">{professional.address}</div>
                        </div>
                      )}
                      
                      {professional.permenentAdress && (
                        <div className="info-item mb-2">
                          <small className="text-muted">Permanent Address: </small>
                          <div className="small">{professional.permenentAdress}</div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="card-footer bg-transparent d-flex justify-content-between">
                    <Link to={`/admin/professionals/${professional._id}/edit`}>
                      <button className="btn admin-btn2 btn-sm">
                        <FaEdit className="me-1" /> Edit
                      </button>
                    </Link>
                    <button 
                      onClick={() => deleteProfessional(professional._id)} 
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

export default ProfessionalManagement;