import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Categories from '../components/Categories';
import Product from '../components/Product';
import Footer from '../components/Footer';

import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductsContext.js';
import { Link } from 'react-router-dom';

import './styles/Home.css';

export default function Home() {

	const { user } = useAuth();
	const { getCart } = useCart();

	const { getProducts } = useProducts();
	let { products } = useProducts();

	// We get the products. If the user is logged in, we get the cart.
	useEffect(() => {
		getProducts();

		if (user) {
			getCart(user._id);
		}
	}, []);

	products = products.slice(0, 16);

	return (
		<>
			<Navbar />

			{/* <Slider /> */}
			<div className='home-container'>
				<Categories />

				<div className='home-left'>
					<h1 className='home-title'>SOME PRODUCTS</h1>
					<div className='products-container'>
						{products && products.map((item) => (
							<Product item={item} key={item._id} />
						))}
					</div>
					<Link className='home-link' to='/products'>See All Products</Link>
				</div>

			</div>

			<Footer />
		</>
	)
}
