import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';

// Icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AddBoxIcon from '@mui/icons-material/AddBox';

// Styles
import './styles/AdminNavbar.css';
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

    <div className='admin-nav-container'>

      {/* LEFT - LOGO */}
      <div className='admin-left-container'>
        LOGO
      </div>

      {/* CENTER - LINKS */}
      <div className="admin-center-container">
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/products'>Products</Link></li>
          <li><Link to='/all-products'>All Products</Link></li>
          <li><Link to='/all-users'>All Users</Link></li>
          <li><Link to='/all-carts'>All Carts</Link></li>
        </ul>
      </div>

      {/* RIGHT - USER LOGO */}
      <div className='admin-right-container'>
        <span>ADMIN {user.username}</span>
        <button className='userIcon' onClick={toggleMenu}>

          {user.image ? <img src={user.image}></img> : <AccountBoxIcon />}

        </button>
      </div>

        {/* PROFILE SUB MENU */}
        {
        // Checks if there is a user loggen and, if the alternator is true, displays the sub-menu.
        (menuVisible && user) ? (
          <div className="admin-sub-menu-wrap">
            <div className="admin-sub-menu">

              <div className="admin-user-info">
                <h2>{user.name} {user.lastname}</h2>
                <hr />
              </div>

              <Link to={`/my-profile/${user._id}`}><AccountBoxIcon /> My Profile</Link>
              <Link to={`/settings/${user._id}`}><SettingsIcon /> Settings</Link>
              <Link to={`/cart/${user._id}`}><ShoppingCartIcon /> Shopping Cart ({productsNumber})</Link>
              <Link to={`/create-product`}><AddBoxIcon /> Create New Product</Link>

              <button onClick={() => { logout(); navigate('/') }}><LogoutIcon /> Logout</button>

            </div>
          </div>
        ) : null
      }

    </div >
  )
}