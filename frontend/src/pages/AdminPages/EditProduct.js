import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductsContext';
import { useAdmin } from '../../context/AdminContext';

import './styles/EditProduct.css';

export default function EditProduct() {

    const { getProduct, product } = useProducts();
    const { updateProduct, success, errors } = useAdmin();

    const productId = window.location.pathname.split("/")[2];
    useEffect(() => { getProduct(productId) }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        // We delete the empty fields.
        for (let field in data) {
            if (data[field] === "") {
                delete data[field];
            }
        }

        // Transform the data to the correct type.
        if (data.price) data.price = Number(data.price);
        if (data.discountPercentage) data.discountPercentage = Number(data.discountPercentage);
        if (data.stock) data.stock = Number(data.stock);

        // Petition to modify product data.
        await updateProduct(productId, data);
    };

    console.log(errors);
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

                    <form onSubmit={handleSubmit} className="editProduct-form">
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