// import React, { useState, useEffect } from 'react';
// import { getReviews, fetchMe } from '../api/auth';
// import AllReviews from "../components/Reviews";
// import OrderSummary from "../components/OrderSummary";
// import "../style/UserProfile.css"

// const UserProfile = () => {
//   const [profile, myProfile] = useState({});
//   const [reviews, setReviews] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [editing, setEditing] = useState(false);

//   useEffect(() => {
//     const fetchUser = async () => {
//       // make API call to get user data
//       const data = await fetchMe();
//       setUser(data);
//     };

//     const fetchReviews = async () => {
//       const data = await getReviews();
//       setReviews(data);
//     };

//     const fetchOrders = () => {
//     };

//     fetchUser();
//     fetchReviews();
//     fetchOrders();
//     console.log("Here's the user", profile)
//   }, []);

//   const handleEdit = () => {
//     setEditing(true);
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     setEditing(false);
//     // make API call to update user information
//     const updatedUser = await updateUser(profile);
//     setUser(updatedUser);
//   };

//   const renderProfile = () => {
//     if (!profile.username) {
//       return <div>Loading...</div>;
//     }
//     return (
//       <div className="user-profile-header">
//         <h2 className="user-profile-username">{profile.username}</h2>
//         <button className="user-profile-edit-button" onClick={handleEdit}>Edit</button>
//       </div>
//     );
//   };

//   const renderForm = () => {
//     return (
//       <form onSubmit={handleSave} className="user-profile-form">
//         <h2 className="user-profile-form-header">Edit User Profile</h2>
//         <div className="form-group">
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             id="username"
//             value={profile.username}
//             onChange={(e) => myProfile({ ...profile, username: e.target.value })}
//             className="user-profile-form-input"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             value={profile.email}
//             onChange={(e) => myProfile({ ...profile, email: e.target.value })}
//             className="user-profile-form-input"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="location">Location</label>
//           <input
//             type="text"
//             id="location"
//             value={profile.location}
//             onChange={(e) => myProfile({ ...profile, location: e.target.value })}
//             className="user-profile-form-input"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="bio">Bio</label>
//           <textarea
//             id="bio"
//             value={user.bio}
//             onChange={(e) => myProfile({ ...profile, bio: e.target.value })}
//             className="user-profile-form-input"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="avatar">Avatar</label>
//           <input
//             type="file"
//             id="avatar"
//             onChange={(e) => myProfile({ ...profile, avatar: e.target.files[0] })}
//             className="user-profile-form-input"
//           />
//         </div>
//         <button type="submit">Save</button>
//       </form>
//     );
//   };

//   return (
//     <div className="user-profile-container">
//       {renderProfile()}
//       <div className="user-profile-header">
//         <h2 className="user-profile-username">{profile.username}</h2>
//         <button className="user-profile-edit-button" onClick={handleEdit}>Edit</button>
//       </div>
//       <div className="user-profile-details">
//         <p className="user-profile-email">{profile.email}</p>
//         <OrderSummary orders={orders} />
//       </div>
//       <AllReviews reviews={reviews} />
//     </div>
//   );
// };




// export default UserProfile;