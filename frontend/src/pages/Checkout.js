import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import './styles/Checkout.css';

import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// "react-country-region-selector" provides a pair of React components to display connected country and region dropdowns.
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
// A simple and reusable Datepicker component for React.
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useOrder } from '../context/OrderContext';

export default function Checkout() {

    const { getCart, cart } = useCart();
    const { createOrder, success, errors } = useOrder();
    const navigate = useNavigate();

    const userId = window.location.pathname.split('/')[2];

    useEffect(() => { getCart(userId) }, []);

    // Calculate the subtotal and shipping cost.
    let subtotal;
    let total;
    let shippingCost;
    if (cart) {
        subtotal = cart.reduce((total, product) => total + (product.product.price * product.quantity), 0);
        // shippingCost is hard coded just as example.
        (subtotal > 0) ? shippingCost = 10.50 : shippingCost = 0;
        total = subtotal + shippingCost;
    }

    // For the country and region dropdowns, and the expiration date.
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [startDate, setStartDate] = useState(new Date());

    // For the checkbox "Same as Customer".
    const [sameAsCustomer, setSameAsCustomer] = useState(false);

    // Handle the form submit.
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        let data = Object.fromEntries(formData);

        // Delete empty fields.
        for (let field in data) {
            if (data[field] === "") {
                delete data[field];
            }
        }

        // Transform the data to the correct type.
        if (data.zipcode) data.zipcode = Number(data.zipcode);
        if (data.cardNumber) data.cardNumber = Number(data.cardNumber);
        if (data.expirationDate) data.expirationDate = startDate.toISOString();
        if (data.cvc) data.cvc = Number(data.cvc);

        if (data.billingZipcode) data.billingZipcode = Number(data.billingZipcode);

        // Add the cost and checkbox to the data object.
        data = { ...data, sameAsCustomer, subtotal, shippingCost, total };

        // Create the order.
        createOrder(userId, data, cart);
    };

    // If the order is created successfully, redirect to Thanks page after 3 seconds.
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                navigate(`/thank-you/${userId}`);
            }, 3000);
            // Clear timeout if the component is unmounted.
            return () => clearTimeout(timer);
        }
    }, [success]);


    const { user } = useAuth();
    if (!user) {return <h1>Loading...</h1>}

    return (
        <>
            <Navbar />
            <div className="checkout-container">

                {/* CHECKOUT INFO */}
                <div className='checkout-info'>
                    <form onSubmit={handleSubmit} className='checkout-form'>

                        {/* CUSTOMER INFO */}
                        <h1>Customer Info</h1>
                        <div className="customer-info">
                            <div className="field">
                                <label>Name:</label>
                                <input className="checkout-input" type="text" name='name' defaultValue={user.name} />
                            </div>
                            <div className="field">
                                <label>Last Name:</label>
                                <input className="checkout-input" type="text" name='lastname' defaultValue={user.lastname} />
                            </div>
                            <div className="field">
                                <label>Email:</label>
                                <input className="checkout-input" type="email" name='email' defaultValue={user.email} />
                            </div>
                            <div className="field">
                                <label>Address:</label>
                                <input className="checkout-input" type="text" name='address' />
                            </div>
                            <div className="field">
                                <label>Country:</label>
                                <CountryDropdown
                                    name='country'
                                    value={country}
                                    onChange={(value) => setCountry(value)}
                                    className="checkout-input"
                                />
                            </div>
                            <div className="field">
                                <label>City:</label>
                                <RegionDropdown
                                    name='city'
                                    className="checkout-input"
                                    disableWhenEmpty={true}
                                    country={country}
                                    value={region}
                                    onChange={setRegion}
                                />
                            </div>
                            <div className="field">
                                <label>State:</label>
                                <input className="checkout-input" type="text" name='state' />
                            </div>
                            <div className="field">
                                <label>Zip Code:</label>
                                <input className="checkout-input" type="number" name='zipcode' />
                            </div>
                        </div>

                        {/* PAYMENT INFO */}
                        <h1>Payment Info</h1>
                        <div className="payment-info">
                            <div className="field">
                                <label>Credit Card Number:</label>
                                <input className="checkout-input" type="number" name='cardNumber' />
                            </div>
                            <div className="field">
                                <label>Expiration Date:</label>
                                <DatePicker
                                    name='expirationDate'
                                    className="checkout-input"
                                    selected={startDate}
                                    minDate={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    dateFormat="MM/yyyy"
                                    showMonthYearPicker
                                />
                            </div>
                            <div className="field">
                                <label>CVC:</label>
                                <input className="checkout-input" type="number" name='cvc' />
                            </div>
                        </div>

                        {/* BILLING ADRESS */}
                        <h1>Billing Adress</h1>
                        <span> Same as Customer: <input className="checkout-input" type="checkbox" onChange={(e) => setSameAsCustomer(e.target.checked)} /></span>
                        <div className="billing-address">
                            <div className="field">
                                <label>Billing Name:</label>
                                <input
                                    disabled={sameAsCustomer}
                                    className="checkout-input"
                                    type="text"
                                    name='billingName'
                                    defaultValue={`${user.name} ${user.lastname}`}
                                />
                            </div>
                            <div className="field">
                                <label>Address:</label>
                                <input className="checkout-input" type="text" name='billingAddress' disabled={sameAsCustomer} />
                            </div>
                            <div className="field">
                                <label>Country:</label>
                                <CountryDropdown
                                    name='billingCountry'
                                    value={country}
                                    onChange={(value) => setCountry(value)}
                                    className="checkout-input"
                                    disabled={sameAsCustomer}
                                />
                            </div>
                            <div className="field">
                                <label>State:</label>
                                <input className="checkout-input" type="text" name='billingState' disabled={sameAsCustomer} />
                            </div>
                            <div className="field">
                                <label>City:</label>
                                <RegionDropdown
                                    name='billingCity'
                                    className="checkout-input"
                                    disableWhenEmpty={true}
                                    country={country}
                                    value={region}
                                    onChange={setRegion}
                                    disabled={sameAsCustomer}
                                />
                            </div>
                            <div className="field">
                                <label>Zip Code:</label>
                                <input className="checkout-input" type="number" name='billingZipcode' disabled={sameAsCustomer} />
                            </div>
                        </div>

                        {/* Success */}
                        {success && success.map((message, index) => (
                            <p key={index} className="success">{message}</p>
                        ))}

                        {/* Errors */}
                        <div className="checkout-errors">
                            {errors && errors.map((message, index) => (
                                <p key={index} className="errors">{message}</p>
                            ))}
                        </div>

                        <div className="checkout-buttons">
                            <button className='checkout-button' type='submit'>CHECKOUT</button>
                            <Link className='cart-link' to={`/cart/${user._id}`}>Back To Cart</Link>
                        </div>
                    </form>
                </div>

                {/* CURRENT CART */}
                <div className='current-cart'>
                    <h1>CURRENT CART</h1>
                    <div className="current-cart-products">
                        {(cart && cart.length >= 1) && cart.map((product, index) => (
                            <React.Fragment key={index}>
                                <div className="current-cart-product" key={product.product._id}>
                                    <div className='current-cart-details'>
                                        <img className='current-cart-img' src={`${product.product.thumbnail}`} alt="" />
                                        <div className="current-cart-productInfo">
                                            <span>{product.product.title}</span>
                                            <span>{product.ram}</span>
                                            <span>{product.color}</span>
                                        </div>
                                    </div>
                                    <div className="current-cart-price">
                                        <span>{product.quantity}</span>
                                        <span><strong>${(product.product.price * product.quantity)}</strong></span>
                                    </div>
                                </div>
                                <hr className='hr' />
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="current-cart-shippingCost">
                        <span>Shipping Cost: </span>
                        <span>${shippingCost}</span>
                    </div>
                    <div className="current-cart-total">
                        <span>Total: </span>
                        <span>${subtotal + shippingCost}</span>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}