import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import "../style/Login.css";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const newUser = await login(username, password);
    console.log("This is the user", newUser);
    navigate("/");
  };

  return (
    <div>
      <form class="form" autocomplete="off">
        <div class="control">
          <h1>Login</h1>
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
        <button
          class="btn block-cube block-cube-hover"
          onClick={() => handleLogin()}
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
      Login
    </div>
          Login
        </button>
      </form>
    </div>
  );
};

export const checkUserLoggedIn = () => {
  const token = localStorage.getItem("token");
  return token ? true : false;
};
export default Login;
