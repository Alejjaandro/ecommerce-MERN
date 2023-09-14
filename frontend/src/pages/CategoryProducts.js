import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Product from '../components/Product';

import './styles/CategoryProducts.css';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useProducts } from '../context/ProductsContext';
import CategoriesNavbar from '../components/CategoriesNavbar';

export default function CategoryProducts() {
    // We extract what we need from context.
    const { getProducts, getCategoriesAndBrands, categoriesAndBrands, categoryFilter, setCategoryFilter, brandFilter, setBrandFilter } = useProducts();
    // Define filteredProducts as a variable to redefine its value when filtering.
    let { filteredProducts } = useProducts();

    // Extract the category from the URL params.
    setCategoryFilter(useLocation().pathname.split("/")[2]);

    // Call the functions to get the products with the category param, 
    // and the array of categories with brands every time the URL param changes.
    useEffect(() => {
        getProducts(categoryFilter);
        getCategoriesAndBrands();

        setSort('newest');
        // We reset the brand filter when the category changes.
        return () => {setBrandFilter('All')}
    }, [categoryFilter])

    // If the "categoriesAndBrands" array exists, we extract the brands of the category param.
    const brands = categoriesAndBrands ? categoriesAndBrands[categoryFilter] : [];

    // === FILTER BY BRAND === //
    if (brandFilter && (brandFilter !== "All")) {
        filteredProducts = filteredProducts.filter(product => product.brand === brandFilter);
    }

    // === SORT === //
    const [sort, setSort] = useState('newest');

    if (sort) {
        filteredProducts.sort((a, b) => {
            if (sort === "asc") {
                return a.price - b.price;
            } else if (sort === "desc") {
                return b.price - a.price;
            } else {
                return b.createdAt - a.createdAt;
            }
        });
    }

    return (
        <>
            <Navbar />

            <CategoriesNavbar />

            <div className='brand-sort'>

                <div className="brand">
                    <span className='filter-text'>Select Brand:</span>

                    {/* Brand selector */}
                    <select className='select' onChange={(e) => { setBrandFilter(e.target.value) }} value={brandFilter}>
                        <option>All</option>
                        {brands && brands.map((brand, index) => {
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

                {filteredProducts && filteredProducts.map((item) => (
                    <Product item={item} key={item._id} />
                ))}

            </div>

            <Footer />
        </>
    )
}