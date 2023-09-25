import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import "./styles/AllOrders.css";

import { Link } from "react-router-dom";
import { format } from 'date-fns';
import { useEffect, useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import Modal from 'react-modal';
Modal.setAppElement('#root');


export default function AllOrders() {

    const { allOrders, getAllOrders, deleteOrder } = useAdmin();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentOrderId, setCurrentOrderId] = useState(null);
    const [currentOrderName, setCurrentOrderName] = useState(null);


    useEffect(() => { getAllOrders() }, []);

    function formatDate(date) {
        const createdDate = format(new Date(date), "dd/MM/yyyy HH:mm:ss");
        return createdDate;
    }

    // Function to display modal.
    const handleDelete = (orderId, userName) => {
        setCurrentOrderId(orderId);
        setCurrentOrderName(userName);
        setModalIsOpen(true);
    }

    return (
        <>
            <Navbar />
            <div className="allOrders-container">
                <h1>All Orders</h1>

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
                                        <button className="allOrders-btn-remove" onClick={() => { handleDelete(order._id, order.orderInfo.name) }}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Modal
                    className="modal-container"
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    contentLabel="Delete Account Confirmation"
                >
                    <div className="modal">
                        <h2>Are you sure you want to delete "{currentOrderName}" Order?</h2>
                        <div className="modal-buttons">
                            <button className='yes-button' onClick={async () => {
                                await deleteOrder(currentOrderId);
                                setModalIsOpen(false);
                            }}>Yes</button>
                            <button className='no-button' onClick={() => setModalIsOpen(false)}>No</button>
                        </div>
                    </div>
                </Modal>

            </div>
            <Footer />
        </>
    )
}