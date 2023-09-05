import Footer from '../../components/Footer';
import AdminNavbar from '../../components/AdminNavbar';
import { useAdmin } from '../../context/AdminContext';
import { Link } from 'react-router-dom';

import './styles/CreateProduct.css';

export default function CreateProduct() {

    const { createProduct, success, errors } = useAdmin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        // Removing empty fields and converting fields to numbers.
        for (let key in data) {
            if (data[key] === '') {
                delete data[key];
            } else
            if (!isNaN(data[key])) {
                data[key] = Number(data[key]);
            }
        }

        createProduct(data);
    };

    return (
        <>
            <AdminNavbar />

            <div className="create-product-container">

                <div className="create-product-wrapper">

                    <h1 className="newProduct-title">Create New Product</h1>

                    {/* Success */}
                    {success && (
                        <div className='success'>
                            <p>{success}</p>
                        </div>
                    )}
                    {/* Errors */}
                    {errors && (
                        <div className='errors'>
                            {errors.map((error) => (
                            <p>{error}</p>
                            ))}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="newProduct-form">
                        <div className="newProduct-form-group">
                            <label className="newProduct-form-label">Thumbnail Image: </label>
                            <input type="text" className="newProduct-form-input" name='thumbnail'/>
                            <span>
                                First you nedd to upload your picture to <Link to='https://imgbb.com/' target="_blank">ImgBB</Link>,
                                then copy the URL and paste it here.
                            </span>
                        </div>
                        <div className="newProduct-form-group">
                            <label className="newProduct-form-label">Title: </label>
                            <input type="text" className="newProduct-form-input" name='title'/>
                        </div>
                        <div className="newProduct-form-group">
                            <label className="newProduct-form-label">Price: </label>
                            <input type="number" step="any" className="newProduct-form-input" name='price'/>
                        </div>
                        <div className="newProduct-form-group">
                            <label className="newProduct-form-label">Discount %: </label>
                            <input type="number" className="newProduct-form-input" name='discountPercentage'/>
                        </div>
                        <div className="newProduct-form-group">
                            <label className="newProduct-form-label">Category: </label>
                            <input type="text" className="newProduct-form-input" name='category'/>
                        </div>
                        <div className="newProduct-form-group">
                            <label className="newProduct-form-label">Brand: </label>
                            <input type="text" className="newProduct-form-input" name='brand'/>
                        </div>
                        <div className="newProduct-form-group">
                            <label className="newProduct-form-label">Stock: </label>
                            <input type="number" className="newProduct-form-input" name='stock'/>
                        </div>
                        <div className="newProduct-form-group">
                            <label className="newProduct-form-label">Description: </label>
                            <textarea className="newProduct-form-input" name='description'/>
                        </div>
                        <button type="submit" className="newProduct-submit-button">Create Product</button>
                    </form>
                </div>
            </div>

            <Footer />
        </>
    )
}