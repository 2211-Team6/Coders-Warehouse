import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
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
  
  const handleLogin = async () => {
    console.log("This is username and password", username, password)
    const newUser = await login(username, password);
    console.log("This is the user", newUser)
    navigate("/")
  }

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
          onClick={() => handleLogin()
          }
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