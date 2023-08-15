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
import { AuthProvider } from './context/AuthContext.js';
import { ProductsProvider } from './context/ProductsContext.js';

function App() {

  const user = true;

  return (

    <AuthProvider>
      <ProductsProvider>

        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products/" element={<ProductList />} />
            <Route path="/products/:category" element={<ProductList />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/my-profile/:userId" element={<MyProfile />} />
            <Route path="/settings/:userId" element={<Settings />} />
        
            <Route path="/cart/:userId" element={<Cart />} />
          </Routes>
        </BrowserRouter>

      </ProductsProvider>
    </AuthProvider>
  );
}

export default App;
