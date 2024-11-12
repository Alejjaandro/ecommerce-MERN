import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import SettingsIcon from '@mui/icons-material/Settings';
import './styles/Settings.css';

import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

export default function Settings() {

    const userId = window.location.pathname.split('/')[2];
    const { updateUser, errors, success } = useUser();

    const handleChange = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        for (let field in data) {
            if (data[field] === "") {
                delete data[field];
            }
        }

        // Petition to update user data.
        await updateUser(userId, data);

        // Timer to empty form fields when finished.
        if (success) {
            setTimeout(() => {
                e.target.reset();
            }, 5000);
        }
    };

    return (
        <>
            <Navbar />
            <div className="settings-container">

                <div className="settings-wrapper">

                    <h1 className='settings-title'><SettingsIcon /> SETTINGS</h1>

                    <form className='settings-form' onSubmit={handleChange}>

                        <div className="change-data">
                            <label>Change your Name: </label>
                            <input placeholder="New Name" type='text' name='name'/>
                        </div>

                        <div className="change-data">
                            <label>Change your Lastname: </label>
                            <input placeholder="New Lastname" type='text' name='lastname'/>
                        </div>

                        <div className="change-data">
                            <label>Change your Email: </label>
                            <input placeholder="New Email" type='email' name='email'/>
                        </div>

                        <div className="change-data">
                            <label>Change your Username: </label>
                            <input placeholder="New Username" type='text' name='username'/>
                        </div>

                        <div className="change-data">
                            <label>Change your Password: </label>
                            <input placeholder="New Password" type='password' name='password'/>
                        </div>

                        {/* Errors */}
                        <div className='errors'>
                            {errors.map((error, i) => (
                                <p key={i}>{error}</p>
                            ))}
                        </div>

                        {/* Success */}
                        <div className='success'>
                            {success && (
                                <p>{success}</p>
                            )}
                        </div>

                        <div className="settings-buttons">
                            <button type='submit' className='settings-button'>CHANGE</button>
                            <Link to={`/my-profile/${userId}`} className="profile-link">Your Profile</Link>
                        </div>

                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}