import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Products from '../components/Products';
import CategoriesNavbar from '../components/CategoriesNavbar';

import './styles/ProductList.css';

import { useEffect, useState } from 'react';
import { useProducts } from '../context/ProductsContext.js';

export default function ProductList() {

    // Import what we need from context.
    const {getCategoriesAndBrands, categoriesAndBrands, categories} = useProducts();

    useEffect(() => { getCategoriesAndBrands() }, []);
    
    // Initialize brands as an empty array and with a for/in loop we extract each brand of each category .
    const brands = [];
    for (const category in categoriesAndBrands) {
        brands.push(...categoriesAndBrands[category]);
    }

    const [categoryFilter, setCategoryFilter] = useState('All');
    const [brandFilter, setBrandFilter] = useState('All');
    const [sort, setSort] = useState('newest');

    // Functions that change the value of the filters when other option is selected.
    const handleCategories = (e) => {
        setCategoryFilter(e.target.value);
    }
    const handleBrands = (e) => {
        setBrandFilter(e.target.value);
    }

    return (
        <>
            <Navbar />

            <div className='productList-container'>

                <CategoriesNavbar/>

                <h1 className='title'>Products</h1>

                <div className='filter-container'>

                    {/* Filters */}
                    <div className='filter'>

                        <span className='filter-text'>Filter Products:</span>

                        {/* Category selector */}
                        <select className='select' onChange={handleCategories}>
                            <option disabled selected>Category:</option>
                            <option>All</option>
                            {/* We go through the categories array and we return an option for each category */}
                            {categories.map((category, index) => {
                                return <option key={index}>{category}</option>
                            })}
                        </select>

                        {/* Brand selector */}
                        {/* If there isn't a category selected, brand selector won't be shown */}
                        {categoryFilter && (categoryFilter !== "All") ? (

                            <select className='select' onChange={handleBrands}>
                                <option disabled selected>Brand:</option>
                                <option>All</option>
                                {/* 
                                We search on {categoriesAndBrands} what matches with the value of {categoryFilter},
                                we transform it into an array so we can map it and return an option for
                                each brand of that category.
                                */}
                                {Array.from(categoriesAndBrands[categoryFilter]).map((brand, index) => {
                                    return <option key={index}>{brand}</option>
                                })}

                            </select>

                        ) : (

                            <select className='select' onChange={handleBrands}>
                                <option disabled selected>Brand:</option>
                                <option>All</option>

                                {brands.map((brand, index) => {
                                    return <option key={index}>{brand}</option>
                                })}
                            </select>
                        )}

                    </div>

                    <div className='sort'>
                        {/* Sort */}
                        <span className='filter-text'>Sort Products:</span>
                        <select className='select' onChange={(e) => setSort(e.target.value)}>
                            <option value="newest">Newest</option>
                            <option value="asc">Price (asc)</option>
                            <option value="desc">Price (desc)</option>
                        </select>

                    </div>

                </div>

                <Products category={categoryFilter} brand={brandFilter} sort={sort} />

            </div>

            <Footer />
        </>
    )
}