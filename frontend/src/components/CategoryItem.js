import './styles/CategoryItem.css';
import { Link } from 'react-router-dom';

export default function CategoryItem({ item }) {

    return (

        <div className="cat-container">

            <img className="cat-image" src={item.img} alt="" />

            <div className="cat-info">

                <h3 className='cat-title'>{item.title}</h3>
                <Link to={`/products/${item.category}`} className="cat-link">See now</Link>
            </div>
        
        </div>
    )
}