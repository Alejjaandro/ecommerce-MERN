import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import AdminNavbar from '../../components/AdminNavbar';
import { useAdmin } from '../../context/AdminContext';

import './styles/EditProduct.css';

export default function EditUser() {

    const { adminGetUser, user, setUser, adminUpdateUser, success, errors } = useAdmin();

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

        // Petition to modify user data.
        await adminUpdateUser(userId, data);
    };

    return (
        <>
            <AdminNavbar />

            <div className="edit-product-container">

                <div className="edit-product-wrapper">

                    <h1 className="product-title">Edit {user.username}</h1>
                    <img className="user-image" src={user.image} />

                    {errors && errors.map((message, index) => (
                        <p key={index} className="errors">{message}</p>
                    ))}
                    {success && success.map((message, index) => (
                        <p key={index} className="success">{message}</p>
                    ))}

                    <form onSubmit={handleSubmit} className="product-form">
                        <div className="form-group">
                            <label className="form-label">Name: </label>
                            <input type="text" defaultValue={user.name} className="form-input" name='name' />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Lastname: </label>
                            <input type="text" defaultValue={user.lastname} className="form-input" name='lastname' />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Username: </label>
                            <input type="text" defaultValue={user.username} className="form-input" name='username' />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email: </label>
                            <input type="text" defaultValue={user.email} className="form-input" name='email' />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Password: </label>
                            <input type="text" className="form-input" name='password' />
                        </div>
                        <div className="form-group">
                            <label className="form-label">isAdmin: </label>
                            <input type="text" defaultValue={user.isAdmin} className="form-input" name='isAdmin' />
                        </div>
                        <button type="submit" className="submit-button">Update User</button>
                    </form>
                </div>
            </div>

            <Footer />
        </>
    );
}