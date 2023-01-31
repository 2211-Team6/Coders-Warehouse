import React, { useState, useEffect } from "react";
import { registerUser, fetchMe } from "../api/auth";
import { useNavigate } from "react-router-dom"

const Register = ({setUser}) => {
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

  return (
    <div>
      <form>
        <h1>Register</h1>
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
        <label htmlFor="email">Email :</label>
        <input
          value={email}
          type="email"
          required
          minLength={7}
          placeholder="email"
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log(username, password, email);
            registerUser(username, password, email);
            navigate("/");
          }}
          type="button"
          name="register_button"
          value="Register"
        >
          Register
        </button>
      </form>
    </div>
  );
};
export default Register;
