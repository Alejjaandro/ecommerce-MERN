import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import AdminNavbar from '../components/AdminNavbar';
import Slider from '../components/Slider';
import Categories from '../components/Categories';
import Product from '../components/Product';
import Footer from '../components/Footer';

import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductsContext.js';
import { Link } from 'react-router-dom';

import './styles/Home.css';

export default function Home() {

  const { user } = useAuth();

  const { getProducts} = useProducts();
  let { products } = useProducts();

  useEffect(() => {getProducts()}, []);  
  products = products.slice(0,15);

  return (
    <>
      {(!user || !user.isAdmin) ? <Navbar /> : <AdminNavbar />}

      <Slider />
      <Categories />

      <div className='home-container'>

        <h1 className='home-title'>SOME PRODUCTS</h1>

        <div className='products-container'>

          {products && products.map((item) => (
            <Product item={item} key={item._id} />
          ))}

        </div>

        <Link className='home-link' to='/products'>See All Products</Link>

      </div>

      <Footer />
    </>
  )
}
