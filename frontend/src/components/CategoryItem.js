import './styles/CategoryItem.css';
import { Link } from 'react-router-dom';

export default function CategoryItem({ product }) {

    return (

        <div className="cat-item-container">

            <img className="cat-image" src={product.thumbnail} alt="" />

            <div className="cat-info">

                <h3 className='cat-title'>{product.category}</h3>
                <Link to={`/products/${product.category}`} className="cat-link">See now</Link>
            </div>
        
        </div>
    )
}