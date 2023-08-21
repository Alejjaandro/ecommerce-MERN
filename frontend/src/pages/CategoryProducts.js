import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Product from '../components/Product';

import './styles/CategoryProducts.css';

import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { useProducts } from '../context/ProductsContext';
import CategoriesNavbar from '../components/CategoriesNavbar';

export default function CategoryProducts() {
    // We extract what we need from context.
    const { getProducts, getCategoriesAndBrands, categoriesAndBrands } = useProducts();
    // Define products as a variable to change its value when filtering.
    let { products } = useProducts();

    // Extract the category from the URL params.
    const category = useLocation().pathname.split("/")[2];

    // Call the functions to get the products with the category param, 
    // and the array of categories with brands every time the URL param changes.
    useEffect(() => {
        getProducts(category);
        getCategoriesAndBrands();

        setBrandFilter('All');
        setSort('newest');
    }, [category])

    // If the "categoriesAndBrands" array exists, we extract the ones under the param category.
    const brands = categoriesAndBrands ? categoriesAndBrands[category] : [];

    // We extract the keys of the objects that are the categories.
    const categories = categoriesAndBrands ? Object.keys(categoriesAndBrands) : [];
    const [brandFilter, setBrandFilter] = useState('All');
    const [sort, setSort] = useState('newest');

    // === FILTER BY BRAND === //
    if (brandFilter && (brandFilter !== "All")) {
        products = products.filter(product => product.brand === brandFilter);
    }

    // === SORT === //
    if (sort) {
        products.sort((a, b) => {
            if (sort === "asc") {
                return a.price - b.price;
            } else if (sort === "desc") {
                return b.price - a.price;
            }
        });
    }

    return (
        <>
            <Navbar />

            <CategoriesNavbar/>

            <div className='brand-sort'>

                <div className="brand">
                    <span className='filter-text'>Select Brand:</span>

                    {/* Brand selector */}
                    <select className='select'
                        onChange={(e) => { setBrandFilter(e.target.value) }}
                    >
                        <option selected>All</option>
                        {brands.map((brand, index) => {
                            return <option key={index}>{brand}</option>
                        })}
                    </select>
                </div>

                <div className='sort'>
                    <span className='filter-text'>Sort Products:</span>

                    <select className='select' onChange={(e) => setSort(e.target.value)}>
                        <option value="newest">Newest</option>
                        <option value="asc">Price (asc)</option>
                        <option value="desc">Price (desc)</option>
                    </select>
                </div>
            </div>

            <div className='products-container'>

                {products && products.map((item) => (
                    <Product item={item} key={item._id} />
                ))}

            </div>

            <Footer />
        </>
    )
}