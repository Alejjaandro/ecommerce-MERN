import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';

// Icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

// Styles
import './styles/Navbar.css';
import { useEffect, useState } from 'react';

export default function Navbar() {

  const { isAuthenticated, user: response } = useAuth();
  
  const [user, setUser] = useState();
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {

    if (isAuthenticated) {
      setUser(response.user);
    } else {
      setUser(null)
    }
    
    console.log(user);
  }, [isAuthenticated])

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    console.log(menuVisible);
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

      {isAuthenticated && user ? (
        <div className='right-container'>
          <span>Hi! {user.username}</span>
          <button className='userIcon' onClick={toggleMenu}><AccountBoxIcon /></button>
        </div>

      ) : (
        <div className='right-container'>

          <NavLink to='/register' className="btn btn-outline-secondary">Register</NavLink>
          <NavLink to='/login' className="btn btn-outline-secondary">Login</NavLink>
          <NavLink to='/cart' className="btn btn-outline-secondary">Cart <ShoppingCartIcon /></NavLink>

        </div >
      )}

      {menuVisible && (
        <div className="sub-menu-wrap">
          <div className="sub-menu">
            <div className="user-info">
              <h2>{user.name} {user.lastname}</h2>
              <hr />
            </div>
            <Link to="#"><AccountBoxIcon /> My Profile</Link>
            <Link to="#"><SettingsIcon /> Settings</Link>
            <Link to="#"><LogoutIcon /> Logout</Link>
          </div>
        </div>
      )}

    </div >
  )
}
