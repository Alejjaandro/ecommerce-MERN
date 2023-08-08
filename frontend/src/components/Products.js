import './styles/Products.css'

import Product from './Product';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Products({ cat, filters, sort }) {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const getProducts = async () => {

      try {
        const res = await axios.get('http://localhost:4000/api/products');
        const resProducts = res.data;

        if (cat) {
          setProducts(resProducts.filter(prod => prod.category === cat));

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
