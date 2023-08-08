import './styles/Products.css'

import Product from './Product';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Products({ cat, filters, sort }) {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const getProducts = async () => {

      try {
        // Make a get petition to the URL stablished in "/backend/routes/Product.js".
        const res = await axios.get('http://localhost:4000/api/products');
        const resProducts = res.data;

        // If the URL has a category parameter, then we filter the products
        // and we save the ones that matches the category.
        if (cat) {
          setProducts(resProducts.filter(prod => prod.category === cat));

          // If not, then we save all products.
        } else {
          setProducts(resProducts);
        }

      } catch (error) {
        console.log(error);
      }
    }

    getProducts();

  }, [cat]);

  // console.log(products);

  return (
    <div className='products-container'>

      {products.map((item) => (
        <Product item={item} key={item._id} />
      ))}

    </div>
  )
}
