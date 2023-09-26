import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductsContext';
import { useAdmin } from '../../context/AdminContext';
import axios from '../../api/axios.js';

import './styles/EditProduct.css';

export default function EditProduct() {

    const { getProduct, product } = useProducts();
    const { updateProduct, success, errors } = useAdmin();
    const [loading, setLoading] = useState(true);

    const productId = window.location.pathname.split("/")[2];
    /*
    When we edit a product and change to another, it still has
    the info of the prev. product when it first renders.
    This way we make sure that it wait until it has the current prod info.
    */
    useEffect(() => {
        const fetchProduct = async () => {
            await getProduct(productId);
            setLoading(false);
        };
        fetchProduct();
    }, [productId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        // Check if there is a file
        if (e.target.elements.thumbnail.files && e.target.elements.thumbnail.files.length > 0) {

            // Create a new FormData object for the image
            const imageFormData = new FormData();
            imageFormData.append('thumbnail', e.target.elements.thumbnail.files[0]);

            // Send the image to the server
            const response = await axios.post('/products/saveProdImage', imageFormData);
            const fileName = response.data.fileName;

            // Add the image URL to the form data
            data.thumbnail = `http://localhost:8000/productImages/${fileName}`;
        } else {
            // If no file, use the previous URL.
            data.thumbnail = product.thumbnail;
        }

        // Removing empty fields and converting fields to numbers.
        for (let key in data) {
            if (data[key] === '') {
                delete data[key];
            } else if (!isNaN(data[key])) {
                data[key] = Number(data[key]);
            }
        }

        // Petition to modify product data.
        await updateProduct(productId, data);
        getProduct(productId);
    };

    if (loading) return <div>Loading...</div>

    return (
        <>
            <Navbar />

            <div className="editProduct-container">

                <div className="editProduct-wrapper">

                    <h1 className="editProduct-title">Edit {product.title}</h1>
                    <img className="editProduct-thumbnail" src={product.thumbnail} />

                    {/* Errors */}
                    <div className='editProduct-errors'>
                        {errors && errors.map((message, index) => (
                            <p key={index}>{message}</p>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="editProduct-form" encType="multipart/form-data">
                        <div className="editProduct-form-group">
                            <label className="editProduct-form-label">Thumbnail Image: </label>
                            <input type="file" className="editProduct-form-input" name='thumbnail' />
                        </div>

                        <div className="editProduct-form-group">
                            <label className="editProduct-form-label">Title: </label>
                            <input type="text" defaultValue={product.title} className="editProduct-form-input" name='title' />
                        </div>
                        <div className="editProduct-form-group">
                            <label className="editProduct-form-label">Price: </label>
                            <input type="number" step="0.01" defaultValue={product.price} className="editProduct-form-input" name='price' />
                        </div>
                        <div className="editProduct-form-group">
                            <label className="editProduct-form-label">Discount %: </label>
                            <input type="number" step="0.01" defaultValue={product.discountPercentage} className="editProduct-form-input" name='discountPercentage' />
                        </div>
                        <div className="editProduct-form-group">
                            <label className="editProduct-form-label">Category: </label>
                            <input type="text" defaultValue={product.category} className="editProduct-form-input" name='category' />
                        </div>
                        <div className="editProduct-form-group">
                            <label className="editProduct-form-label">Brand: </label>
                            <input type="text" defaultValue={product.brand} className="editProduct-form-input" name='brand' />
                        </div>
                        <div className="editProduct-form-group">
                            <label className="editProduct-form-label">Stock: </label>
                            <input type="number" defaultValue={product.stock} className="editProduct-form-input" name='stock' />
                        </div>
                        <div className="editProduct-form-group">
                            <label className="editProduct-form-label">Description: </label>
                            <textarea defaultValue={product.description} className="editProduct-form-input" name='description' />
                        </div>

                        {/* Success */}
                        {success && (
                            <div className='editProduct-success'>
                                <p>{success}</p>
                            </div>
                        )}

                        <div className="editProduct-foot-buttons">
                            <button type="submit" className="editProduct-submit-button">Update Product</button>
                            <button type="button" className="editProduct-back-link">
                                <Link to={'/all-products/'}>Back To All Products</Link>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}