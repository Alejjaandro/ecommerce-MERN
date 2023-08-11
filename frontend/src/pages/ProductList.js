import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Products from '../components/Products';

import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useCategoriesAndBrands } from '../hooks/useData';

import './styles/ProductList.css';

export default function ProductList() {

    // Import categories & brands from useData.js.    
    const categoriesAndBrands = useCategoriesAndBrands();
    // We extract the keys of the objects that are the categories.
    const categories = Object.keys(categoriesAndBrands);

    /* 
    To extract the category param in the URL parameter we use {useLocation()} that returns
    an object with a "pathname" key that contains the URL. 
    {split("/")} splits "pathname" using the specified separator and return them as an array.
    
    We save the index [2] wich contains the category param, if is undefined means that me didn't pass 
    any param.
    */
    const [category, setCategory] = useState(useLocation().pathname.split('/')[2]);

    const [brand, setBrand] = useState('All');
    const [sort, setSort] = useState('newest');

    // Functions that change the value of the filters when other option is selected.
    const handleCategories = (e) => {
        setCategory(e.target.value);
    }
    const handleBrands = (e) => {
        setBrand(e.target.value);
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
                        <select className='select' onChange={handleCategories} name='category'>
                            <option disabled>Category:</option>
                            <option>All</option>

                            {categories.map((category, index) => {
                                return <option key={index}>{category}</option>
                            })}
                        </select>

                        {/* Brand selector */}
                        <select className='select' onChange={handleBrands} name='brand'>
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
                        <select className='select' onChange={(e) => setSort(e.target.value)}>
                            <option value="newest">Newest</option>
                            <option value="asc">Price (asc)</option>
                            <option value="desc">Price (desc)</option>
                        </select>

                    </div>

                </div>

                <Products category={category} brand={brand} sort={sort} />

            </div>

            <Footer />
        </>
    )
}
