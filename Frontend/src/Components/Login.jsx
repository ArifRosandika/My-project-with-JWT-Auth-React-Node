import React,  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/Login', {
        email: email,
        password: password,
      });
      navigate('/Dashboard');
      console.log("Login success", response.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        setMessage(error.response.data.message);
      }
      console.error(error.message);
    };
  };
  
  return (
    <section className="hero">
      <div className="hero-body">
        <div className="container">
          <div className="coloumns">
            <div className="column">
              <form onSubmit={Auth} className='box'>
                <p className='text'>{message}</p>
                <div className='field'>
                  <label className='label'>Email</label>
                  <div className='controls'>
                    <input type='text' className='input' placeholder='Email' 
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
                <div className='field'>
                  <label className='label'>Password</label>
                  <div className='controls'>
                    <input type='password' className='input' placeholder='Password' 
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                </div>
                <div className='field'>
                  <button className='button' type='submit'>Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;