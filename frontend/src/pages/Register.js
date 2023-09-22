import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import './styles/Register.css';

import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// To access the context.
import { useAuth } from '../context/AuthContext.js';

export default function Register() {

    const navigate = useNavigate();
    // Extract what we need.
    const { register, isAuthenticated, registerErrors } = useAuth();

    // This redirects to the home page once the user is authenticated.
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);

    // Function that handle the register post to the DB with the user data.
    const handleRegister = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData);

        // Delete empty fields.
        for (let field in user) {
            if (user[field] === "") {
                delete user[field];
            }
        }

        await register(user);
    }

    return (
        <>
            <Navbar />

            <div className='register-container'>

                <div className="register-wrapper">

                    <h1 className='register-title'>CREATE AN ACCOUNT</h1>
                    {/* Errors */}
                    <div className='register-errors'>
                        {registerErrors && registerErrors.map((error, i) => (
                            <p className='errors' key={i}>
                                {error}
                            </p>
                        ))
                        }
                    </div>

                    <form className='register-form' onSubmit={handleRegister}>

                        <input className='register-input' name='name' placeholder="Name" type='text' />
                        <input className='register-input' name='lastname' placeholder="Last name" type='text' />
                        <input className='register-input' name='email' placeholder="Email" type='email' />
                        <input className='register-input' name='username' placeholder="Username" type='text' />
                        <input className='register-input' name='password' placeholder="Password" type='password' />
                        <input className='register-input' name='confirmPassword' placeholder="Confirm Password" type='password' />

                        <span className="register-agreement">
                            By creating an account,
                            I consent to the processing of my personal data according to our
                            <b> Privacy Policy</b>.
                        </span>


                        <div className='form-footer'>
                            <button className='register-button' type='submit'>REGISTER</button>
                            <Link to='/login'>Already have an account?</Link>
                        </div>

                    </form>

                </div>
            </div>

            <Footer />
        </>
    )
}
