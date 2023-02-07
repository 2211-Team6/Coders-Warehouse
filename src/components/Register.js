import React, { useState, useEffect } from "react";
import { registerUser, fetchMe } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "../style/Register.css";

const Register = ({ setUser, setToken }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getMe = async () => {
      const data = await fetchMe(token);
      setUser(data);
    };
    if (token) {
      getMe();
    }
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(username, password, email);
    const token = await registerUser(username, password, email);
    setToken(token);
    localStorage.setItem("token", token);
    navigate("/");
  };

  return (
    <div className="form">
      <form>
        <h1>Register</h1>
        <div className="control">
          <label htmlFor="username">Username</label>
          <input
            value={username}
            type="text"
            required
            minLength={5}
            placeholder="username"
            onChange={(event) => setUserName(event.target.value)}
          />
          <div className="block-cube">
            <div className="bg-top"></div>
            <div className="bg-right"></div>
            <div className="bg-bottom"></div>
          </div>
        </div>
        <div className="control">
          <label htmlFor="password">Password :</label>
          <input
            value={password}
            type="password"
            required
            minLength={7}
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="block-cube">
            <div className="bg-top"></div>
            <div className="bg-right"></div>
            <div className="bg-bottom"></div>
          </div>
        </div>
        <div className="control">
          <label htmlFor="email">Email :</label>
          <input
            value={email}
            type="email"
            required
            minLength={7}
            placeholder="email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <div className="block-cube">
            <div className="bg-top"></div>
            <div className="bg-right"></div>
            <div className="bg-bottom"></div>
          </div>
        </div>
        <button
          onClick={(e) => handleClick(e)}
          type="button"
          name="register_button"
          value="Register"
          className="btn"
        >
          Register
        </button>
      </form>
    </div>
  );

};
export default Register;
