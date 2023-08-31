import AdminNavbar from '../../components/AdminNavbar';
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
            <AdminNavbar />

            <div className="editProduct-container">

                <div className="editProduct-wrapper">

                    <h1 className="editProduct-title">Edit {user.username} Cart</h1>

                    {/* Product list container */}
                    <div>
                        {(cart && cart.length >= 1) ? Array.from(cart).map((product) => {
                            return (
                                <>
                                    <div key={product.product._id} className="editProduct-container">

                                        <div className="editProduct-imageContainer">

                                            <img className='editProduct-infoImg' src={`${product.product.thumbnail}`} alt="" />

                                            <div className="editProduct-details">
                                                <span className="editProduct-id"><b>ID:</b> {product.product._id}</span>
                                                <span className="editProduct-product"><b>Product:</b> {product.product.title}</span>
                                                <span className="editProduct-ram"><b>RAM:</b> {product.ram}</span>
                                                <span className="editProduct-color"><b>Color:</b> {product.color}</span>
                                            </div>
                                        </div>

                                        <div className="editProduct-actions">

                                            <div className="editProduct-quantityControl">
                                                <button onClick={() => decreaseAmmount(user._id, product)} className="editProduct-ammountIcon editProduct-flexCenter">
                                                    <RemoveIcon />
                                                </button>

                                                <span className="editProduct-quantity">{product.quantity}</span>

                                                <button onClick={() => addToCart(user._id, product.product)} className="editProduct-ammountIcon editProduct-flexCenter">
                                                    <AddIcon />
                                                </button>
                                            </div>

                                            <div className="editProduct-price">${(product.product.price * product.quantity)}</div>
                                            <button onClick={() => deleteProduct(user._id, product.product._id)} className='editProduct-deleteButton'>
                                                Remove Product
                                            </button>
                                        </div>

                                    </div>
                                    <hr className="editProduct-divider" />
                                </>
                            );
                        }) : (
                            <div className='noProducts'> No Producs in Cart</div>
                        )}
                    </div>

                    {/* Product Summary container */}
                    <div className="editProduct-summaryContainer">

                        <h1 className="editProduct-summaryTitle">ORDER SUMMARY</h1>

                        <div className="editProduct-summaryItem">
                            <span className='editProduct-summaryItemText'>Subtotal: </span>
                            <span className='editProduct-summaryItemPrice'>
                                ${subtotal}
                            </span>
                        </div>

                        <div className="editProduct-summaryItem">
                            <span className='editProduct-summaryItemText'>Shipping: </span>
                            <span className='editProduct-summaryItemPrice'>${shippingCost}</span>
                        </div>

                        <div className="editProduct-summaryItem editProduct-summaryTotal">
                            <span className='editProduct-summaryItemTotalText'>Total: </span>
                            <span className='editProduct-summaryItemTotalPrice'>${subtotal + shippingCost}</span>
                        </div>
                        <button className='editProduct-btnRemove'
                            onClick={() => { deleteCart(userId); getCart(userId)}}
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