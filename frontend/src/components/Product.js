import './styles/Product.css';

// Icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.js';
import { useCart } from '../context/CartContext';

export default function Product({ item }) {

  const {user} = useAuth();
  const { addToCart, errors } = useCart();
  
  const handleShoppingCart = async (e) => {
    e.preventDefault();

    // We stablish a condition where you can only add if you are logged.
    user ? await addToCart(user._id, item._id) : console.log("You aren't logged");
  }


  return (
    <div className='prod-container'>

      {/* <div className='prod-circle'></div> */}

      <img className="prod-image" src={item.thumbnail} alt="" />

      <div className="prod-info">

        <div className="prod-icon">
          <button onClick={(e) => handleShoppingCart(e)}>
            <ShoppingCartIcon />
          </button>
        </div>

        <div className="prod-icon"><Link to='#'><FavoriteBorderIcon /></Link></div>

        <div className="prod-icon"><Link to={`/product/${item._id}`}><SearchIcon /></Link></div>
      </div>
    </div>
  )
}
