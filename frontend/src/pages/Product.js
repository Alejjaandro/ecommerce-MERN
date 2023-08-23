import './styles/Product.css';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductsContext.js';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Product() {
    const { getProduct, product } = useProducts();
    const { addToCart } = useCart();
    const { user } = useAuth();

    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("black");
    const [ram, setRam] = useState("500 GB");

    const [addedMessage, setAddedMessage] = useState(false);
    const [alertMessage, setAlertMessage] = useState(false);

    // Get product by id.
    const id = useLocation().pathname.split('/')[2];
    useEffect(() => { getProduct(id) }, [])

    // Handle color and RAM
    const handleColor = (e) => {
        setColor(e.target.getAttribute('name'));
    }
    const handleRam = (e) => {
        setRam(e.target.value);
    }

    console.log(color, ram);

    // Handle increase and decrease buttons.
    const addQuantity = () => {
        setQuantity(quantity + 1);
    }
    const removeQuantity = () => {
        quantity > 1 && setQuantity(quantity - 1);
    }

    // Handle Add to Cart & Errors.
    const handleAddToCart = async (e) => {
        e.preventDefault();

        if (user) {
            await addToCart(user._id, product, quantity, color, ram);

            setAddedMessage(true);
            setTimeout(() => {
                setAddedMessage(false);
            }, 3000);
        } else {
            setAlertMessage(true);
            setTimeout(() => {
                setAlertMessage(false);
            }, 3000);
        }
    }

    return (
        <>
            <Navbar />

            <div className='product-container'>


                <div className="product-wrapper">

                    <img className='product-img' src={product.thumbnail} alt="" />

                    <div className="product-info-container">
                        <h1 className='product-title'>{product.title}</h1>
                        <p className='product-description'>
                            {product.description}
                        </p>
                        <span className='product-price'>${product.price}</span>

                        {/* PRODUCT OPTIONS */}
                        <div className="product-options-container">

                            {/* COLOR OPTIONS */}
                            <div className="product-color-option">

                                <span className='option-title'>Color</span>

                                <div className="option-color color-black" name="black" onClick={handleColor} />
                                <div className="option-color color-grey" name="grey" onClick={handleColor} />
                                <div className="option-color color-darkblue" name="darkblue" onClick={handleColor} />

                            </div>

                            {/* RAM OPTIONS */}
                            <div className="product-ram-option">

                                <span className='option-title'>RAM</span>

                                <select className='select-option' onChange={handleRam}>
                                    <option className="select-ram">500 GB</option>
                                    <option className="select-ram">1 TB</option>
                                    <option className="select-ram">2 TB</option>
                                </select>

                            </div>

                        </div>

                        {/* ADD CONTAINER */}
                        <div className="add-container">

                            <div className="amount-container">

                                <div className="remove flex-center" onClick={removeQuantity}><RemoveIcon /></div>
                                <span className="amount flex-center">{quantity}</span>
                                <div className="add flex-center" onClick={addQuantity}><AddIcon /></div>

                            </div>

                            <button onClick={(e) => handleAddToCart(e)} className='to-cart'>ADD TO CART</button>
                        </div>
                    </div>

                </div>

                {/* ALERTS */}
                {addedMessage && (
                    <div className="added-alert">Product added {product.title} to Cart</div>
                )}
                {alertMessage && (
                    <div className="error-alert">You must be logged.</div>
                )}

            </div>

            <Footer />
        </>
    )
}