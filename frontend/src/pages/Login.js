import './styles/Login.css';

import { Link } from 'react-router-dom';

export default function Login() {
    return (

        <div className='login-container'>

            <div className="login-wrapper">

                <h1 className='login-title'>SIGN IN</h1>

                <form className='login-form'>

                    <input className='login-input' placeholder="Email" type='email' />
                    <input className='login-input' placeholder="Password" type='password' />

                    <button className='login-button'>LOGIN</button>

                    <Link className='login-link' to='/register'>Don't have an account?</Link>
                    <Link className='login-link' to='/register'>Forget your password?</Link>
                </form>
            </div>
        </div>

    )
}
