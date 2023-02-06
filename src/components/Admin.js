import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import AllUsers from './Admin_Functions/AllUsers'
import NewProductForm from './Admin_Functions/NewProductForm';
import { fetchMe } from '../api/auth';


const Admin = ({token, setToken, user, products, setProducts, setUser, setSelectedProduct}) => {
    const navigate = useNavigate(); 
    const [authorized, setAuthorized] = useState({})
    // const location = useLocation();
    
    const unauthorized = () => {
        // alert("404 Unauthorized")
        navigate("/")
    }
    
    useEffect(() => {
        const getMe = async () => {
            const token = localStorage.getItem("token");
            const data = await fetchMe(token);
            setAuthorized(data);
        }
        getMe();
    }, [token]);
    console.log("here's the user in admin", authorized)

    return (
        <div>
            {authorized.isAdmin ? (
            <div>
            <button onClick={() => navigate("/allUsers")}>Get All Users</button>
            <button onClick={()=> setSelectedProduct("")}>Home</button>
            <button type="button" className="header-button logout" onClick={() => {
                localStorage.removeItem('token');
                navigate("/login");
            }}>Logout</button>
            <NewProductForm products={products} setProducts={setProducts} user={user} setUser={setUser}/>
            </div>)
            : (unauthorized())}
        </div>
    );
};

export default Admin;