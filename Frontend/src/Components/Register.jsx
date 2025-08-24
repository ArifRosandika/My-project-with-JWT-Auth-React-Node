import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log("Submit");
        try {
            const response = await axios.post('http://localhost:5000/Register', {
                username: username,
                email: email,
                password: password,
                confPassword: confPassword
            });
            navigate('/Login');
            console.log(response.data);
            setMessage(response.data.message);
        } catch (error) {
            if(error.response) {
                console.log(error.response.data);
                setMessage(error.response.data.message);
            };
            console.error(error.message);
        };
    };
    return (
        <section className="hero">
            <div className="hero-body">
                <div className="container">
                    <div className="coloumns">
                        <div className="column">
                            <form onSubmit={ handleRegister }className='box'>
                            <p className='has-text-centered'>{message}</p>
                                <div className='field'>

                                    <label className='label'>Username</label>
                                    <div className='controls'>
                                        <input type='text' className='input' placeholder='Username' 
                                        value={username} onChange={(e) => setUsername(e.target.value)}/>
                                    </div>
                                </div>

                                <div className='field'>
                                    <label className='label'>Email</label>
                                    <div className='controls'>
                                        <input type='text' className='input' placeholder='Email' 
                                        value={email} onChange={(e) => setEmail(e.target.value)}/>
                                    </div>
                                </div>

                                <div className='field'>
                                    <label className='label'>Password</label>
                                    <div className='controls'>
                                        <input type='password' className='input' placeholder='Password' 
                                        value={password} onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                </div>

                                <div className='field'>
                                    <label className='label'>Confirm Password</label>
                                    <div className='controls'>
                                        <input type='password' className='input' placeholder='Password' 
                                        value={confPassword} onChange={(e) => setConfPassword(e.target.value)}/>
                                    </div>
                                </div>

                                <div className='field'>
                                    <button className='button' type='submit'>Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;