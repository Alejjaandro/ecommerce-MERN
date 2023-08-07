import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Products from '../components/Products';

import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import './styles/ProductList.css';

export default function ProductList() {

    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState('newest');
    /* 
    To extract the category param in the URL parameter we use {useLocation()} that returns
    an object with a "pathname" key that contains the URL. 
    {split("/")} splits "pathname" using the specified separator and return them as an array.
    */
    const param = useLocation().pathname.split('/');

    // We save the last array index wich contains the category param.
    const cat = param[param.length - 1];


    // Function to save the filters when selected.
    const handleFilters = (e) => {
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name]: value
        })

    }

    console.log(cat);
    console.log(filters, sort);

    return (
        <>
            <Navbar />

            <div className='productList-container'>

                <h1 className='title'>Products</h1>

                <div className='filter-container'>

                    {/* Filters */}
                    <div className='filter'>

                        <span className='filter-text'>Filter Products:</span>
                        {/* Type selector */}
                        <select className='select' onChange={handleFilters} name='category'>
                            <option disabled>Category:</option>
                            <option>All</option>
                            <option>Smartphones</option>
                            <option>Laptops</option>
                            <option>TVs</option>
                        </select>
                        {/* Brand selector */}
                        <select className='select' onChange={handleFilters} name='brand'>
                            <option disabled>Brand:</option>
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
                            <option>Newest</option>
                            <option>Price (asc)</option>
                            <option>Price (asc)</option>
                        </select>

                    </div>

                </div>

                <Products />
            </div>

            <Footer />
        </>
    )
}
