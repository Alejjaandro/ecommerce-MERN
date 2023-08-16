import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import './styles/Cart.css';
import { useCart } from '../context/CartContext';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Cart() {

    const { cartProducts, productsNumber, getCart } = useCart();


    const userId = useLocation().pathname.split('/')[2];

    useEffect(() => {

        getCart(userId);

    }, [productsNumber])
    
    console.log(productsNumber, cartProducts);

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

                        {/* Product 1 */}
                        <div className="product">

                            {/* Product details container*/}
                            <div className='product-details'>

                                <img className='info-img' src="https://i.ibb.co/HTvVjvW/Laptop-2.webp" alt="" />

                                <div className='details'>
                                    <span className='name'><b>Product:</b> ACER LAPTOP</span>
                                    <span className='id'><b>ID:</b> 3452335346</span>
                                    <span className='ram'><b>RAM:</b> 500GB</span>
                                    <div className='color' />
                                </div>
                            </div>

                            {/* Product price container*/}
                            <div className="product-price">

                                <div className="product-ammount">
                                    <div className="remove-icon flex-center"><RemoveIcon /></div>
                                    <span className="amount-num flex-center">1</span>
                                    <div className="add-icon flex-center"><AddIcon /></div>
                                </div>

                                <div className="price">$750</div>
                            </div>

                        </div>
                        
                        <hr className='hr'/>
                        {/* Product 2 */}
                        <div className="product">

                            {/* Product details container*/}
                            <div className='product-details'>

                                <img className='info-img' src="https://i.ibb.co/0JYbtGt/TV-2.jpg" alt="" />

                                <div className='details'>
                                    <span className='name'><b>Product:</b> XIAOMI TV</span>
                                    <span className='id'><b>ID:</b> 98242353</span>
                                    <div className='color' />
                                </div>
                            </div>

                            {/* Product price container*/}
                            <div className="product-price">

                                <div className="product-ammount">
                                    <div className="ammount-icon flex-center"><RemoveIcon /></div>
                                    <span className="amount-num flex-center">1</span>
                                    <div className="ammount-icon flex-center"><AddIcon /></div>
                                </div>

                                <div className="price">$1.500</div>
                            </div>

                        </div>

                    </div>

                    {/* Product Summary container */}
                    <div className="product-summary">

                        <h1 className='summary-title'>ORDER SUMMARY</h1>

                        <div className="summary-item">
                            <span className='summary-item-text'>Subtotal: </span>
                            <span className='summary-item-price'>$3.500</span>
                        </div>

                        <div className="summary-item">
                            <span className='summary-item-text'>Shipping: </span>
                            <span className='summary-item-price'>$10.50</span>
                        </div>

                        <div className="summary-item summary-total">
                            <span className='summary-item-totalText'>Total: </span>
                            <span className='summary-item-totalPrice'>$3.510.50</span>
                        </div>

                        <button className='summary-button'>BUY NOW</button>
                    </div>
                </div>

            </div>

            <Footer />
        </>
    )
}
