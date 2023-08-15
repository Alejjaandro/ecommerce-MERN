import CategoryItem from "./CategoryItem";
import './styles/Categories.css';

import { useState, useEffect } from "react";
import axios from '../api/axios';

export default function Categories() {

    const [categories, setCategories] = useState([]);
    const [prodForCategory, setProdForCategory] = useState([]);

    useEffect(() => {

        const getProdForCategory = async () => {

            try {

                const res = await axios.get('/products/');
                const products = res.data;

                setCategories([...new Set(products.map((prod) => prod.category))]);

                setProdForCategory(
                    categories.map(category => {
                        return products.find(product => product.category === category);
                    })
                );

            } catch (error) {
                console.log(error);
            }
        };

        getProdForCategory();
        // console.log(categories);
        // console.log(prodForCategory);

    }, []);

    return (
        <div className="cat-container">

            {prodForCategory.map(item => (
                <CategoryItem item={item} key={item._id} />
            ))}

        </div>
    )
}
