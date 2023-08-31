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

                <table className="carts-table">
                    <thead className="carts-table-head">
                        <tr>
                            <th>User ID</th>
                            <th>Items</th>
                            <th>Quantity</th>
                            <th>Color</th>
                            <th>RAM</th>
                            <th>Price</th>
                            <th>Total Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="carts-table-body">
                        {(allCarts && allCarts.length > 0) ? allCarts.map((cart, index) =>
                        (
                            <tr key={index} className='cart-row'>
                                <td>{cart._id}</td>
                                <td>
                                    {cart.products.map(item => (
                                        <p>{item.product.title}</p>
                                    ))}
                                </td>
                                <td>
                                    {cart.products.map(item => (
                                        <p>{item.quantity}</p>
                                    ))}
                                </td>
                                <td className='products-info'>
                                    {cart.products.map(item => (
                                        <p>{item.color}</p>
                                    ))}
                                </td>
                                <td className='products-info'>
                                    {cart.products.map(item => (
                                        <p>{item.ram}</p>
                                    ))}
                                </td>
                                <td>
                                    {cart.products.map(item => (
                                        <p>${item.product.price * item.quantity}</p>
                                    ))}
                                </td>
                                <td className='products-total'>
                                    ${cart.products.reduce((total, item) => total + (item.product.price * item.quantity), 0)}
                                </td>
                                <td>
                                    <button className="btn-edit"><Link to={`/edit-cart/${cart._id}`}>Edit</Link></button>
                                    <button className="btn-remove" onClick={() => adminDeleteCart(cart._id)}>Remove</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td className='noCarts' colspan="8">No Carts</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div >
            <Footer />
        </>
    )
}
