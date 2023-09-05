import CategoryItem from "./CategoryItem";
import './styles/Categories.css';

import { useEffect } from "react";

import { useProducts } from '../context/ProductsContext.js';

export default function Categories() {

    const { getCategories, prodForCategory } = useProducts();

    useEffect(() => {

        getCategories();

    }, [])

    return (
        <div className="cat-container">

            {prodForCategory.map((product, index) => (
                <CategoryItem product={product} key={index} />
            ))}

        </div>
    )
}
