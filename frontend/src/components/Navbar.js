import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';

// Icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

// Styles
import './styles/Navbar.css';
import { useState } from 'react';

export default function Navbar() {

  const navigate = useNavigate();

  const { isAuthenticated, user, logout } = useAuth();
  
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  }

  return (

    <div className='nav-container'>

      <div className='left-container'>
        LOGO
      </div>

      <div className="center-container">
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/products'>Products</Link></li>
        </ul>
      </div>

      {/* Login/Register - Profile */}
      {isAuthenticated && user ? (
        <div className='right-container'>
          <span>Hi! {user.username}</span>
          <button className='userIcon' onClick={toggleMenu}><AccountBoxIcon /></button>
        </div>

      ) : (
        <div className='right-container'>

          <NavLink to='/register' className="btn btn-outline-secondary">Register</NavLink>
          <NavLink to='/login' className="btn btn-outline-secondary">Login</NavLink>
        </div >
      )}

      {/* Profile Menu */}
      {(menuVisible && user) ? (
        <div className="sub-menu-wrap">
          <div className="sub-menu">
            <div className="user-info">
              <h2>{user.name} {user.lastname}</h2>
              <hr />
            </div>
            <Link to={`/my-profile/${user._id}`}><AccountBoxIcon /> My Profile</Link>
            <Link to={`/settings/${user._id}`}><SettingsIcon /> Settings</Link>
            <Link to={`/cart/${user._id}`}><ShoppingCartIcon /> Shopping Cart</Link>
            <button onClick={() => {logout(); navigate('/')}}><LogoutIcon /> Logout</button>
          </div>
        </div>
      ) :  null}

    </div >
  )
}
