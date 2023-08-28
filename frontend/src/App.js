import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import CategoryProducts from './pages/CategoryProducts';

import ProtectedRoutes from './middleware/ProtectedRoutes';
import Settings from './pages/Settings';
import Cart from './pages/Cart';
import MyProfile from './pages/MyProfile';

import AdminRoutes from './middleware/AdminRoutes';
import AllProducts from './pages/AdminPages/AllProducts';
import AllUsers from './pages/AdminPages/AllUsers';
import EditProduct from './pages/AdminPages/EditProduct';
import CreateProduct from './pages/AdminPages/CreateProduct';

// Context Provider
import { AuthProvider } from './context/AuthContext.js';
import { ProductsProvider } from './context/ProductsContext.js';
import { CartProvider } from './context/CartContext.js';
import { UserProvider } from './context/UserContext';

export default function App() {
  
  return (

    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <UserProvider>

            <BrowserRouter>
              <Routes>

                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/products/" element={<ProductList />} />
                <Route path="/products/:category" element={<CategoryProducts />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* Users Routes */}
                <Route element={<ProtectedRoutes/>}>
                  <Route path="/my-profile/:userId" element={<MyProfile />} />
                  <Route path="/settings/:userId" element={<Settings />} />
                  <Route path="/cart/:userId" element={<Cart />} />
                </Route>

                {/* Admin Routes */}
                <Route element={<AdminRoutes/>}>
                  <Route path="/all-products/" element={<AllProducts />} />
                  <Route path="/all-users/" element={<AllUsers />} />
                  <Route path="/edit-product/:productId" element={<EditProduct />} />
                  <Route path="/create-product" element={<CreateProduct />} />
                </Route>

              </Routes>
            </BrowserRouter>

          </UserProvider>
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}