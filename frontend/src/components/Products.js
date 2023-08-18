import './styles/Products.css'

import Product from './Product';
import { useProducts } from '../hooks/useData';

export default function Products({ category, brand, sort }) {

  // === FILTER BY CATEGORY === //

  // All explainations on how this function works is in "hooks/use.Data.js",
  // what matters is that returns an array of products filtered by category.
  let products = useProducts(category);

  // === FILTER BY BRAND === //

  // If we choose a brand filter, 
  // then we filter the products and we save the ones that matches the brand.
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
