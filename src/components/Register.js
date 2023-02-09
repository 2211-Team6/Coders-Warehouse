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
    if(token === undefined){
      localStorage.removeItem("token")
      navigate("/login")
    }
    else{
    setToken(token)
    localStorage.setItem("token", token)
    navigate("/")
    }
  }

  return (
    <div>
      <form class="form" autocomplete="off">
        <div class="control">
          <h1>Register</h1>
        </div>
        <div class="control block-cube block-input">
          <input
            value={username}
            type="text"
            required
            minLength={5}
            placeholder="username"
            onChange={(event) => setUserName(event.target.value)}
          ></input>
          <div class="bg-top">
            <div class="bg-inner"></div>
          </div>
          <div class="bg-right">
            <div class="bg-inner"></div>
          </div>
          <div class="bg">
            <div class="bg-inner"></div>
          </div>
        </div>
        <div class="control block-cube block-input">
          <input
            value={password}
            type="password"
            required
            minLength={7}
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
          ></input>
          <div class="bg-top">
            <div class="bg-inner"></div>
          </div>
          <div class="bg-right">
            <div class="bg-inner"></div>
          </div>
          <div class="bg">
            <div class="bg-inner"></div>
          </div>
        </div>
        <div class="control block-cube block-input">
        <input
            value={email}
            type="email"
            required
            minLength={7}
            placeholder="email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <div class="bg-top">
            <div class="bg-inner"></div>
          </div>
          <div class="bg-right">
            <div class="bg-inner"></div>
          </div>
          <div class="bg">
            <div class="bg-inner"></div>
          </div>
        </div>
        <button
          class="btn block-cube block-cube-hover"
          onClick={(e) => handleClick(e)}
          type="button"
          name="login_button"
          value="Login"
        >
          <div class="bg-top">
            <div class="bg-inner"></div>
          </div>
          <div class="bg-right">
            <div class="bg-inner"></div>
          </div>
          <div class="bg">
            <div class="bg-inner"></div>
          </div>
          <div class='text'>
      Register
    </div>
        </button>
      </form>
    </div>
  );
};
  
export default Register;
