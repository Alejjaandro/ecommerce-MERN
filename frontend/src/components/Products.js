import './styles/Products.css'

import Product from './Product';
import { useEffect } from 'react';

export default function Products({ products, sort }) {

  // console.log(products);

  // === SORT === //
  useEffect(() => {
    if (!products) { return <div>Loading...</div> }
    
    if (sort) {
      
      products.sort((a, b) => {
        if (sort === "asc") {
          return a.price - b.price;
        } else if (sort === "desc") {
          return b.price - a.price;
        }
        return 0;
      });

    }
  }, [products, sort]);

  return (
    <div className='products-container'>

      {products && products.map((item) => (
        <Product item={item} key={item._id} />
      ))}

    </div>
  )
}
