import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Products from '../components/Products';

import './styles/ProductList.css';

export default function ProductList() {
    return (
        <div className='productList-container'>
            <Navbar />

            <h1 className='title'>Products</h1>

            <div className='filter-container'>

                {/* Filters */}
                <div className='filter'>

                    <span className='filter-text'>Filter Products:</span>
                    {/* Type selector */}
                    <select className='select'>
                        <option disabled selected>Category:</option>
                        <option>All</option>
                        <option>Smartphones</option>
                        <option>Laptops</option>
                        <option>TVs</option>
                    </select>
                    {/* Brand selector */}
                    <select className='select'>
                        <option disabled selected>Brand:</option>
                        <option>All</option>
                        <option>Apple</option>
                        <option>Acer</option>
                        <option>LG</option>
                        <option>Asus</option>
                    </select>

                </div>

                <div className='filter'>
                    {/* Sort */}
                    <span className='filter-text'>Sort Products:</span>
                    <select className='select'>
                        <option selected>Newest</option>
                        <option>Price (asc)</option>
                        <option>Price (asc)</option>
                    </select>

                </div>

            </div>
            <Products />
            <Footer />
        </div>
    )
}
