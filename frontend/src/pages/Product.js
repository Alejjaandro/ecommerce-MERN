import './styles/Product.css';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

export default function Product() {
    return (
        <>
            <Navbar />

            <div className='product-container'>


                <div className="product-wrapper">

                    <img className='product-img' src="https://i.ibb.co/HTvVjvW/Laptop-2.webp" alt="" />

                    <div className="product-info-container">
                        <h1 className='product-title'>Prod. Title</h1>
                        <p className='product-description'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore consequatur minus unde, est asperiores sequi harum explicabo accusamus autem temporibus quod magnam provident voluptatem quis ex similique sapiente nam placeat!
                            A delectus quia sapiente consequuntur sunt magni rerum voluptatem! Vero tempora architecto et, sunt eos sed laboriosam quod similique ea porro, nesciunt alias, nobis iste facilis officiis perspiciatis at. Illum.
                        </p>
                        <span className='product-price'>$20</span>

                        {/* PRODUCT OPTIONS */}
                        <div className="product-options-container">

                            {/* COLOR OPTIONS */}
                            <div className="product-color-option">

                                <span className='option-title'>Color</span>

                                <div className="option-color color-black" />
                                <div className="option-color color-grey" />
                                <div className="option-color color-darkblue" />

                            </div>

                            {/* RAM OPTIONS */}
                            <div className="product-ram-option">

                                <span className='option-title'>RAM</span>

                                <select className='select-option'>
                                    <option classname="select-ram">500 GB</option>
                                    <option classname="select-ram">1 TB</option>
                                    <option classname="select-ram">2 TB</option>
                                </select>

                            </div>

                        </div>

                        {/* ADD CONTAINER */}
                        <div className="add-container">

                            <div className="amount-container">

                                <div className="remove flex-center"><RemoveIcon /></div>
                                <span className="amount flex-center">1</span>
                                <div className="add flex-center"><AddIcon /></div>

                            </div>

                            <button className='to-cart'>ADD TO CART</button>
                        </div>
                    </div>

                </div>

            </div>

            <Footer />
        </>
    )
}
