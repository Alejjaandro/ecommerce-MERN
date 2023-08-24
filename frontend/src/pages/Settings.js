import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import SettingsIcon from '@mui/icons-material/Settings';
import './styles/Settings.css';

import { useUser } from '../context/UserContext';
import { useLocation } from 'react-router-dom';

export default function Settings() {

    const { updateUser, errors } = useUser();
    const userId = useLocation().pathname.split('/')[2];

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

        await updateUser(userId, data);
    };

    console.log(errors);
    return (
        <>
            <Navbar />
            <div className="settings-container">

                <div className="settings-wrapper">

                    <h1 className='settings-title'><SettingsIcon /> SETTINGS</h1>

                    <form className='settings-form' onSubmit={handleChange}>

                        <div className="change-picture">
                            <label>Change Profile Picture: </label>
                            <input type='file' name='image' accept="image/*" />
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
                        <div className='errors'>
                            {errors.map((error, i) => (
                                <p key={i}>{ error }</p>
                            ))}
                        </div>

                        <button type='submit' className='settings-button'>CHANGE</button>

                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}