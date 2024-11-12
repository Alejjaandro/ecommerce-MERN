import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar.js';
import Footer from '../../components/Footer.js';
import { useAdmin } from '../../context/AdminContext.js';

import './styles/AllCarts.css';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.js';
import { useAuth } from '../../context/AuthContext.js';
import Modal from 'react-modal';
Modal.setAppElement('#root');


export default function AllCarts() {
    const { allCarts, getAllCarts, adminDeleteCart } = useAdmin();
    const { getCart } = useCart();
    const { user } = useAuth();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentCartId, setCurrentCartId] = useState(null);

    useEffect(() => { getAllCarts() }, []);

    const handleAdminDeleteCart = async (cartId) => {
        await adminDeleteCart(cartId);
        // If the user deletes his own cart, we update the cart.
        if (cartId === user._id) {
            console.log('Own cart deleted');
            getCart(user._id);
        }
    }

    // Function to display modal.
    const handleDelete = (cartId) => {
        setCurrentCartId(cartId);
        setModalIsOpen(true);
    }

    return (
        <>
            <Navbar />

            <div className="allCarts-container">
                <h1>All Carts</h1>

                <div className="allCarts-table-container">
                    <table className="allCarts-table">
                        <thead className="allCarts-table-head">
                            <tr>
                                <th>User ID</th>
                                <th>Items</th>
                                <th className='allCarts-products-quantity'>Quantity</th>
                                <th className='allCarts-products-color'>Color</th>
                                <th className='allCarts-products-ram'>RAM</th>
                                <th className='allCarts-products-price'>Price</th>
                                <th>Total Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="allCarts-table-body">
                            {(allCarts && allCarts.length > 0) ? allCarts.map((cart, index) =>
                            (
                                <tr key={index} className='allCarts-row'>
                                    <td>{cart._id}</td>
                                    <td>
                                        <div className='allCarts-row-td-container'>
                                            {cart.products.map((item, index) => (
                                                <p key={index}>{item.title}</p>
                                            ))}
                                        </div>
                                    </td>
                                    <td className='allCarts-products-quantity'>
                                        <div className='allCarts-row-td-container'>
                                            {cart.products.map((item, index) => (
                                                <p key={index}>{item.quantity}</p>
                                            ))}
                                        </div>
                                    </td>
                                    <td className='allCarts-products-color'>
                                        <div className='allCarts-row-td-container'>
                                            {cart.products.map((item, index) => (
                                                <p key={index}>{item.color}</p>
                                            ))}
                                        </div>
                                    </td>
                                    <td className='allCarts-products-ram'>
                                        <div className='allCarts-row-td-container'>
                                            {cart.products.map((item, index) => (
                                                <p key={index}>{item.ram}</p>
                                            ))}
                                        </div>
                                    </td>
                                    <td className='allCarts-products-price'>
                                        <div className='allCarts-row-td-container'>
                                            {cart.products.map((item, index) => (
                                                <p key={index}>${(item.price * item.quantity).toFixed(2)}</p>
                                            ))}
                                        </div>
                                    </td>
                                    <td className='allCarts-row-td allCarts-products-total'>
                                        ${cart.products.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                                    </td>
                                    <td className='allCarts-options'>
                                        <Link to={`/edit-cart/${cart._id}`} className="allCarts-link-edit">Edit</Link>
                                        <button className="allCarts-btn-remove" onClick={() => handleDelete(cart._id)}>Remove</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td className='noCarts' colSpan="8">No Carts</td>
                                </tr>
                            )}
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
                        <h2>Are you sure you want to delete "{currentCartId}" cart?</h2>
                        <div className="modal-buttons">
                            <button className='yes-button' onClick={async () => {
                                await handleAdminDeleteCart(currentCartId);
                                setModalIsOpen(false);
                            }}>Yes</button>
                            <button className='no-button' onClick={() => setModalIsOpen(false)}>No</button>
                        </div>
                    </div>
                </Modal>

            </div >
            <Footer />
        </>
    )
}
