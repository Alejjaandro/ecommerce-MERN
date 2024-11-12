import './styles/Products.css'

import Product from './Product';

export default function Products({ products }) {

  return (
    <div className='products-container'>

      {products && products.map((item) => (
        <Product item={item} key={item._id} />
      ))}

    </div>
  )
}
