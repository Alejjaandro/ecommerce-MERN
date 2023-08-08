import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Products from '../components/Products';

import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import './styles/ProductList.css';

export default function ProductList() {
    /* 
    To extract the category param in the URL parameter we use {useLocation()} that returns
    an object with a "pathname" key that contains the URL. 
    {split("/")} splits "pathname" using the specified separator and return them as an array.
    */
   const param = useLocation().pathname.split('/');
   
   // We save the index [2] wich contains the category param.
   const cat = param[2];
   
   const [filters, setFilters] = useState({});
   const [sort, setSort] = useState('newest');

    // Function to save the filters when selected.
    const handleFilters = (e) => {
        // We save the option value in a variable.
        const value = e.target.value;

        // We save category and brand selectors as an object with the selected "option" as value.
        setFilters({
            ...filters,
            [e.target.name]: value
        })
    }

    return (
        <>
            <Navbar />

            <div className='productList-container'>

                <h1 className='title'>Products</h1>

                <div className='filter-container'>

                    {/* Filters */}
                    <div className='filter'>

                        <span className='filter-text'>Filter Products:</span>
                        {/* Category selector */}
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
                        <select className='select' onChange={ (e) => setSort(e.target.value) }>
                            <option value="newest">Newest</option>
                            <option value="asc">Price (asc)</option>
                            <option value="desc">Price (desc)</option>
                        </select>

                    </div>

                </div>

                <Products cat={cat} filters={filters} sort={sort} />

            </div>

            <Footer />
        </>
    )
}
