import React, { useContext, useState } from 'react'
import './AdminLogin.scss'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userContext } from '../../context/userContext';

function AdminLogin() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const { setUser } = useContext(userContext)

    const navigate = useNavigate();

    async function handleSubmitLogin(e) {
        e.preventDefault();
        if (userName.length === 0 || password.length === 0) {
            return
        }
        try {
            const res = await axios.post("https://amina-back-end.onrender.com/login", {
                username: userName,
                password: password,

            });

            const token = res.data;
            const decoded = jwtDecode(token);
            sessionStorage.setItem('user', JSON.stringify(decoded))
            setUser(decoded)
            navigate("/admin");

            localStorage.setItem('token', token)
        } catch (error) {
            alert("Error var")
            return
        }
    }

    return (
        <div className='adminLogin'>
            <form action="" onSubmit={(e) => handleSubmitLogin(e)}>
                <label htmlFor="">Going Admin</label>
                <input type="text" onChange={(e) => setUserName(e.target.value)} placeholder='Admin...' />
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password...' />
                <button type='submit'>Go</button>
            </form>
        </div>
    )
}

export default AdminLogin