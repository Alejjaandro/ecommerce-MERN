import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Products from '../components/Products';
import CategoriesNavbar from '../components/CategoriesNavbar';
import FilterNavbar from '../components/FilterNavbar';

import './styles/ProductList.css';

import { useEffect, useState } from 'react';
import { useProducts } from '../context/ProductsContext.js';

export default function ProductList() {

    // Import what we need from context.
    const {getCategoriesAndBrands, getCategories} = useProducts();

    useEffect(() => { getCategories(); getCategoriesAndBrands(); }, []);
    
    const [sort, setSort] = useState('newest');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [brandFilter, setBrandFilter] = useState('All');

    const handleFilter = ({ category, brand }) => {
        setCategoryFilter(category);
        setBrandFilter(brand);
    }

    return (
        <>
            <Navbar />

            <div className='productList-container'>

                <CategoriesNavbar/>

                <h1 className='title'>Products</h1>

                <div className='filter-container'>

                    {/* Filters */}
                    {/* We send useProducts to the component so it can use context logic*/}
                    <FilterNavbar useProducts={useProducts} onFilter={handleFilter} />

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