// import React,  { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const Auth = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/Login', {
//         email: email,
//         password: password,
//       });
//       navigate('/Dashboard');
//       console.log("Login success", response.data);
//     } catch (error) {
//       if (error.response) {
//         console.log(error.response.data);
//         setMessage(error.response.data.message);
//       }
//       console.error(error.message);
//     };
//   };

//   return (
//     <section className="hero">
//       <div className="hero-body">
//         <div className="container">
//           <div className="coloumns">
//             <div className="column">
//               <form onSubmit={Auth} className='box'>
//                 <p className='text'>{message}</p>
//                 <div className='field'>
//                   <label className='label'>Email</label>
//                   <div className='controls'>
//                     <input type='text' className='input' placeholder='Email'
//                     value={email} onChange={(e) => setEmail(e.target.value)} />
//                   </div>
//                 </div>
//                 <div className='field'>
//                   <label className='label'>Password</label>
//                   <div className='controls'>
//                     <input type='password' className='input' placeholder='Password'
//                     value={password} onChange={(e) => setPassword(e.target.value)} />
//                   </div>
//                 </div>
//                 <div className='field'>
//                   <button className='button' type='submit'>Login</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";  // Google logo
import { FaApple } from "react-icons/fa";   // Apple logo

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/Login", {
        email: email,
        password: password,
      });
      setMessage(response.data.message);
      navigate("/Dashboard");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        setMessage(error.response.data.message);
      }
    }
  };

  return ( 
  <div className="flex justify-center items-center h-screen">
    <div className="bg-white/10 backdrop-blur-lg p-8 w-96 rounded-2xl shadow-lg">
      {/* Title */}
      <h1 className="text-2xl font-bold text-white mb-2 text-center">
        Hay👋🏼, <span className="text-green-400">Welcome Back</span>
      </h1>
      <p className="text-gray-300 text-sm mb-6 text-center">
        Please login to continue
      </p>

      {/* Form */}
      <form onSubmit={Auth} className="flex flex-col gap-5">
        
        {/* Email */}
        <div className="flex flex-col text-white">
          <label className="mb-1">Email</label>
          <input
            type="text"
            placeholder="Enter your email"
            className="border border-gray-300 bg-white/15 placeholder-gray-400 
            rounded-lg px-4 py-2 focus:outline-none focus:ring-2 
            focus:ring-green-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col text-white">
          <label className="mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="border border-gray-300 bg-white/15 placeholder-gray-400 
            rounded-lg px-4 py-2 focus:outline-none focus:ring-2 
            focus:ring-green-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Remember me + Forgot password */}
        <div className="flex items-center justify-between text-sm text-gray-300">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="accent-green-500" />
            Remember me
          </label>
          <a href="" className="text-green-400 hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Error / Message */}
        {message && <p className="text-red-400 text-sm">{message}</p>}

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 
          text-white font-medium py-2 rounded-lg transition">Login
        </button>
      </form>

      {/* Register link */}
      <p className="text-white mt-4 text-center text-sm">Don’t have an account?{" "}<a
          href="/Register"
          className="text-green-400 hover:underline font-medium">Register</a>
      </p>
        {/* Divider */}
      <div className="flex items-center my-6">
        <hr className="flex-grow border-gray-300" />
        <span className="px-2 text-gray-400">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

        {/* Google button */}
      <div className="bg-white/3 backdrop-blur-lg rounded-lg">
        <button className="flex items-center justify-center w-full py-2 rounded-lg mb-3 hover:bg-gray-50 transition">
          <FcGoogle className="text-xl mr-2" />
          <span>Continue with Google</span>
        </button>
      </div>

        {/* Apple button */}
      <div className="bg-white/3 backdrop-blur-lg rounded-lg ">
        <button className="flex items-center justify-center w-full py-2 rounded-lg hover:bg-gray-500 transition">
          <FaApple className="text-xl mr-2" />
          <span>Continue with Apple</span>
        </button>
      </div>
    </div>
  </div>

  )
}

export default Login;