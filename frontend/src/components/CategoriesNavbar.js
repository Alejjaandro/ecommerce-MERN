import { useEffect } from 'react';
import { useProducts } from '../context/ProductsContext';
import { NavLink } from 'react-router-dom';

import './styles/CategoriesNavbar.css';

export default function CategoriesNavbar() {
    const { getCategoriesAndBrands, categories } = useProducts();

    useEffect(() => { getCategoriesAndBrands() }, [])

    return (
        <div className="categories">
            <NavLink to={`/products`} className={"all"}> ALL </NavLink>
            {categories.map((category, index) => {
                return <NavLink to={`/products/${category}`} key={index}> {category} </NavLink>
            })}
        </div>
    )
}