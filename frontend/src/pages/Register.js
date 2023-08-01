import './styles/Register.css';

import {Link} from 'react-router-dom';

export default function Register() {
    return (

        <div className='register-container'>

            <div className="register-wrapper">

                <h1 className='register-title'>CREATE AN ACCOUNT</h1>

                <form className='register-form'>

                    <input className='register-input' placeholder="Name" type='text'/>
                    <input className='register-input' placeholder="Last name" type='text'/>
                    <input className='register-input' placeholder="Email" type='email'/>
                    <input className='register-input' placeholder="Username" type='text'/>
                    <input className='register-input' placeholder="Password" type='password'/>
                    <input className='register-input' placeholder="Confirm Password" type='password'/>

                    <span className="register-agreement">
                        By creating an account, 
                        I consent to the processing of my personal data according to our
                        <strong> Privacy Policy</strong>.
                    </span>


                    <div className='form-footer'>
                        <button className='register-button'>REGISTER</button>
                        
                        <Link to='/login'>Already have an account?</Link>
                    </div>

                </form>

            </div>
        </div>
    )
}
