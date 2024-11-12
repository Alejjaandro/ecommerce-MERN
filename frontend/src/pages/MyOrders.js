import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import './styles/MyOrders.css';

import { format } from 'date-fns';
import { useOrder } from '../context/OrderContext';
import { useEffect } from 'react';

export default function MyOrders() {

    const { getUserOrders, orders } = useOrder();
    const userId = window.location.pathname.split('/')[2];

    useEffect(() => { getUserOrders(userId) }, []);

    // Function to format the date.
    function formatDate(date) {
        const createdDate = format(new Date(date), "dd/MM/yyyy HH:mm:ss");
        return createdDate;
    }

    return (
        <>
            <Navbar />
            <div className='myOrders-container'>
                <h1>My Orders</h1>
                <div className='myOrders'>
                    {(orders && orders.length > 0) ? orders.map(order => (
                        <div className='myOrder' key={order._id}>
                            <div className="myOrder-info-container">
                                <div className="myOrder-info">
                                    <h1><strong>Order Id:</strong> {order._id}</h1>
                                    <p><strong>Created:</strong> {formatDate(order.createdAt)}</p>
                                    <p><strong>Order Status:</strong> {order.status}</p>
                                </div>
                                <div className='myOrder-address'>
                                    <p><strong>Name:</strong> {order.orderInfo.name} {order.orderInfo.lastname}</p>
                                    <p><strong>Country:</strong> {order.orderInfo.country}</p>
                                    <p><strong>City:</strong> {order.orderInfo.city}</p>
                                    <p><strong>Adress:</strong> {order.orderInfo.address}, {order.orderInfo.zipcode}</p>
                                </div>
                            </div>
                            <div className='myOrder-product'>
                                {order.products.map((product, index) => (
                                    <div className='myOrder-product-info' key={index}>
                                        <img src={`../../${product.thumbnail}`} alt=''/>
                                        <span>Quantity: {product.quantity}</span>
                                        <span>{product.title}</span>
                                    </div>
                                ))}
                            </div>
                            <h1><strong>Total:</strong> ${order.orderInfo.total}</h1>
                        </div>
                    )) : <h3>You don't have any orders yet.</h3>}
                </div>
            </div>
            <Footer />
        </>
    )
}
