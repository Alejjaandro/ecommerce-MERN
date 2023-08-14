import './App.css';

import { BrowserRouter, Route, Routes, redirect } from 'react-router-dom';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import Settings from './pages/Settings';
import MyProfile from './pages/MyProfile';
import Cart from './pages/Cart';

// Context Provider
import { AuthProvider } from './context/AuthContext';

function App() {

  const user = true;

  return (

    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />

          <Route path="/products/" element={<ProductList />} />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/product/:id" element={<Product />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-profile/:id" element={<MyProfile />} />
          <Route path="/settings/:id" element={<Settings />} />
          
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
