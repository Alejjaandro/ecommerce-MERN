import './styles/CategoryItem.css';
import { Link } from 'react-router-dom';

export default function CategoryItem({ product }) {

    return (

        <div className="cat-item-container">

            <img className="cat-image" src={product.thumbnail} alt="" />

            <div className="cat-info">
                <Link to={`/products/${product.category}`} className="cat-link">{product.category}</Link>
            </div>
        
        </div>
    )
}