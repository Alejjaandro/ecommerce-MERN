import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { useAdmin } from '../../context/AdminContext';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../api/axios.js';

import './styles/CreateProduct.css';

export default function CreateProduct() {

    const { createProduct, success, errors, setErrors } = useAdmin();
    const [formElement, setFormElement] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Check if there is a file
        if (!e.target.elements.thumbnail.files || e.target.elements.thumbnail.files.length === 0) {
            console.log('No file detected');
            return setErrors(['No file detected']);
        } else {
            // Create a new FormData object for the image
            const imageFormData = new FormData();
            imageFormData.append('thumbnail', e.target.elements.thumbnail.files[0]);

            // Send the image to the server
            const response = await axios.post('/products/saveProdImage', imageFormData);
            const fileName = response.data.fileName;

            // Add the image URL to the form data
            data.thumbnail = `http://localhost:8000/productImages/${fileName}`;
        }

        // Removing empty fields and converting fields to numbers.
        for (let key in data) {
            if (data[key] === '') {
                delete data[key];
            } else if (!isNaN(data[key])) {
                data[key] = Number(data[key]);
            }
        }

        console.log(data);
        await createProduct(data);
    };

    // Timer to empty form fields when finished.
    useEffect(() => {
        if (success && formElement) {
            setTimeout(() => {
                formElement.reset();
                setFormElement(null);
            }, 3000);
        }
    }, [success, formElement]);

    return (
        <>
            <Navbar />

            <div className="create-product-container">

                <div className="create-product-wrapper">

                    <h1 className="newProduct-title">Create New Product</h1>

                    {/* Errors */}
                    {errors && (
                        <div className='newProduct-errors'>
                            {errors.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="newProduct-form" encType="multipart/form-data">
                        <div className="newProduct-form-group">
                            <label className="newProduct-form-label">Thumbnail Image: </label>
                            <input type="file" className="newProduct-form-input" name='thumbnail' />
                        </div>
                        <div className="newProduct-form-group">
                            <label className="newProduct-form-label">Title: </label>
                            <input type="text" className="newProduct-form-input" name='title' required />
                        </div>
                        <div className="newProduct-form-group">
                            <label className="newProduct-form-label">Price: </label>
                            <input type="number" step="any" className="newProduct-form-input" name='price' required />
                        </div>
                        <div className="newProduct-form-group">
                            <label className="newProduct-form-label">Discount %: </label>
                            <input type="number" max={100} step={0.01} className="newProduct-form-input" name='discountPercentage' />
                        </div>
                        <div className="newProduct-form-group">
                            <label className="newProduct-form-label">Category: </label>
                            <input type="text" className="newProduct-form-input" name='category' required />
                        </div>
                        <div className="newProduct-form-group">
                            <label className="newProduct-form-label">Brand: </label>
                            <input type="text" className="newProduct-form-input" name='brand' required />
                        </div>
                        <div className="newProduct-form-group">
                            <label className="newProduct-form-label">Stock: </label>
                            <input type="number" className="newProduct-form-input" name='stock' required />
                        </div>
                        <div className="newProduct-form-group">
                            <label className="newProduct-form-label">Description: </label>
                            <textarea className="newProduct-form-input" name='description' />
                        </div>

                        {/* Success */}
                        {success && (
                            <div className='newProduct-success'>
                                <p>{success}</p>
                            </div>
                        )}

                        <div className="newProduct-foot-buttons">
                            <button type="submit" className="newProduct-submit-button">Create Product</button>
                            <button type="button" className="newProduct-allProducts-button">
                                <Link to='/all-products'>To All Products</Link>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </>
    )
}