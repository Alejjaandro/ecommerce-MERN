import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import AdminNavbar from './AdminNavbar.js';

// Icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AssessmentIcon from '@mui/icons-material/Assessment';

// Styles
import './styles/Navbar.css';
import { useState } from 'react';
import { useCart } from '../context/CartContext.js';

export default function Navbar() {
  // We extract what we will nedd from the contexts files.
  const { isAuthenticated, user, logout } = useAuth();
  const { productsNumber } = useCart();

  // We create a variable to control if the sub-menu appears or not.
  const [menuVisible, setMenuVisible] = useState(false);
  // we change the value of the alternator variable to its contrary.
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  }

  // If the user is an admin, it will show the admin navbar.
  if (user && user.isAdmin) {
    
    return (<AdminNavbar />)

  } else {

    return (
      <div className='nav-container'>

        {/* LEFT - LOGO */}
        <div className='left-container'>
          LOGO
        </div>

        {/* CENTER - LINKS */}
        <div className="center-container">
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/products'>Products</Link></li>
            <li><Link to='/about-us'>About Us</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
          </ul>
        </div>

      {/* RIGHT - LOGIN/REGISTER/USER LOGO */}
        {isAuthenticated && user ? (
          // If there is a user logged it will show its name and an icon that display a sub-menu when clicked.
          <div className='right-container'>
            <span>{user.username}</span>
            <button className='userIcon' onClick={toggleMenu}>

              {user.image ? <img src={user.image}></img> : <AccountBoxIcon />}

            </button>
          </div>

        ) : (
          // If there is no user, it will show login and register buttons.
          < div className='right-container'>
            <NavLink to='/register'>Register</NavLink>
            <NavLink to='/login'>Login</NavLink>
          </div >
        )
        }

        {/* PROFILE SUB MENU */}
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
                <Link to={`/my-orders/${user._id}`}><AssessmentIcon /> My Orders</Link>

                <button onClick={() => { logout() }}><LogoutIcon /> Logout</button>

              </div>
            </div>
          ) : null
        }

      </div >
    )
  }
}
