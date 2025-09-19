

// // test code

// import React, { useState, useRef, useEffect } from 'react';
// import { useAuth } from '../store/auth';
// import { FaCamera, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendar, FaShieldAlt } from "react-icons/fa";
// import { toast } from 'react-toastify';

// const UserProfile = () => {
//   const { user, updateUserProfile } = useAuth();
//   const fileInputRef = useRef(null);

//   // Default avatar image (can be placed in your public folder)
//   const defaultAvatar = '/default-avatar.png';

//   const [profileData, setProfileData] = useState({
//     name: '',
//     email: '',
//     bio: '',
//     phone: '',
//     address: '',
//     profileImage: '',
//     joinDate: ''
//   });
  
//   const [previewImage, setPreviewImage] = useState(defaultAvatar);
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [imageFile, setImageFile] = useState(null);

//   // Initialize profile data from user context
//   useEffect(() => {
//     if (user) {
//       setProfileData({
//         name: user.name || '',
//         email: user.email || '',
//         bio: user.bio || 'I love using this platform!',
//         phone: user.contact || '',
//         address: user.address || '',
//         profileImage: user.profileImage || '',
//         joinDate: user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'January 2023'
//       });
      
//       // Set preview image - use default if no profile image
//       setPreviewImage(user.profileImage ? `${process.env.REACT_APP_BACKEND_URL}${user.profileImage}` : defaultAvatar);
//     }
//   }, [user]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleProfileImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       const formData = new FormData();
//       formData.append('name', profileData.name);
//       formData.append('bio', profileData.bio);
//       formData.append('phone', profileData.phone);
//       formData.append('address', profileData.address);
      
//       if (imageFile) {
//         formData.append('profileImage', imageFile);
//       }

//       await updateUserProfile(formData);
      
//       toast.success('Profile updated successfully!');
//       setIsEditing(false);
//       setImageFile(null);
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       toast.error('Failed to update profile. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container-fluid p-0">
//       <div className="card border-0 rounded-0 shadow-none">
//         {/* Profile Header */}
//         <div className="profile-header bg-light text-center py-5">
//           <div className="position-relative d-inline-block">
//             <img
//               src={previewImage}
//               alt="Profile"
//               className="rounded-circle border border-4 border-white shadow"
//               style={{ width: '150px', height: '150px', objectFit: 'cover' }}
//               onError={(e) => {
//                 e.target.src = defaultAvatar;
//               }}
//             />
//             {isEditing && (
//               <button
//                 type="button"
//                 className="btn btn-primary rounded-circle position-absolute bottom-0 end-0"
//                 style={{ width: '40px', height: '40px' }}
//                 onClick={() => fileInputRef.current.click()}
//               >
//                 <FaCamera className="m-0 p-0" />
//                 <input 
//                   type="file" 
//                   ref={fileInputRef}
//                   onChange={handleProfileImageChange}
//                   accept="image/*"
//                   className="d-none"
//                 />
//               </button>
//             )}
//           </div>
          
//           <h2 className="mt-3 fw-bold text-dark">{profileData.name}</h2>
//           <p className="text-muted">{profileData.email}</p>
          
//           <div className="d-flex justify-content-center gap-3 mt-3">
//             {!isEditing ? (
//               <button 
//                 className="btn orange-btn"
//                 onClick={() => setIsEditing(true)}
//               >
//                 Edit Profile
//               </button>
//             ) : (
//               <>
//                 <button 
//                   className="btn orange-btn"
//                   onClick={handleSubmit}
//                   disabled={loading}
//                 >
//                   {loading ? 'Saving...' : 'Save Changes'}
//                 </button>
//                 <button 
//                   type="button"
//                   className="btn black-btn btn-outline-secondary"
//                   onClick={() => {
//                     setIsEditing(false);
//                     setPreviewImage(profileData.profileImage ? 
//                       `${process.env.REACT_APP_BACKEND_URL}${profileData.profileImage}` : defaultAvatar);
//                     setImageFile(null);
//                   }}
//                 >
//                   Cancel
//                 </button>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Profile Content */}
//         <div className="card-body p-5">
//           {isEditing ? (
//             <form onSubmit={handleSubmit}>
//               <div className="row">
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label fw-semibold">Full Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="name"
//                     value={profileData.name}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label fw-semibold">Phone Number</label>
//                   <input
//                     type="tel"
//                     className="form-control"
//                     name="phone"
//                     value={profileData.phone}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//               </div>
              
//               <div className="mb-3">
//                 <label className="form-label fw-semibold">Email</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   value={profileData.email}
//                   disabled
//                 />
//                 <small className="text-muted">Email cannot be changed</small>
//               </div>
              
//               <div className="mb-3">
//                 <label className="form-label fw-semibold">Bio</label>
//                 <textarea
//                   className="form-control"
//                   name="bio"
//                   rows="3"
//                   value={profileData.bio}
//                   onChange={handleInputChange}
//                   placeholder="Tell us about yourself..."
//                 ></textarea>
//               </div>
              
//               <div className="mb-3">
//                 <label className="form-label fw-semibold">Address</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="address"
//                   value={profileData.address}
//                   onChange={handleInputChange}
//                   placeholder="Your address"
//                 />
//               </div>
//             </form>
//           ) : (
//             <div className="profile-details">
//               <div className="mb-4">
//                 <h5 className="fw-bold sc-color mb-3">About</h5>
//                 <p className="text-muted">{profileData.bio}</p>
//               </div>
              
//               <div className="row">
//                 <div className="col-md-6 mb-4">
//                   <h5 className="fw-bold sc-color mb-3">Contact Information</h5>
//                   <ul className="list-unstyled">
//                     <li className="mb-3 d-flex align-items-center">
//                       <FaPhone className="text-black me-3" />
//                       <span>{profileData.phone || 'Not provided'}</span>
//                     </li>
//                     <li className="mb-3 d-flex align-items-center">
//                       <FaEnvelope className="text-black me-3" />
//                       <span>{profileData.email}</span>
//                     </li>
//                     <li className="mb-3 d-flex align-items-center">
//                       <FaMapMarkerAlt className="text-black me-3" />
//                       <span>{profileData.address || 'Not provided'}</span>
//                     </li>
//                   </ul>
//                 </div>
                
//                 <div className="col-md-6 mb-4">
//                   <h5 className="fw-bold sc-color mb-3">Account Details</h5>
//                   <ul className="list-unstyled">
//                     <li className="mb-3 d-flex align-items-center">
//                       <FaCalendar className="text-black me-3" />
//                       <span>Member since: {profileData.joinDate}</span>
//                     </li>
//                     <li className="d-flex align-items-center">
//                       <FaShieldAlt className="text-black me-3" />
//                       <span>Last updated: {new Date().toLocaleDateString()}</span>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;









import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../store/auth';
import { FaCamera, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendar, FaShieldAlt } from "react-icons/fa";
import { toast } from 'react-toastify';

const UserProfile = () => {
  const { user, AuthorizationToken } = useAuth(); // Get AuthorizationToken
  const fileInputRef = useRef(null);

  const defaultAvatar = '/default-avatar.png';

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    phone: '',
    address: '',
    profileImage: '',
    joinDate: ''
  });
  
  const [previewImage, setPreviewImage] = useState(defaultAvatar);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  // Initialize profile data
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || 'I love using this platform!',
        phone: user.contact || '', // Map contact to phone
        address: user.address || '',
        profileImage: user.profileImage || '',
        joinDate: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'January 2023'
      });
      
      setPreviewImage(user.profileImage ? `http://localhost:5000${user.profileImage}` : defaultAvatar);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateUserProfile = async (formData) => {
    try {
      const response = await fetch('http://localhost:5000/api/user/profile', {
        method: 'PUT',
        headers: {
          'Authorization': AuthorizationToken,
          // Don't set Content-Type for FormData - browser will set it automatically
        },
        body: formData
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }
      
      return data;
    } catch (error) {
      console.error('Update error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('name', profileData.name);
      formData.append('bio', profileData.bio);
      formData.append('phone', profileData.phone); // This will map to contact field
      formData.append('address', profileData.address);
      
      if (imageFile) {
        formData.append('profileImage', imageFile);
      }

      const result = await updateUserProfile(formData);
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      setImageFile(null);
      
      // Update local user data if needed
      if (result.user) {
        // You might want to update your auth context here
        console.log('Updated user:', result.user);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="card border-0 rounded-0 shadow-none">
        {/* Profile Header */}
        <div className="profile-header bg-light text-center py-5">
          <div className="position-relative d-inline-block">
            <img
              src={previewImage}
              alt="Profile"
              className="rounded-circle border border-4 border-white shadow"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = defaultAvatar;
              }}
            />
            {isEditing && (
              <button
                type="button"
                className="btn btn-primary rounded-circle position-absolute bottom-0 end-0"
                style={{ width: '40px', height: '40px' }}
                onClick={() => fileInputRef.current.click()}
              >
                <FaCamera className="m-0 p-0" />
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleProfileImageChange}
                  accept="image/*"
                  className="d-none"
                />
              </button>
            )}
          </div>
          
          <h2 className="mt-3 fw-bold text-dark">{profileData.name}</h2>
          <p className="text-muted">{profileData.email}</p>
          
          <div className="d-flex justify-content-center gap-3 mt-3">
            {!isEditing ? (
              <button 
                className="btn orange-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button 
                  className="btn orange-btn"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button 
                  type="button"
                  className="btn black-btn btn-outline-secondary"
                  onClick={() => {
                    setIsEditing(false);
                    setPreviewImage(user.profileImage ? 
                      `http://localhost:5000${user.profileImage}` : defaultAvatar);
                    setImageFile(null);
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {/* Profile Content */}
        <div className="card-body p-5">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={profileData.email}
                  disabled
                />
                <small className="text-muted">Email cannot be changed</small>
              </div>
              
              <div className="mb-3">
                <label className="form-label fw-semibold">Bio</label>
                <textarea
                  className="form-control"
                  name="bio"
                  rows="3"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself..."
                ></textarea>
              </div>
              
              <div className="mb-3">
                <label className="form-label fw-semibold">Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  placeholder="Your address"
                />
              </div>
            </form>
          ) : (
            <div className="profile-details">
              <div className="mb-4">
                <h5 className="fw-bold sc-color mb-3">About</h5>
                <p className="text-muted">{profileData.bio}</p>
              </div>
              
              <div className="row">
                <div className="col-md-6 mb-4">
                  <h5 className="fw-bold sc-color mb-3">Contact Information</h5>
                  <ul className="list-unstyled">
                    <li className="mb-3 d-flex align-items-center">
                      <FaPhone className="text-black me-3" />
                      <span>{profileData.phone || 'Not provided'}</span>
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                      <FaEnvelope className="text-black me-3" />
                      <span>{profileData.email}</span>
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                      <FaMapMarkerAlt className="text-black me-3" />
                      <span>{profileData.address || 'Not provided'}</span>
                    </li>
                  </ul>
                </div>
                
                <div className="col-md-6 mb-4">
                  <h5 className="fw-bold sc-color mb-3">Account Details</h5>
                  <ul className="list-unstyled">
                    <li className="mb-3 d-flex align-items-center">
                      <FaCalendar className="text-black me-3" />
                      <span>Member since: {profileData.joinDate}</span>
                    </li>
                    <li className="d-flex align-items-center">
                      <FaShieldAlt className="text-black me-3" />
                      <span>Last updated: {new Date().toLocaleDateString()}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;