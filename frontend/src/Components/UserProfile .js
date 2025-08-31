
// // test code
import React, { useState, useRef } from 'react';
import { useAuth } from '../store/auth';
import { FaCamera } from "react-icons/fa";

const UserProfile = () => {
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  const coverInputRef = useRef(null);


  // Added dummy image URLs
  const dummyProfilePic = 'data:image/jpeg;base64,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';
  const dummyCoverPic = 'data:image/jpeg;base64,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';


  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    bio: user?.bio || 'I love using this platform!',
    phone: user?.phone || '+1 (555) 123-4567',
    address: user?.address || '123 Main St, Anytown, USA',
    profileImage: user?.profileImage || dummyProfilePic, // Using dummy image
    coverImage: user?.coverImage || dummyCoverPic // Using dummy image
   
  });
  const [previewImage, setPreviewImage] = useState(profileData.profileImage);
  const [previewCover, setPreviewCover] = useState(profileData.coverImage);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewCover(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setProfileData(prev => ({
        ...prev,
        profileImage: previewImage,
        coverImage: previewCover
      }));
      setLoading(false);
      setIsEditing(false);
      alert('Profile updated successfully! (This is a frontend demo)');
    }, 1000);
  };

  return (
    <div className="col-md-9 p-5">
      <div className="card">
        {/* Cover Photo */}
        <div className="position-relative">
          <div 
            className="cover-photo" 
            style={{ 
              height: '200px', 
              background: previewCover ? `url(${previewCover}) center/cover` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
          >
            {isEditing && (
              <button
                className="btn profile-btn position-absolute bottom-0 end-0 m-3"
                onClick={() => coverInputRef.current.click()}
              >
                <i className="bi bi-camera me-2"></i>Change Cover
                <input 
                  type="file" 
                  ref={coverInputRef}
                  onChange={handleCoverImageChange}
                  accept="image/*"
                  className="d-none"
                />
              </button>
            )}
          </div>
        </div>

        {/* Profile Header */}
        <div className="profile-header text-center mt-n5 mb-4">
          <div className="position-relative d-inline-block">
            <img
              src={previewImage}
              alt="Profile"
              className="rounded-circle border border-4 border-white shadow"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
            {isEditing && (
              <button
                className="btn  rounded-circle position-absolute bottom-0 end-0"
                style={{ width: '40px', height: '40px' }}
                onClick={() => fileInputRef.current.click()}
              >
                {/* <i className="bi bi-camera"></i> */}
                <FaCamera />
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
          
          <h2 className="mt-3 fw-bold">{profileData.name}</h2>
          <p className="text-muted">{profileData.email}</p>
          
          <div className="d-flex justify-content-center gap-3 mt-3">
            {!isEditing ? (
              <button 
                className="btn profile-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button 
                  className="btn profile-btn2"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button 
                  className="btn profile-btn2"
                  onClick={() => {
                    setIsEditing(false);
                    setPreviewImage(profileData.profileImage);
                    setPreviewCover(profileData.coverImage);
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {/* Profile Content */}
        <div className="card-body">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Full Name</label>
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
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Bio</label>
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
                <label className="form-label">Address</label>
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
                <h5>About</h5>
                <p>{profileData.bio}</p>
              </div>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <h5>Contact Information</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <i className="bi bi-telephone me-2"></i>
                      {profileData.phone}
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-envelope me-2"></i>
                      {profileData.email}
                    </li>
                    <li>
                      <i className="bi bi-geo-alt me-2"></i>
                      {profileData.address}
                    </li>
                  </ul>
                </div>
                
                <div className="col-md-6 mb-3">
                  <h5>Account Details</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <i className="bi bi-person me-2"></i>
                      Member since: {new Date().toLocaleDateString()}
                    </li>
                    <li>
                      <i className="bi bi-shield-lock me-2"></i>
                      Last updated: {new Date().toLocaleDateString()}
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


// test code
// import React, { useState, useRef } from 'react';
// import { useAuth } from '../store/auth';
// import { FaCamera } from "react-icons/fa";

// const UserProfile = () => {
//   const { user } = useAuth();
//   const fileInputRef = useRef(null);
//   const coverInputRef = useRef(null);
  
//   // Added dummy image URLs
//   const dummyProfilePic = 'https://randomuser.me/api/portraits/men/1.jpg';
//   const dummyCoverPic = 'https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

//   const [profileData, setProfileData] = useState({
//     name: user?.name || 'John Doe',
//     email: user?.email || 'john.doe@example.com',
//     bio: user?.bio || 'I love using this platform!',
//     phone: user?.phone || '+1 (555) 123-4567',
//     address: user?.address || '123 Main St, Anytown, USA',
//     profileImage: user?.profileImage || dummyProfilePic, // Using dummy image
//     coverImage: user?.coverImage || dummyCoverPic // Using dummy image
//   });
  
//   const [previewImage, setPreviewImage] = useState(profileData.profileImage);
//   const [previewCover, setPreviewCover] = useState(profileData.coverImage);
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(false);
// // Add these missing handler functions:
//   const handleCoverImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewCover(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleProfileImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     setTimeout(() => {
//       setProfileData(prev => ({
//         ...prev,
//         profileImage: previewImage,
//         coverImage: previewCover
//       }));
//       setLoading(false);
//       setIsEditing(false);
//       alert('Profile updated successfully! (This is a frontend demo)');
//     }, 1000);
//   };
//   // ... rest of your existing code remains exactly the same ...

//   return (
//     <div className="col-md-9 p-5">
//       <div className="card">
//         {/* Cover Photo - Now shows dummy cover by default */}
//         <div className="position-relative">
//           <div 
//             className="cover-photo" 
//             style={{ 
//               height: '200px', 
//               background: previewCover ? `url(${previewCover}) center/cover` : `url(${dummyCoverPic}) center/cover`
//             }}
//           >
//             {isEditing && (
//               <button
//                 className="btn profile-btn position-absolute bottom-0 end-0 m-3"
//                 onClick={() => coverInputRef.current.click()}
//               >
//                 <i className="bi bi-camera me-2"></i>Change Cover
//                 <input 
//                   type="file" 
//                   ref={coverInputRef}
//                   onChange={handleCoverImageChange}
//                   accept="image/*"
//                   className="d-none"
//                 />
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Profile Header - Now shows dummy profile pic by default */}
//         <div className="profile-header text-center mt-n5 mb-4">
//           <div className="position-relative d-inline-block">
//             <img
//               src={previewImage}
//               alt="Profile"
//               className="rounded-circle border border-4 border-white shadow"
//               style={{ width: '150px', height: '150px', objectFit: 'cover' }}
//             />
//             {isEditing && (
//               <button
//                 className="btn rounded-circle position-absolute bottom-0 end-0"
//                 style={{ width: '40px', height: '40px' }}
//                 onClick={() => fileInputRef.current.click()}
//               >
//                 <FaCamera />
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
          
//           {/* ... rest of your JSX remains exactly the same ... */}
//         </div>

//         {/* ... rest of your component remains unchanged ... */}
//       </div>
//     </div>
//   );
// };

// export default UserProfile;