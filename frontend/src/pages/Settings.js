import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import SettingsIcon from '@mui/icons-material/Settings';

import './styles/Settings.css';

export default function Settings() {
    return (
        <>
            <Navbar />
            <div className="settings-container">

                <div className="settings-wrapper">

                    <h1 className='settings-title'><SettingsIcon/> SETTINGS</h1>

                    <form className='settings-form'>

                        <div className="change-email">
                            <label htmlFor="changeEmail">Change your Email: </label>
                            <input placeholder="New Email" type='email' name='changeEmail'
                                // onChange={}
                            />
                        </div>

                        <div className="change-username">
                            <label htmlFor="changeEmail">Change your Username: </label>
                            <input placeholder="New Username" type='text' name='changeUsername'
                                // onChange={}
                            />
                        </div>

                        <div className="change-password">
                            <label htmlFor="changeEmail">Change your Password: </label>
                            <input placeholder="New Password" type='password' name='changePassword'
                                // onChange={}
                            />
                        </div>

                        <button className='settings-button'>CHANGE</button>

                    </form>

                </div>

            </div>
            <Footer />
        </>
    )
}
