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
import MyProfile from './pages/MyProfile';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

import AdminRoutes from './middleware/AdminRoutes';
import AllProducts from './pages/AdminPages/AllProducts';
import AllUsers from './pages/AdminPages/AllUsers';
import AllCarts from './pages/AdminPages/AllCarts';
import EditProduct from './pages/AdminPages/EditProduct';
import EditUser from './pages/AdminPages/EditUser';
import EditCart from './pages/AdminPages/EditCart';
import CreateProduct from './pages/AdminPages/CreateProduct';

// Context Provider
import { AuthProvider } from './context/AuthContext.js';
import { ProductsProvider } from './context/ProductsContext.js';
import { CartProvider } from './context/CartContext.js';
import { UserProvider } from './context/UserContext';
import { AdminProvider } from './context/AdminContext';

export default function App() {

  return (

    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <UserProvider>
            <AdminProvider>

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
                  <Route element={<ProtectedRoutes />}>
                    <Route path="/my-profile/:userId" element={<MyProfile />} />
                    <Route path="/settings/:userId" element={<Settings />} />
                    <Route path="/cart/:userId" element={<Cart />} />
                    <Route path="/checkout/:userId" element={<Checkout />} />
                  </Route>
                  {/* Admin Routes */}
                  <Route element={<AdminRoutes />}>
                    <Route path="/all-products/" element={<AllProducts />} />
                    <Route path="/all-users/" element={<AllUsers />} />
                    <Route path="/all-carts/" element={<AllCarts />} />
                    <Route path="/edit-product/:productId" element={<EditProduct />} />
                    <Route path="/edit-user/:userId" element={<EditUser />} />
                    <Route path="/edit-cart/:cartId" element={<EditCart />} />
                    <Route path="/create-product" element={<CreateProduct />} />
                  </Route>
                </Routes>
              </BrowserRouter>

            </AdminProvider>
          </UserProvider>
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}