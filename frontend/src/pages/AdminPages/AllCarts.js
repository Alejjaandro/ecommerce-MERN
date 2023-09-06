import { useEffect } from 'react';
import AdminNav from '../../components/AdminNavbar.js';
import Footer from '../../components/Footer.js';
import { useAdmin } from '../../context/AdminContext.js';

import './styles/AllCarts.css';
import { Link } from 'react-router-dom';

export default function AllCarts() {
    const { allCarts, getAllCarts, adminDeleteCart } = useAdmin();

    useEffect(() => { getAllCarts() }, []);

    return (
        <>
            <AdminNav />

            <div className="allCarts-container">
                <h1>All Carts</h1>

                <div className="allCarts-table-container">
                    <table className="allCarts-table">
                        <thead className="allCarts-table-head">
                            <tr>
                                <th>User ID</th>
                                <th>Items</th>
                                <th>Quantity</th>
                                <th className='allCarts-products-color'>Color</th>
                                <th className='allCarts-products-ram'>RAM</th>
                                <th>Price</th>
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
                                            {cart.products.map(item => (
                                                <p>{item.product.title}</p>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        <div className='allCarts-row-td-container'>
                                            {cart.products.map(item => (
                                                <p>{item.quantity}</p>
                                            ))}
                                        </div>
                                    </td>
                                    <td className='allCarts-products-color'>
                                        <div className='allCarts-row-td-container'>
                                            {cart.products.map(item => (
                                                <p>{item.color}</p>
                                            ))}
                                        </div>
                                    </td>
                                    <td className='allCarts-products-ram'>
                                        <div className='allCarts-row-td-container'>
                                            {cart.products.map(item => (
                                                <p>{item.ram}</p>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        <div className='allCarts-row-td-container'>
                                            {cart.products.map(item => (
                                                <p>${item.product.price * item.quantity}</p>
                                            ))}
                                        </div>
                                    </td>
                                    <td className='allCarts-row-td allCarts-products-total'>
                                        ${cart.products.reduce((total, item) => total + (item.product.price * item.quantity), 0)}
                                    </td>
                                    <td className='allCarts-options'>
                                        <Link to={`/edit-cart/${cart._id}`} className="allCarts-link-edit">Edit</Link>
                                        <button className="allCarts-btn-remove" onClick={() => adminDeleteCart(cart._id)}>Remove</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td className='noCarts' colspan="8">No Carts</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div >
            <Footer />
        </>
    )
}
