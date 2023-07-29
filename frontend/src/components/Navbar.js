import React from 'react';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// Styles
import './Navbar.css'

export default function Navbar() {
  return (

    <div className='nav-container'>

      <div className='left-container'>
        <input type="search" className='nav-search'/> <SearchIcon />
      </div>

      <div className='center-container'>LOGO</div>

      <div className='right-container'>
        <button className="btn btn-outline-secondary">Register</button>
        <button className="btn btn-outline-secondary">Login</button>
        <button className="btn btn-outline-secondary">Cart <ShoppingCartIcon /></button>
      </div>

    </div>
  )
}
