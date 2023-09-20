import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import './styles/EditCart.css';

import { useEffect } from 'react'
import { useCart } from '../../context/CartContext';
import { useAdmin } from '../../context/AdminContext';

export default function EditCart() {

    const { getCart, cart, deleteProduct, addToCart, deleteCart } = useCart();
    const { adminGetUser, user, adminDeleteCart } = useAdmin();

    const userId = window.location.pathname.split("/")[2];

    useEffect(() => { getCart(userId); adminGetUser(userId) }, []);

    let subtotal;
    let shippingCost;
    let quantity;

    // We calculate the subtotal by summing the products cost.
    if (cart) {
        subtotal = cart.reduce((total, product) => total + (product.product.price * product.quantity), 0);
        // shippingCost is hard coded just as example.
        (subtotal > 0) ? shippingCost = 10.50 : shippingCost = 0;
    }

    const decreaseAmmount = (userId, product) => {
        if (product.quantity > 1) {
            addToCart(userId, product.product, quantity = -1);
        } else {
            deleteProduct(userId, product.product._id);
        }
    }

    useEffect(() => {
        if (cart && cart.length < 1) {
            deleteCart(userId);
        }
    }, [cart]);

    return (
        <>
            <Navbar />

            <div className="editCart-container">

                <h1 className="editCart-title">Edit {user.username} Cart</h1>
                <div className="editCart-wrapper">
                    {/* Product list container */}
                    <div>
                        {(cart && cart.length >= 1) ? Array.from(cart).map((product) => {
                            return (
                                <>
                                    <div key={product.product._id} className="editCart-product-container">

                                        <div className="editCart-imageContainer">

                                            <img className='editCart-infoImg' src={`${product.product.thumbnail}`} alt="" />

                                            <div className="editCart-details">
                                                <span className="editCart-id"><b>ID:</b> {product.product._id}</span>
                                                <span className="editCart-product"><b>Product:</b> {product.product.title}</span>
                                                <span className="editCart-ram"><b>RAM:</b> {product.ram}</span>
                                                <span className="editCart-color"><b>Color:</b> {product.color}</span>
                                            </div>
                                        </div>

                                        <div className="editCart-actions">

                                            <div className="editCart-quantityControl">
                                                <button onClick={() => decreaseAmmount(user._id, product)} className="editCart-ammountIcon editCart-flexCenter">
                                                    <RemoveIcon />
                                                </button>

                                                <span className="editCart-quantity">{product.quantity}</span>

                                                <button onClick={() => addToCart(user._id, product.product)} className="editCart-ammountIcon editCart-flexCenter">
                                                    <AddIcon />
                                                </button>
                                            </div>

                                            <div className="editCart-price">${(product.product.price * product.quantity)}</div>
                                            <button onClick={() => deleteProduct(user._id, product.product._id)} className='editCart-deleteButton'>
                                                Remove Product
                                            </button>
                                        </div>

                                    </div>
                                    <hr className="editCart-divider" />
                                </>
                            );
                        }) : (
                            <div className='noProducts'> No Producs in Cart</div>
                        )}
                    </div>

                    {/* Product Summary container */}
                    <div className="editCart-summaryContainer">

                        <h1 className="editCart-summaryTitle">ORDER SUMMARY</h1>

                        <div className="editCart-summaryItem">
                            <span className='editCart-summaryItemText'>Subtotal: </span>
                            <span className='editCart-summaryItemPrice'>
                                ${subtotal}
                            </span>
                        </div>

                        <div className="editCart-summaryItem">
                            <span className='editCart-summaryItemText'>Shipping: </span>
                            <span className='editCart-summaryItemPrice'>${shippingCost}</span>
                        </div>

                        <div className="editCart-summaryItem editCart-summaryTotal">
                            <span className='editCart-summaryItemTotalText'>Total: </span>
                            <span className='editCart-summaryItemTotalPrice'>${subtotal + shippingCost}</span>
                        </div>
                        <button className='editCart-btnRemove'
                            onClick={() => { deleteCart(userId); getCart(userId) }}
                        >
                            DELETE CART
                        </button>
                    </div>
                </div>
            </div >

            <Footer />
        </>
    )
}