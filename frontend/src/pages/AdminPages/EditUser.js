import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import AdminNavbar from '../../components/AdminNavbar';
import { useAdmin } from '../../context/AdminContext';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';

import './styles/EditUser.css';

export default function EditUser() {

    const { adminGetUser, user, setUser, adminUpdateUser, success, errors } = useAdmin();
    const { getUser } = useUser();
    const {user: currentAdmin} = useAuth();

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

        if (data.password === '') { delete data.password; }

        // Petitions to modify user data.
        // If the admin is modifying his own data, we need to update the user state.
        if (user._id === currentAdmin._id) {
            await adminUpdateUser(currentAdmin._id, data);
            await getUser(currentAdmin._id);
        } else {
            await adminUpdateUser(userId, data);
        }
    };

    return (
        <>
            <AdminNavbar />

            <div className="editUser-container">

                <div className="editUser-wrapper">

                    <h1 className="editUser-title">Edit {user.username}</h1>
                    <div class="editUser-image"><img src={user.image} /></div>

                    {errors && errors.map((message, index) => (
                        <p key={index} className="editUser-errors">{message}</p>
                    ))}
                    {success && success.map((message, index) => (
                        <p key={index} className="editUser-success">{message}</p>
                    ))}

                    <form onSubmit={handleSubmit} className="editUser-form">
                        <div className="editUser-form-group">
                            <label className="editUser-form-label">Name: </label>
                            <input type="text" defaultValue={user.name} className="editUser-form-input" name='name' />
                        </div>
                        <div className="editUser-form-group">
                            <label className="editUser-form-label">Lastname: </label>
                            <input type="text" defaultValue={user.lastname} className="editUser-form-input" name='lastname' />
                        </div>
                        <div className="editUser-form-group">
                            <label className="editUser-form-label">Username: </label>
                            <input type="text" defaultValue={user.username} className="editUser-form-input" name='username' />
                        </div>
                        <div className="editUser-form-group">
                            <label className="editUser-form-label">Email: </label>
                            <input type="text" defaultValue={user.email} className="editUser-form-input" name='email' />
                        </div>
                        <div className="editUser-form-group">
                            <label className="editUser-form-label">Password: </label>
                            <input type="text" className="editUser-form-input" name='password' />
                        </div>
                        <div className="editUser-form-group">
                            <label className="editUser-form-label">isAdmin: </label>
                            <input type="text" defaultValue={user.isAdmin} className="editUser-form-input" name='isAdmin' />
                        </div>
                        <button type="submit" className="editUser-submit-button">Update User</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}