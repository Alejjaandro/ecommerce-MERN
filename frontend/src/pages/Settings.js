import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import SettingsIcon from '@mui/icons-material/Settings';
import './styles/Settings.css';

import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

export default function Settings() {

    const { user } = useAuth();
    const { updateUser, errors, success } = useUser();

    const handleChange = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        // Remove any fields that have an empty string value or an empty object.
        /* 
        (typeof req.body[field] === 'object') && (Object.keys(req.body[field]).length === 0)
        verifies if the value of the field is an object and if that object has no properties.
        If both conditions are true, the field is deleted from req.body.
        */
        for (let field in data) {
            if (data[field] === "" || ((typeof data[field] === 'object') && (Object.keys(data[field]).length === 0))) {
                delete data[field];
            }
        }

        // Petition to update user data.
        await updateUser(user._id, data);

        // Timer to empty form fields when finished.
        setTimeout(() => {
            e.target.reset();
        }, 5000);
    };

    return (
        <>
            <Navbar />
            <div className="settings-container">

                <div className="settings-wrapper">

                    <h1 className='settings-title'><SettingsIcon /> SETTINGS</h1>

                    <form className='settings-form' onSubmit={handleChange}>

                        <div className="change-picture">
                            <label>Change Profile Picture: </label>
                            <input placeholder="New Picture URL" type='text' name='image' />
                            <span>
                                First you nedd to upload your picture to <Link to='https://imgbb.com/' target="_blank">ImgBB</Link>,
                                then copy the URL and paste it here.
                            </span>
                        </div>

                        <div className="change-email">
                            <label>Change your Email: </label>
                            <input placeholder="New Email" type='email' name='email' />
                        </div>

                        <div className="change-username">
                            <label>Change your Username: </label>
                            <input placeholder="New Username" type='text' name='username' />
                        </div>

                        <div className="change-password">
                            <label>Change your Password: </label>
                            <input placeholder="New Password" type='password' name='password' />
                        </div>

                        {/* Errors */}
                        {errors.map((error, i) => (
                            <div className='errors' key={i}>
                                <p>{error}</p>
                            </div>
                        ))}

                        {/* Success */}
                        {success && (
                            <div className='success'>
                                <p>{success}</p>
                            </div>
                        )}

                        <div class="settings-buttons">
                            <button type='submit' className='settings-button'>CHANGE</button>
                            <Link to={`/my-profile/${user._id}`} className="profile-link">Your Profile</Link>
                        </div>

                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}