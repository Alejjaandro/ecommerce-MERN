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
    const { getCategoriesAndBrands, getProducts, products } = useProducts();

    // We call getCategoriesAndBrands and getProducts when the page loads.
    useEffect(() => {
        getCategoriesAndBrands();
        getProducts();
    }, []);

    // console.log(products);

    // This function is called when the user filters the products.
    const [filteredProducts, setFilteredProducts] = useState([]);
    useEffect(() => {setFilteredProducts(products)}, [products]);

    const onFilter = (category, brand) => {
        // We initialize "filtered" with all the products.
        let filtered = products;
        // If the user selected a category or brand, we filter the products.
        if (category && (category !== "All")) {
            filtered = filtered.filter(product => product.category === category);
        }
        if (brand && (brand !== "All")) {
            filtered = filtered.filter(product => product.brand === brand);
        }
        // We update the state with the filtered products.
        setFilteredProducts(filtered);
    }

    const [sort, setSort] = useState('newest');

    return (
        <>
            <Navbar />

            <div className='productList-container'>

                <CategoriesNavbar />

                <h1 className='title'>Products</h1>

                <div className='filter-container'>

                    {/* Filters */}
                    {/* We send useProducts to the component so it can use context logic*/}
                    <FilterNavbar useProducts={useProducts} onFilter={onFilter} />

                    {/* Sort */}
                    <div className='sort'>
                        <span className='filter-text'>Sort Products:</span>
                        <select className='select' onChange={(e) => setSort(e.target.value)}>
                            <option value="newest">Newest</option>
                            <option value="asc">Price (asc)</option>
                            <option value="desc">Price (desc)</option>
                        </select>

                    </div>

                </div>

                <Products products={filteredProducts} sort={sort} />

            </div>

            <Footer />
        </>
    )
}