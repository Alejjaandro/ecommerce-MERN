import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import "./styles/AllOrders.css";

import { Link } from "react-router-dom";
import { format } from 'date-fns';
import { useEffect } from "react";
import { useAdmin } from "../../context/AdminContext";
import { useOrder } from "../../context/OrderContext";

export default function AllOrders() {

    const { allOrders, getAllOrders } = useAdmin();
    const { deleteOrder } = useOrder();

    useEffect(() => { getAllOrders() }, []);

    function formatDate(date) {
        const createdDate = format(new Date(date), "dd/MM/yyyy HH:mm:ss");
        return createdDate;
    }

    return (
        <>
            <Navbar />
            <div className="allOrders-container">
                <h1>All Products</h1>

                <div className="allOrders-table-container">
                    <table className="allOrders-table">
                        <thead className="allOrders-table-head">
                            <tr>
                                <th>Order ID</th>
                                <th>User</th>
                                <th>Email</th>
                                <th>Order Date</th>
                                <th>Country</th>
                                <th>Address</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="allOrders-table-body">
                            {allOrders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.orderInfo.name} {order.orderInfo.lastname}</td>
                                    <td>{order.orderInfo.email}</td>
                                    <td>{formatDate(order.createdAt)}</td>
                                    <td>{order.orderInfo.country}</td>
                                    <td>{order.orderInfo.address}, {order.orderInfo.zipcode}</td>
                                    <td className="allOrders-options">
                                        <Link to={`/order-details/${order._id}`} className="allOrders-link-details">Details</Link>
                                        <button className="allOrders-btn-remove" onClick={async () => {await deleteOrder(order._id); await getAllOrders()}}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    )
}