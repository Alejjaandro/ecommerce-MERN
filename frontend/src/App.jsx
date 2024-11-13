import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import AboutUs from './pages/AboutUs'

function App() {

	return (
		<BrowserRouter>

			<Navbar />

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
				<Route path='/aboutUs' element={<AboutUs />} />
			</Routes>
			
		</BrowserRouter>
	)
}

export default App
