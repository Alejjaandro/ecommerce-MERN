import './App.css';

import { BrowserRouter, Route, Routes, redirect } from 'react-router-dom';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';

function App() {

  const user = true;

  return (

    <BrowserRouter>

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products/" element={<ProductList />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />

        <Route path="/register" element={<Register />}>
          {/* {user ? redirect('/') : null} */}
        </Route>

        <Route path="/login" element={<Login />}>
          {/* {user ? redirect('/') : null} */}
        </Route>

        <Route path="/cart" element={<Cart />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
