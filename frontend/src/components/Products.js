import './styles/Products.css'

import Product from './Product';
// import { useProducts } from '../hooks/useData';
import { useProducts } from '../context/ProductsContext';
import { useEffect } from 'react';

export default function Products({ category, brand, sort }) {

  let { getProducts, products} = useProducts();

  // === FILTER BY CATEGORY === //

  // All explainations on how this function works is in "context/ProductContext.js",
  useEffect(() => { getProducts(category) }, [category]);

  // === FILTER BY BRAND === //

  // If we choose a brand filter, 
  // we filter the products and we save the ones that matches the brand.
  if (brand && (brand !== "All")) {
    products = products.filter(product => product.brand === brand);
  }

  // === SORT === //

  if (sort) {
    products = products.sort((a, b) => {

      if (sort === "asc") {
        return a.price - b.price;

      } else if (sort === "desc") {
        return b.price - a.price;
      }
      
    });
  }

  return (
    <div className='products-container'>

      {products && products.map((item) => (
        <Product item={item} key={item._id} />
      ))}

    </div>
  )
}
