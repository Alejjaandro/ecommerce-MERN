import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import './styles/Cart.css';
import { useCart } from '../context/CartContext';

import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Cart() {

    const userId = window.location.pathname.split('/')[2];

    // We extract what we need from the context.
    const { getCart, cart, productsNumber, deleteProduct, deleteCart, addToCart } = useCart();

    useEffect(() => { getCart(userId) }, []);

    useEffect(() => {
        if (cart && cart.length < 1) {
            deleteCart(userId);
        }
    }, [cart]);

    // Initialize some variables for later
    let subtotal = 0;
    let shippingCost = 0;

    // We calculate the subtotal by summing the products cost.
    if (cart) {
        subtotal = cart.reduce((total, product) => total + (product.price * product.quantity), 0);
        // shippingCost is hard coded just as example.
        (subtotal > 0) ? shippingCost = 10.50 : shippingCost = 0;
    }

    // Function to decrease product ammount and delete it if its quantity is 1.  
    const decreaseAmmount = (userId, product) => {
        if (product.quantity > 1) {
            product.quantity = - 1;
            addToCart(userId, product);
        } else {
            deleteProduct(userId, product);
        }
    }
    // Function to increase product ammount.  
    const increaseAmmount = (userId, product) => {
        product.quantity = 1;
        addToCart(userId, product);
    }

    return (
        <>
            <Navbar />

            <div className='cart-container'>

                <h1 className='cart-title'>YOUR SHOPPING CART</h1>

                <div className="cart-top">

                    <Link to='/products'><button className='cart-top-button'>CONTINUE SHOPPING</button></Link>

                    <span className='cart-top-texts'>Shopping Cart ({productsNumber})</span>
                    <Link to={`/checkout/${userId}`}><button className='cart-top-button'>CHECKOUT NOW</button></Link>
                </div>

                {/* Body container */}
                <div className="cart-body">

                    {/* Product list container */}
                    <div className="cart-product-list">
                        {/* 
                        We render the products only if "cart" exists and it has at least 1 product,
                        then we access its data to complete the info on the page.
                        */}
                        {(cart && productsNumber >= 1) ? cart.map((product, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <div className="cart-product" key={product._id}>

                                        <div className='cart-product-details'>

                                            <img className='cart-info-img' src={`${product.thumbnail}`} alt="" />

                                            <div className='cart-details'>
                                                <span className='id'>
                                                    <b>ID:</b>
                                                    <Link to={`/product/${product._id}`}>{product._id}</Link>
                                                </span>
                                                <span className='name'><b>Product:</b> {product.title}</span>
                                                <span className='ram'><b>RAM: </b>{product.ram}</span>
                                                <span className='color'><b>Color: </b>{product.color}</span>
                                            </div>
                                        </div>

                                        <div className="cart-product-price">

                                            <div className="cart-product-ammount">
                                                <button onClick={() => decreaseAmmount(userId, product)} className="cart-ammount-icon flex-center">
                                                    <RemoveIcon />
                                                </button>

                                                <span className="cart-amount-num flex-center">{product.quantity}</span>

                                                <button onClick={() => increaseAmmount(userId, product)} className="cart-ammount-icon flex-center">
                                                    <AddIcon />
                                                </button>
                                            </div>

                                            <div className="cart-price">${(product.price * product.quantity).toFixed(2)}</div>
                                            <button onClick={() => deleteProduct(userId, product)} className='delete-button'>
                                                Remove Product
                                            </button>
                                        </div>

                                    </div>
                                </React.Fragment>
                            );
                        }) : (
                            <div> No Producs in Cart</div>
                        )}

                    </div>

                    {/* Product Summary container */}
                    <div className="cart-product-summary">

                        <h1 className='cart-summary-title'>ORDER SUMMARY</h1>

                        <div className="cart-summary-item">
                            <span className='cart-summary-item-text'>Subtotal: </span>
                            <span className='cart-summary-item-price'>
                                ${subtotal.toFixed(2)}
                            </span>
                        </div>

                        <div className="cart-summary-item">
                            <span className='cart-summary-item-text'>Shipping: </span>
                            <span className='cart-summary-item-price'>${shippingCost.toFixed(2)}</span>
                        </div>

                        <div className="cart-summary-item summary-total">
                            <span className='cart-summary-item-totalText'>Total: </span>
                            <span className='cart-summary-item-totalPrice'>${(subtotal + shippingCost).toFixed(2)}</span>
                        </div>

                        <Link to={`/checkout/${userId}`}>
                            <button className='cart-summary-button'>BUY NOW</button>
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}