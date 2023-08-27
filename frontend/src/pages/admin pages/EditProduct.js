import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import AdminNavbar from '../../components/AdminNavbar';
import { useProducts } from '../../context/ProductsContext';

import './styles/EditProduct.css';

export default function EditProduct() {

    const { getProduct, product, updateProduct, success } = useProducts();

    const productId = window.location.pathname.split("/")[2];
    useEffect(() => { getProduct(productId) }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        // Petition to modify product data.
        await updateProduct(productId, data);
    };
    
    return (
        <>
            <AdminNavbar />

            <div className="edit-product-container">

                <div className="edit-product-wrapper">

                    <h1 className="product-title">Edit {product.title}</h1>
                    <img className="product-thumbnail" src={product.thumbnail} />

                    {/* Success */}
                    {success && (
                        <div className='success'>
                            <p>{success}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="product-form">
                        <div className="form-group">
                            <label className="form-label">Title: </label>
                            <input type="text" defaultValue={product.title} className="form-input" name='title' />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Price: </label>
                            <input type="number" defaultValue={product.price} className="form-input" name='price' />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Discount %: </label>
                            <input type="number" defaultValue={product.discountPercentage} className="form-input" name='discountPercentage' />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Category: </label>
                            <input type="text" defaultValue={product.category} className="form-input" name='category' />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Brand: </label>
                            <input type="text" defaultValue={product.brand} className="form-input" name='brand' />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Stock: </label>
                            <input type="number" defaultValue={product.stock} className="form-input" name='stock' />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Description: </label>
                            <textarea defaultValue={product.description} className="form-input" name='description' />
                        </div>
                        <button type="submit" className="submit-button">Update Product</button>
                    </form>
                </div>
            </div>

            <Footer />
        </>
    );
}