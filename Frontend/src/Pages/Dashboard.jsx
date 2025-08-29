import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const Dashboard = () => {
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [expired, setExpired] = useState('');
    const [users, setUsers] = useState([]);

    const Navigate = useNavigate();

    useEffect(() => {
        refreshToken();
        getUsers();
    },[]);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);

            const decoded = jwtDecode(response.data.accessToken);
            setExpired(decoded.exp)
            setUsername(decoded.username)
        } catch (error) {
            if (error.message) {
                Navigate('/Login');
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(
        async(config) => {
            const currentDate = new Date();
            if(expired * 1000 < currentDate.getTime()) {
                const response = await axios.get('http://localhost:5000/token');
                config.headers.Authorization = `Bearer ${response.data.accessToken}`;
                setToken(response.data.accessToken);

                const decoded = jwtDecode(response.data.accessToken);
                setExpired(decoded.exp);
                setUsername(decoded.username);
            } else {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        }
    )
    
    const getUsers = async () => {
        try {
            const response = await axiosJWT.get('http://localhost:5000/users', {
                withCredentials: true
            });
            setUsers(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("error:", error.message);
        }
    }

    const handleLogout = async () => {
        try {
            await axios.delete('http://localhost:5000/Logout');
            Navigate('/Login');
        } catch (error) {
            console.error(error);
        }
    }


  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex justify-center items-center">
      {/* Kotak Gabungan */}
      <div className="w-3/4 h-3/4 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg flex    ">
        
        {/* Kiri (Blur) */}
        <div className="w-1/2 bg-white/10 backdrop-blur-lg p-6 flex flex-col items-center justify-center">
          {/* Avatar User */}
          <div className="mb-6 flex flex-col items-center">
            <FaUser className="w-30 h-30 rounded-full bg-green-500 flex items-center justify-center text-2xl font-bold shadow-lg">
              {username}
            </FaUser>
            <h2 className="mt-4 text-lg font-semibold text-white">{username}</h2>
          </div>

          {/* Menu */}
          <div className="flex flex-col gap-4">
            <div className="text-white font-bold mb-4">
                <button onClick={() => Navigate('/Login')} type="button" className="hover:bg-white/20 rounded-lg p-2 cursor-pointer">Home</button>
                <button onClick={getUsers} type="button" className="hover:bg-white/20 rounded-lg p-2 cursor-pointer">Get User</button>
                <button onClick={handleLogout} type="button" className="hover:bg-white/20 rounded-lg p-2 cursor-pointer">Logout</button>
            </div> 
          </div>
        </div>

        {/* Kanan (Hijau) */}
        <div className="w-1/2 bg-green-400/80 flex items-center justify-center">
          <h1 className="text-3xl font-bold text-white">
            Hello , <span className="text-gray-900">{username}</span>
          </h1>
        </div>
      </div>
    </div>
  );
}



export default Dashboard;
