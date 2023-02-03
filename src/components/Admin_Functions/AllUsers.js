import React from 'react';
import { useState, useEffect } from 'react';
import { getAllUsers } from '../../api/auth';
import { useNavigate } from 'react-router-dom'

const AllUsers = ({user}) => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

useEffect(() => {
    const getTheUsers = async () => {
        const theUsers = await getAllUsers(user);
        console.log("here are the users", theUsers)
        setUsers(theUsers);
    }
    getTheUsers();
}, [])

console.log("this is users", users)
    return (
        <div>
        <button onClick={()=> navigate("/")}>Home</button>
            <h1>Here are the users!</h1>
            {users.map((user) => (
                <div key={user.id}>
                    <p>Name: {user.username}</p>
                    <p>Password: {user.password}</p>
                    <p>Email: {user.email}</p>
                    {console.log("This is user.username", user.username)}
                    <br></br>
                </div>
            ))}
        </div>
    )
};

export default AllUsers;