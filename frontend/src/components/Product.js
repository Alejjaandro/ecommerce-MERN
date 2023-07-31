import './Product.css';

// Icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';



export default function Product({ item }) {
  return (
    <div className='prod-container'>

        {/* <div className='prod-circle'></div> */}

        <img className="prod-image" src={item.img} alt="" />
        
        <div className="prod-info">
            <div className="prod-icon"><ShoppingCartIcon/></div>
            <div className="prod-icon"><SearchIcon/></div>
            <div className="prod-icon"><FavoriteBorderIcon/></div>
        </div>
    </div>
  )
}
