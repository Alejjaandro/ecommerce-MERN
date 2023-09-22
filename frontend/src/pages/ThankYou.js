import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';

import './styles/ThankYou.css';

export default function ThankYou() {

    const { deleteCart } = useCart();
    const { getUserOrders, orders } = useOrder();
    const navigate = useNavigate();

    const userId = window.location.pathname.split('/')[2];

    useEffect(() => {
        getUserOrders(userId);
        deleteCart(userId);
    }, []);
    
    const lastOrder = orders[orders.length - 1];

    // Function to format the date.
    function formatDate(date) {
        const createdDate = format(new Date(date), "dd/MM/yyyy HH:mm:ss");
        return createdDate;
    }

    return (
        <>
            <Navbar />
            <div className='thankYou-container'>
                <div className='thankYou-wrapper'>
                    <h1>Thank you for your purchase!</h1>
                    {lastOrder && (
                        <>
                            <div className='thankYou-order-details'>
                                <p>Order number: {lastOrder._id}</p>
                                <p>Order date: {formatDate(lastOrder.createdAt)}</p>
                                <div className='thankYou-order-details-userInfo'>
                                    <p>User: {lastOrder.orderInfo.name} {lastOrder.orderInfo.lastname}</p>
                                    <p>Email: {lastOrder.orderInfo.email}</p>
                                    <p>Country: {lastOrder.orderInfo.country} - {lastOrder.orderInfo.city}</p>
                                    <p>Address: {lastOrder.orderInfo.address}</p>
                                </div>
                            </div>
                            <div className='thankYou-order-products'>
                                {lastOrder.products.map((product) => (
                                    <div className='thankYou-order-product' key={product._id}>
                                        <img src={product.thumbnail} />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    <button className='thankYou-button' onClick={() => navigate('/')}>Go back to Home</button>
                </div>
            </div>
            <Footer />
        </>
    )
}
