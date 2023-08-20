import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import './styles/Cart.css';
import { useCart } from '../context/CartContext';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Cart() {
    // We extract what we need from the context.
    const { cartProducts, productsNumber, getCart } = useCart();

    // Initialize some variables for later
    const userId = useLocation().pathname.split('/')[2];
    let subtotal = 0;
    let shippingCost = 0;
    
    // We call getCart with the userId.
    useEffect(() => {

        getCart(userId);

    }, [])

    // We calculate the subtotal by summing the products cost. 
    if (cartProducts) {
        // We use Array.from() so we can access arrays methods.
        subtotal = Array.from(cartProducts).reduce((total, product) => total + product.product.price, 0);
        shippingCost = 10.50;
    }


    return (
        <>
            <Navbar />

            <div className='cart-container'>

                <h1 className='cart-title'>YOUR SHOPPING CART</h1>

                <div className="cart-top">

                    <button className='top-button'>CONTINUE SHOPPING</button>

                    <div className='top-texts'>
                        <span className='top-text'>Shopping Cart ({productsNumber})</span>
                        <span className='top-text'>Your Wishlist (0)</span>
                    </div>

                    <button className='top-button'>CHECKOUT NOW</button>

                </div>

                {/* Body container */}
                <div className="cart-body">

                    {/* Product list container */}
                    <div className="product-list">
                        {/* 
                        We render the products only if "cartProducts" exists and 
                        we access its data to complete the info on the page 
                        */}
                        {cartProducts ? Array.from(cartProducts).map((product) => {
                            return (
                                <>
                                    <div className="product" key={product.product._id}>

                                        <div className='product-details'>

                                            <img className='info-img' src={`${product.product.thumbnail}`} alt="" />

                                            <div className='details'>
                                                <span className='name'><b>Product:</b> {product.product.title}</span>
                                                <span className='id'><b>ID:</b>{product.product._id}</span>
                                                <span className='ram'><b>RAM:</b> 500GB</span>
                                                <div className='color' />
                                            </div>
                                        </div>

                                        <div className="product-price">

                                            <div className="product-ammount">
                                                <div className="remove-icon flex-center"><RemoveIcon /></div>
                                                <span className="amount-num flex-center">{product.quantity}</span>
                                                <div className="add-icon flex-center"><AddIcon /></div>
                                            </div>

                                            <div className="price">${product.product.price}</div>
                                        </div>

                                    </div>
                                    <hr />
                                </>
                            );
                        }) : (
                            <div> No Producs in Cart</div>
                        )}

                    </div>

                    {/* Product Summary container */}
                    <div className="product-summary">

                        <h1 className='summary-title'>ORDER SUMMARY</h1>

                        <div className="summary-item">
                            <span className='summary-item-text'>Subtotal: </span>
                            <span className='summary-item-price'>
                                ${subtotal}
                            </span>
                        </div>

                        <div className="summary-item">
                            <span className='summary-item-text'>Shipping: </span>
                            <span className='summary-item-price'>${shippingCost}</span>
                        </div>

                        <div className="summary-item summary-total">
                            <span className='summary-item-totalText'>Total: </span>
                            <span className='summary-item-totalPrice'>${subtotal + shippingCost}</span>
                        </div>

                        <button className='summary-button'>BUY NOW</button>

                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}
