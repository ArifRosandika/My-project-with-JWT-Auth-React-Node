import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/Register", {
        username: username,
        email: email,
        password: password,
        confPassword: confPassword,
      });
      navigate("/Login");
      console.log(response.data);
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        setMessage(error.response.data.message);
      }
      console.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white/10 backdrop-blur-lg p-8 w-96 rounded-2xl shadow-lg">
        {/* Title */}
        <h1 className="text-2xl font-bold text-white mb-2 text-center">
          Hay👋🏼, <span className="text-green-500">Hello Friend</span>
        </h1>
        <p className="text-gray-300 text-sm mb-6 text-center">
          Please Register to continue
        </p>

        {/* Form */}
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          {/* Username */}
          <div className="flex flex-col text-white">
            <label className="mb-1">Username</label>
            <input
              type="text"
              placeholder="Username"
              className="border border-gray-300 bg-white/15 placeholder-gray-400 
            rounded-lg px-4 py-2 focus:outline-none focus:ring-2 
            focus:ring-green-200"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

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

          {/* Confirm Password */}
          <div className="flex flex-col text-white">
            <label className="mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              className="border border-gray-300 bg-white/15 placeholder-gray-400 
            rounded-lg px-4 py-2 focus:outline-none focus:ring-2 
            focus:ring-green-200"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
            />
          </div>

          {/* Error / Message */}
          {message && <p className="text-red-400 text-sm">{message}</p>}

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 
          text-white font-medium py-2 rounded-lg transition"
          >
            Create account
          </button>
        </form>

        {/* Login link */}
        <p className="text-white mt-4 text-center text-sm">
          Already have an account?{" "}
          <a
            href="/Login"
            className="text-green-400 hover:underline font-medium"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
