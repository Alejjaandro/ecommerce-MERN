import { useEffect } from 'react';
import { useProducts } from '../context/ProductsContext';
import { NavLink } from 'react-router-dom';

import './styles/CategoriesNavbar.css';

export default function CategoriesNavbar() {
    const { getCategoriesAndBrands, categoriesAndBrands } = useProducts();

    useEffect(() => {
        getCategoriesAndBrands();
    }, [])

    const categories = categoriesAndBrands ? Object.keys(categoriesAndBrands) : [];

    return (
        <div className="categories">
            {categories.map((category, index) => {
                return <NavLink to={`/products/${category}`} key={index}> {category} </NavLink>
            })}
        </div>
    )
}
