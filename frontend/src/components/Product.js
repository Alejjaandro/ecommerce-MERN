import './styles/Product.css';

// Icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';

export default function Product({ item }) {

  
  return (
    <div className='prod-container'>

        {/* <div className='prod-circle'></div> */}

        <img className="prod-image" src={item.thumbnail} alt="" />
        
        <div className="prod-info">
            <div className="prod-icon"><Link to='/cart'><ShoppingCartIcon/></Link></div>
            <div className="prod-icon"><Link to={`/product/${item._id}`}><SearchIcon/></Link></div>
            <div className="prod-icon"><Link to='/cart'><FavoriteBorderIcon/></Link></div>
        </div>
    </div>
  )
}
