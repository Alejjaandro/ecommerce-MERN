import './styles/Products.css'

import Product from './Product';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Products({ category, brand, sort }) {

  const [products, setProducts] = useState([]);

  // === FILTER BY CATEGORY === //
  useEffect(() => {

    const getProducts = async () => {

      try {
        // Make a get petition to the URL stablished in "/backend/routes/Product.js".
        const res = await axios.get('http://localhost:4000/api/products');
        const resProducts = res.data;

        // If we choose a category filter or there is a category in the URL params, 
        // then we filter the products and we save the ones that matches the category.
        if ( category && (category !== "All") ) {
          
          setProducts(resProducts.filter(prod => prod.category === category));

          // If not, then we save all products.
        } else {
          setProducts(resProducts);
        }

      } catch (error) {
        console.log(error);
      }
    }

    getProducts();

  }, [category]);

  return (
    <div className='products-container'>

      {products.map((item) => (
        <Product item={item} key={item._id} />
      ))}

    </div>
  )
}
