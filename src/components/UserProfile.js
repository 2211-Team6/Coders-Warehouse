import React, { useState, useEffect } from 'react';
import { getReviews, fetchMe } from '../api/auth';
import AllReviews from "../components/Reviews";
import OrderSummary from "../components/OrderSummary";
import "../style/UserProfile.css"

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [reviews, setReviews] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      // make API call to get user data
      const data = await fetchMe();
      setUser(data);
    };

    const fetchReviews = async () => {
      const data = await getReviews();
      setReviews(data);
    };

    const fetchOrders = () => {
      // make API call to get the user's ordered products
      //also test merge
    };

    fetchUser();
    fetchReviews();
    fetchOrders();
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setEditing(false);
    // make API call to update user information
    const updatedUser = await updateUser(user);
    setUser(updatedUser);
  };

  const renderProfile = () => {
    return (
      <div className="user-profile-container">
        <div className="user-profile-header">
          <h2 className="user-profile-username">{user.username}</h2>
          <button className="user-profile-edit-button" onClick={handleEdit}>Edit</button>
        </div>
        <div className="user-profile-details">
          <p className="user-profile-email">{user.email}</p>
          <OrderSummary orders={orders} />
        </div>
        <AllReviews reviews={reviews} />
      </div>
    );
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSave} className="user-profile-form">
        <h2 className="user-profile-form-header">Edit User Profile</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="user-profile-form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="user-profile-form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={user.location}
            onChange={(e) => setUser({ ...user, location: e.target.value })}
            className="user-profile-form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            value={user.website}
            onChange={(e) => setUser({ ...user, website: e.target.value })}
            className="user-profile-form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            value={user.bio}
            onChange={(e) => setUser({ ...user, bio: e.target.value })}
            className="user-profile-form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="avatar">Avatar</label>
          <input
            type="file"
            id="avatar"
            onChange={(e) => setUser({ ...user, avatar: e.target.files[0] })}
            className="user-profile-form-input"
          />
        </div>
        <button type="submit">Save</button>
      </form>
    );
  };

  return (
    <div className="user-profile">
      {editing ? renderForm() : renderProfile()}
      <AllReviews reviews={reviews} />
      <OrderSummary orders={orders} />
    </div>
  );
};

export default UserProfile;