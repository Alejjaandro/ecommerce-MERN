import './styles/Product.css';

// Icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.js';
import { useCart } from '../context/CartContext';

export default function Product({ item }) {

  const { user } = useAuth();
  const { addToCart, errors } = useCart();

  const handleShoppingCart = async (e) => {
    e.preventDefault();

    // We stablish a condition where you can only add if you are logged.
    user ? await addToCart(user._id, item) : console.log("You aren't logged");
  }


  return (
    <div className='prod-container'>

      <img className="prod-image" src={item.thumbnail} alt="" />

      <div className="prod-info">

        <button className="prod-icon" onClick={(e) => handleShoppingCart(e)}>
          <ShoppingCartIcon />
        </button>

        <button className="prod-icon">
          <FavoriteBorderIcon />
        </button>

        <Link className="prod-icon" to={`/product/${item._id}`}>
          <SearchIcon />
        </Link>

      </div>
    </div>
  )
}
