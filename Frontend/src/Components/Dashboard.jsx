import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [expired, setExpired] = useState('');
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
        getUsers();
    }, []);

    // ambil access token dari backend
    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);

            const decoded = jwtDecode(response.data.accessToken);
            setExpired(decoded.exp);
            setUsername(decoded.username);
        } catch (error) {
            if (error.response) {
                navigate('/Login');
            }
        }
    };

    // axios instance
    const axiosJWT = axios.create();

    // interceptor supaya token selalu fresh
    axiosJWT.interceptors.request.use(
        async (config) => {
            const currentDate = new Date();
            if (expired * 1000 < currentDate.getTime()) {
                const response = await axios.get('http://localhost:5000/token');
                config.headers.Authorization = `Bearer ${response.data.accessToken}`;
                setToken(response.data.accessToken);

                const decoded = jwtDecode(response.data.accessToken);
                setExpired(decoded.exp);
                setUsername(decoded.username);
            } else {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // contoh request ke API dengan axiosJWT
    const getUsers = async () => {
        try {
            const response = await axiosJWT.get('http://localhost:5000/users', {
                withCredentials: true
            });
            setUsers(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Gagal ambil users:', error.message);
            console.log (response.data.users);
        };
    };
    
    console.log('users:', users);
    return (
        <div className="container">
            <h1>Welcome: {username}</h1>
            <button onClick={getUsers} className="button">Get Users</button>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Nomor</th>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    { users.map((users, index) => (
                        <tr key={users.id}>
                            <td>{index + 1}</td>
                            <td>{users.username}</td>
                            <td>{users.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;