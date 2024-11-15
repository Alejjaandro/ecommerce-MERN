import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { getProducts } from './redux/productsSlice';
import { useDispatch } from 'react-redux';

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import AboutUs from './pages/AboutUs'
import AllProducts from './pages/AllProducts';
import ProductPage from './pages/ProductPage';

function App() {
	const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProducts())
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
				<Route path='/products/:category' element={<AllProducts />} />
				<Route path='/product/:id' element={<ProductPage />} />
			</Routes>
			
		</BrowserRouter>
	)
}

export default App
