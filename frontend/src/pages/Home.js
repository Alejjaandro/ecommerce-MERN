import React from 'react'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import Categories from '../components/Categories'
import Products from '../components/Products'
import Footer from '../components/Footer';

import { Link } from 'react-router-dom';

import './styles/Home.css';

export default function Home() {
  return (
    <>
      <Navbar />

      <Slider />
      <Categories />

      <div className='home-container'>
        
        <h1 className='home-title'>PRODUCTS</h1>

        <Products />

        <Link className='home-link' to='/products'>See All Products</Link>

      </div>

      <Footer />
    </>
  )
}
