import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import AllUsers from './Admin_Functions/AllUsers'
import NewProductForm from './Admin_Functions/NewProductForm';


const Admin = ({token, setToken, user, products, setProducts, setUser, setSelectedProduct}) => {
    const navigate = useNavigate(); 
    // const location = useLocation();
console.log("here's the user in admin", user)
    return (
        <div>
            <button onClick={() => navigate("/allUsers")}>Get All Users</button>
            <button onClick={()=> setSelectedProduct("")}>Home</button>
            <button type="button" className="header-button logout" onClick={() => {
                localStorage.removeItem('token');
                // setToken(null);
                // location.pathname = "/";
                navigate("/login");
            }}>Logout</button>
            <NewProductForm products={products} setProducts={setProducts} user={user} setUser={setUser}/>
        </div>
    );
};

export default Admin;