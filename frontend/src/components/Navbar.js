import { NavLink } from 'react-router-dom';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// Styles
import './styles/Navbar.css';

export default function Navbar() {
  return (

    <div className='nav-container'>

      <div className='left-container'>
        <input type="search" className='nav-search'/> <SearchIcon />
      </div>

      <div className='center-container'>LOGO</div>

      <div className='right-container'>

        <NavLink to='/register' className="btn btn-outline-secondary">Register</NavLink>
        <NavLink to='/login' className="btn btn-outline-secondary">Login</NavLink>
        <NavLink to='/cart' className="btn btn-outline-secondary">Cart <ShoppingCartIcon/></NavLink>
        
      </div>

    </div>
  )
}
