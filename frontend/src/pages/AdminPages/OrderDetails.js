import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import "./styles/OrderDetails.css";

import { format } from 'date-fns';
import { useEffect } from "react";
import { useOrder } from "../../context/OrderContext";

export default function OrderDetails() {

    const { getOrder, order } = useOrder();

    const orderId = window.location.pathname.split('/')[2];
    useEffect(() => { getOrder(orderId) }, []);

    function formatDate(date) {
        const createdDate = format(new Date(date), "dd/MM/yyyy HH:mm:ss");
        return createdDate;
    }

    console.log(order);

    return (
        <>
            <Navbar />
            {order && (
                <div className="orderDetails-container">
                    <h1>Order - {order._id}</h1>
                    <div className="orderDetails-user-info">
                        <div>
                            <h3>User details</h3>
                            <p><strong>Ordered by:</strong> {order.orderInfo.name} {order.orderInfo.lastname}</p>
                            <p><strong>Email:</strong> {order.orderInfo.email}</p>
                            <p><strong>Country:</strong> {order.orderInfo.country}</p>
                            <p><strong>City:</strong> {order.orderInfo.city}</p>
                            <p><strong>Address:</strong> {order.orderInfo.address}, {order.orderInfo.zipcode}</p>
                        </div>
                        <div>
                            <h3>Order details</h3>
                            <p><strong>Order date:</strong> {formatDate(order.createdAt)}</p>
                            <p><strong>Payment method:</strong> Credit Card</p>
                            <p><strong>Card Numer:</strong> {order.orderInfo.cardNumber}</p>
                            <p><strong>Order status:</strong> {order.status}</p>
                        </div>
                    </div>
                    <div className="orderDetails-products">
                        <h3>Products</h3>
                        <div className="orderDetails-products-wrapper">
                            {order.products.map(product => (
                                <div className="orderDetails-product" key={product._id}>
                                    <img src={product.thumbnail} />
                                    <div>
                                        <p><strong>Title:</strong> {product.title}</p>
                                        <p><strong>Price:</strong> ${product.price}</p>
                                        <p><strong>Quantity:</strong> {product.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="orderDetails-summary">
                        <h3>Order summary</h3>
                        <p><strong>Subtotal:</strong> ${order.orderInfo.subtotal}</p>
                        <p><strong>Shipping:</strong> ${order.orderInfo.shippingCost}</p>
                        <p><strong>Total:</strong> ${order.orderInfo.total}</p>
                    </div>
                </div>
            )}
            <Footer />
        </>
    )
}