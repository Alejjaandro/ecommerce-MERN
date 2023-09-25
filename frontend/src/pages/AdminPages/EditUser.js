import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { useAuth } from '../../context/AuthContext';

import './styles/EditUser.css';

export default function EditUser() {

    const { adminGetUser, user, setUser, adminUpdateUser, success, errors } = useAdmin();
    const { user: currentAdmin, logout } = useAuth();

    const userId = window.location.pathname.split("/")[2];
    useEffect(() => {
        adminGetUser(userId);
        // Clean up function. We reset the user state when dismantling the component.
        return () => {
            setUser([]);
        };
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        for (let field in data) {
            if (data[field] === "") {
                delete data[field];
            }
        }
        
        // If the admin is modifying his own data, we need to update the user state.
        if (user._id === currentAdmin._id) {
            console.log("Updating current admin");
            await adminUpdateUser(currentAdmin._id, data);
            
            // If the admin changes his isAdmin status, 
            // we log out to reset the token with the info. 
            if (data.isAdmin === 'false') {
                alert("You are no longer an admin, please log in again.");
                logout();
            }
            
        } else {
            await adminUpdateUser(userId, data);
            adminGetUser(userId);
        }
    };

    if (!user) {
        return (
            <>
                <Navbar />
                <div className="editUser-container">
                    <div className="editUser-wrapper">
                        <h1 className="editUser-title">Loading...</h1>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="editUser-container">

                <div className="editUser-wrapper">

                    <h1 className="editUser-title">Edit {user.username}</h1>
                    <div className="editUser-image"><img src={user.image} /></div>

                    <div className="editUser-errors">
                        {errors && errors.map((message, index) => (
                            <p key={index}>{message}</p>
                        ))}
                    </div>

                    {success && success.map((message, index) => (
                        <p key={index} className="editUser-success">{message}</p>
                    ))}

                    <form onSubmit={handleSubmit} className="editUser-form">
                        <div className="editUser-form-group">
                            <label className="editUser-form-label">Name: </label>
                            <input type="text" placeholder={user.name} className="editUser-form-input" name='name' />
                        </div>
                        <div className="editUser-form-group">
                            <label className="editUser-form-label">Lastname: </label>
                            <input type="text" placeholder={user.lastname} className="editUser-form-input" name='lastname' />
                        </div>
                        <div className="editUser-form-group">
                            <label className="editUser-form-label">Email: </label>
                            <input type="text" placeholder={user.email} className="editUser-form-input" name='email' />
                        </div>
                        <div className="editUser-form-group">
                            <label className="editUser-form-label">Username: </label>
                            <input type="text" placeholder={user.username} className="editUser-form-input" name='username' />
                        </div>
                        <div className="editUser-form-group">
                            <label className="editUser-form-label">Password: </label>
                            <input type="password" className="editUser-form-input" name='password' />
                        </div>
                        <div className="editUser-form-group">
                            <label className="editUser-form-label">isAdmin: </label>
                            <select defaultValue="Admin Permission" className="editUser-form-input" name="isAdmin">
                                <option disabled value="Admin Permission">Admin Permission</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <div className="editUser-foot-buttons">
                            <button type="submit" className="editUser-submit-button">Update User</button>
                            <button type="button" className="editUser-back-link">
                                <Link to={"/all-users/"}>Back To All Users</Link>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}