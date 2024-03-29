import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import './styles/EditCart.css';

import React, { useEffect } from 'react'
import { useAdmin } from '../../context/AdminContext';
import { useAdminEditCart } from '../../context/AdminContextEditCart';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export default function EditCart() {
    const { user: currentUser } = useAuth();
    const { getCart } = useCart();

    const { user, adminGetUser } = useAdmin();

    const {
        userProductsNumber,
        userCart,
        getUserCart,
        adminAddToCart,
        adminDeleteProduct,
        adminDeleteCart } = useAdminEditCart();

    const userId = window.location.pathname.split("/")[2];

    useEffect(() => { getUserCart(userId); adminGetUser(userId) }, []);

    useEffect(() => {
        if (currentUser && user) {
            if (currentUser._id === user._id) {
                console.log('Own cart modified');
                getCart(user._id);
            }
        }
    }, [userProductsNumber]);

    let subtotal = 0;
    let shippingCost = 0;

    // We calculate the subtotal by summing the products cost.
    if (userCart) {
        subtotal = userCart.reduce((total, product) => total + (product.price * product.quantity), 0);
        // shippingCost is hard coded just as example.
        (subtotal > 0) ? shippingCost = 10.50 : shippingCost = 0;
    }

    const decreaseAmmount = (userId, product) => {
        if (product.quantity > 1) {
            product.quantity = - 1;
            adminAddToCart(userId, product);
        } else {
            adminDeleteProduct(userId, product);
        }
    }

    const increaseAmmount = (userId, product) => {
        product.quantity = 1;
        adminAddToCart(userId, product);
    }

    useEffect(() => {
        if (userCart && userCart.length < 1) {
            adminDeleteCart(userId);
        }
    }, [userCart]);

    return (
        <>
            <Navbar />

            <div className="editCart-container">

                <h1 className="editCart-title">Edit {user.username} Cart</h1>
                <div className="editCart-wrapper">
                    {/* Product list container */}
                    <div>
                        {(userCart && userProductsNumber >= 1) ? userCart.map((product, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <div key={product._id} className="editCart-product-container">

                                        <div className="editCart-imageContainer">

                                            <img className='editCart-infoImg' src={`../../${product.thumbnail}`} alt="" />

                                            <div className="editCart-details">
                                                <span className="editCart-id"><b>ID:</b> {product._id}</span>
                                                <span className="editCart-product"><b>Product:</b> {product.title}</span>
                                                <span className="editCart-ram"><b>RAM:</b> {product.ram}</span>
                                                <span className="editCart-color"><b>Color:</b> {product.color}</span>
                                            </div>
                                        </div>

                                        <div className="editCart-actions">

                                            <div className="editCart-quantityControl">
                                                <button onClick={() => decreaseAmmount(userId, product)} className="editCart-ammountIcon editCart-flexCenter">
                                                    <RemoveIcon />
                                                </button>

                                                <span className="editCart-quantity">{product.quantity}</span>

                                                <button onClick={() => increaseAmmount(userId, product)} className="editCart-ammountIcon editCart-flexCenter">
                                                    <AddIcon />
                                                </button>
                                            </div>

                                            <div className="editCart-price">${(product.price * product.quantity).toFixed(2)}</div>
                                            <button onClick={() => adminDeleteProduct(userId, product)} className='editCart-deleteButton'>
                                                Remove Product
                                            </button>
                                        </div>

                                    </div>
                                    <hr className="editCart-divider" />
                                </React.Fragment>
                            );
                        }) : (
                            <div className='noProducts'> No Producs in Cart</div>
                        )}
                    </div>

                    {/* Product Summary container */}
                    <div className="editCart-summaryContainer">

                        <h1 className="editCart-summaryTitle">ORDER SUMMARY</h1>

                        <div className="editCart-summaryItem">
                            <span className='editCart-summaryItemText'>Subtotal: </span>
                            <span className='editCart-summaryItemPrice'>
                                ${subtotal.toFixed(2)}
                            </span>
                        </div>

                        <div className="editCart-summaryItem">
                            <span className='editCart-summaryItemText'>Shipping: </span>
                            <span className='editCart-summaryItemPrice'>${shippingCost.toFixed(2)}</span>
                        </div>

                        <div className="editCart-summaryItem editCart-summaryTotal">
                            <span className='editCart-summaryItemTotalText'>Total: </span>
                            <span className='editCart-summaryItemTotalPrice'>${(subtotal + shippingCost).toFixed(2)}</span>
                        </div>
                        <button className='editCart-btnRemove'
                            onClick={() => { adminDeleteCart(userId) }}
                        >
                            DELETE CART
                        </button>
                    </div>
                </div>
            </div >

            <Footer />
        </>
    )
}