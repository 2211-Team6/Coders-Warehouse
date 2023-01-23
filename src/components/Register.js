import React, { useState } from "react";
import { registerUser } from "../api/auth";

const Register = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
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
        <button
          onClick={() => {
            registerUser(username, password);
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