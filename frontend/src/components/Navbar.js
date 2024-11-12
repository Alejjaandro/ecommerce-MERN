import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';

// Icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AddBoxIcon from '@mui/icons-material/AddBox';
import InventoryIcon from '@mui/icons-material/Inventory';
import GroupIcon from '@mui/icons-material/Group';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

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
	return (
		<div className={user && user.isAdmin ? 'nav-container-admin' : 'nav-container'}>

			{/* LEFT - LOGO */}
			<Link to='/' className='logo'>
				<img src='../../CompanyLogo.png' alt='logo'></img>
			</Link>

			{/* CENTER - LINKS */}
			<Link to='/products' className='nav-products'>Products</Link>
			<Link to='/about-us' className='nav-about'>About Us</Link>
			<Link to='/contact' className='nav-contact'>Contact</Link>

			{user && user.isAdmin ? (
				<>
					<Link to='/all-products' className='admin-options'>All Products</Link>
					<Link to='/all-users' className='admin-options'>All Users</Link>
					<Link to='/all-carts' className='admin-options'>All Carts</Link>
					<Link to='/all-orders' className='admin-options'>All Orders</Link>
				</>
			) : null}

			{/* RIGHT - LOGIN/REGISTER/USER LOGO */}
			{isAuthenticated && user ? (
				// If there is a user logged it will show its name and an icon that display a sub-menu when clicked.
				<div className='right-container'>
					<span>{user.username}</span>
					<button className='userIcon' onClick={toggleMenu}>
						<AccountBoxIcon />
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
						<div className={!user.isAdmin ? "sub-menu" : "sub-menu-admin"}>

							<div className="user-info">
								<h2>{user.name} {user.lastname}</h2>
								<hr />
							</div>

							<Link to={`/my-profile/${user._id}`}><AccountBoxIcon /> My Profile</Link>
							<Link to={`/settings/${user._id}`}><SettingsIcon /> Settings</Link>
							<Link to={`/cart/${user._id}`}><ShoppingCartIcon /> Shopping Cart ({productsNumber})</Link>
							<Link to={`/my-orders/${user._id}`}><AssessmentIcon /> My Orders</Link>

							{user.isAdmin ? (
								<>
									<Link to='/all-products' className='admin-options-submenu'><InventoryIcon/> All Products</Link>
									<Link to='/all-users' className='admin-options-submenu'><GroupIcon/> All Users</Link>
									<Link to='/all-carts' className='admin-options-submenu'><ProductionQuantityLimitsIcon/> All Carts</Link>
									<Link to='/all-orders' className='admin-options-submenu'><LocalShippingIcon/> All Orders</Link>
									<Link to='/create-product'><AddBoxIcon /> Create New Product</Link>
								</>
							) : null}

							<button onClick={() => { logout() }}><LogoutIcon /> Logout</button>

						</div>
					</div>
				) : null
			}

		</div >
	)
}
