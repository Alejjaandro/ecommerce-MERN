import { products } from '../data/hardCodedData';

import './Products.css'
import Product from './Product';

export default function Products() {
  return (
    <div className='products-container'>

        {products.map((item) => (
            <Product item={item} key={item.id}/>
        ))}

    </div>
  )
}
