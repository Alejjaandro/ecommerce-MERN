import { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import './styles/Login.css';

import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext.js';


export default function Login() {

    const navigate = useNavigate();
    const { login, isAuthenticated, errors: loginErrors } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
          navigate("/");
        }
      }, [isAuthenticated]);

    const handleLogin = async (e) => {
        e.preventDefault();

        await login({ email, password })
    }

    return (

        <>
            <Navbar />

            <div className='login-container'>

                <div className="login-wrapper">

                    <h1 className='login-title'>SIGN IN</h1>
                    {/* Errors */}
                    {
                        loginErrors.map((error, i) => (
                            <div className='errors' key={i}>
                                {error}
                            </div>
                        ))
                    }

                    <form className='login-form'>

                        <input className='login-input' placeholder="Email" type='email'
                            onChange={(e) => { setEmail(e.target.value) }}
                        />

                        <input className='login-input' placeholder="Password" type='password'
                            onChange={(e) => { setPassword(e.target.value) }}
                        />

                        <button className='login-button' onClick={handleLogin}>LOGIN</button>

                        <Link className='login-link' to='/register'>Don't have an account?</Link>
                        <Link className='login-link' to='/register'>Forget your password?</Link>
                    </form>
                </div>
            </div>

            <Footer />
        </>
    )
}
