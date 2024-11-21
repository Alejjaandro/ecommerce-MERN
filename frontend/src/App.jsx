import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getUser } from './redux/authSlice';
import { getProducts } from './redux/productsSlice';

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import AboutUs from './pages/AboutUs'
import AllProducts from './pages/AllProducts';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import UserCart from './pages/UserCart';
import UserProfile from './pages/UserProfile';
import Settings from './pages/Settings';
import UserOrders from './pages/UserOrders';
import Checkout from './pages/Checkout';
import ThankYou from './pages/ThankYou';

import AdminAllProducts from './pages/AdminPages/AdminAllProducts';
import AdminCreateProduct from './pages/AdminPages/AdminCreateProduct';
import AdminEditProduct from './pages/AdminPages/AdminEditProduct';
// import ViewOrder from './pages/ViewOrder';

import ProtectedRoutes from './middleware/ProtectedRoutes';
import AdminRoutes from './middleware/AdminRoutes';

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getProducts())
		dispatch(getUser())
	}, [dispatch])

	return (
		<BrowserRouter>

			<Navbar />

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
				<Route path='/aboutUs' element={<AboutUs />} />
				<Route path='/products' element={<AllProducts />} />
				<Route path='/products/:category' element={<CategoryPage />} />
				<Route path='/product/:id' element={<ProductPage />} />

				<Route element={<ProtectedRoutes />}>
					<Route path='/cart/:id' element={<UserCart />} />
					<Route path='/orders/:id' element={<UserOrders />} />
					<Route path='/checkout/:id' element={<Checkout />} />
					<Route path='/thank-you/:id' element={<ThankYou />} />
					<Route path='/profile/:id' element={<UserProfile />} />
					<Route path='/settings/:id' element={<Settings />} />
				</Route>

				<Route element={<AdminRoutes />}>
					<Route path="/admin-all-products/" element={<AdminAllProducts />} />
					<Route path="/edit-product/:productId" element={<AdminEditProduct />} />
					<Route path="/create-product" element={<AdminCreateProduct />} />
					{/* <Route path="/all-users/" element={<AllUsers />} />
					<Route path="/edit-user/:userId" element={<EditUser />} />
					<Route path="/all-carts/" element={<AllCarts />} />
					<Route path="/edit-cart/:cartId" element={<EditCart />} />
					<Route path="/all-orders/" element={<AllOrders />} />
					<Route path="/order-details/:orderId" element={<OrderDetails />} /> */}
				</Route>

			</Routes>

		</BrowserRouter>
	)
}

export default App
