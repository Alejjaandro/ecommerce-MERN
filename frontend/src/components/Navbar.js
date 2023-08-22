import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';

// Icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

// Styles
import './styles/Navbar.css';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext.js';

export default function Navbar() {
  // We extract what we will nedd from the contexts files.
  const { isAuthenticated, user, logout } = useAuth();
  const { productsNumber, getCart } = useCart();

  // We create a variable to control if the sub-menu appears or not.
  const [menuVisible, setMenuVisible] = useState(false);
  // we change the value of the alternator variable to its contrary.
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  }

  // We check if there is a user logged and get its cart to show the number of items it has in the sub-menu.
  useEffect(() => {
    if (user) {
      getCart(user._id);
    }
  }, [])

  // To navigate to the home page after logging out.
  const navigate = useNavigate();

  return (

    <div className='nav-container'>

      <div className='left-container'>
        LOGO
      </div>

      <div className="center-container">
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/products'>Products</Link></li>
          <li><Link to='/about-us'>About Us</Link></li>
          <li><Link to='/contact'>Contact</Link></li>
        </ul>
      </div>

      {/* Login/Register - Profile */}
      {isAuthenticated && user ? (
        // If there is a user logged it will show its name and an icon that display a sub-menu when clicked.
        <div className='right-container'>
          <span>Hi! {user.username}</span>
          <button className='userIcon' onClick={toggleMenu}><AccountBoxIcon /></button>
        </div>

      ) : (
        // If there is no user, it will show login and register buttons.
        < div className='right-container'>
          <NavLink to='/register' className="btn btn-outline-secondary">Register</NavLink>
          <NavLink to='/login' className="btn btn-outline-secondary">Login</NavLink>
        </div >
      )
      }

      {/* Profile Menu */}
      {
        // Checks if there is a user loggen and, if the alternator is true, displays the sub-menu.
        (menuVisible && user) ? (
          <div className="sub-menu-wrap">
            <div className="sub-menu">
              <div className="user-info">
                <h2>{user.name} {user.lastname}</h2>
                <hr />
              </div>
              <Link to={`/my-profile/${user._id}`}><AccountBoxIcon /> My Profile</Link>
              <Link to={`/settings/${user._id}`}><SettingsIcon /> Settings</Link>
              <Link to={`/cart/${user._id}`}><ShoppingCartIcon /> Shopping Cart ({productsNumber})</Link>
              <button onClick={() => { logout(); navigate('/') }}><LogoutIcon /> Logout</button>
            </div>
          </div>
        ) : null
      }

    </div >
  )
}
