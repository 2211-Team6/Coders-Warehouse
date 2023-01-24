import React, { useState } from "react";
import { login } from "../api/auth";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <div>
      <form>
        <h1>Login</h1>
        <label htmlFor="username">Username</label>
        <input
          value={username}
          type="text"
          required
          minLength={5}
          placeholder="username"
          onChange={(event) => setUserName(event.target.value)}
        ></input>
        <label htmlFor="password">Password :</label>
        <input
          value={password}
          type="password"
          required
          minLength={7}
          placeholder="password"
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <button
          onClick={() => {
            login(username, password);
          }}
          type="button"
          name="login_button"
          value="Login"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export const checkUserLoggedIn = () => {
  const token = localStorage.getItem('token');
  return token ? true : false;
}
export default Login;