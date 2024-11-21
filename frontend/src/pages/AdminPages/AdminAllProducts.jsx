import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { deleteProduct, filterByCategory, filterByBrand } from '../../redux/productsSlice'

function AdminAllProducts() {
	const dispatch = useDispatch()
	const products = useSelector(state => state.products.filteredProducts)
	const categories = useSelector(state => state.products.allCategories)
	const brands = useSelector(state => state.products.allBrands)

	// Variable to store the selected brand for the brand filter. The default value is "all".
	const [selectedBrand, setSelectedBrand] = useState("all");

	const changeCategory = (e) => {
		dispatch(filterByCategory(e.target.value))
		setSelectedBrand("all");
	}
	const changeBrand = (e) => {
		dispatch(filterByBrand(e.target.value))
		setSelectedBrand(e.target.value);
	}

	const [warningProductId, setWarningProductId] = useState(null);

	const handleDelete = (productId) => {
		dispatch(deleteProduct(productId))
	}

	return (
		<div className='bg-gray-200 md:ml-[25%] min-h-screen flex justify-center'>
			<div className='w-[90%] p-4 bg-white'>
				<h1 className='text-4xl md:my-10 font-bold text-center uppercase'>Product Administration</h1>

				{products ? (
					<div className=''>
						<div className='flex justify-around md:text-xl'>
							{/* Category filter */}
							<div className='flex flex-col gap-4'>
								<span>Category:</span>
								<select defaultValue="all" className='bg-gray-200' onChange={changeCategory}>
									<option value="all">All</option>
									{categories.map((category, index) => (
										<option key={index} value={category} className='capitalize'>{category}</option>
									))}
								</select>
							</div>
							{/* Brand filter */}
							<div className='flex flex-col gap-4'>
								<span>Brands:</span>
								<select value={selectedBrand} className='bg-gray-200' onChange={changeBrand}>
									<option value="all">All</option>
									{brands.map((brand, index) => (
										<option key={index} value={brand} className='capitalize'>{brand}</option>
									))}
								</select>
							</div>
						</div>
						
						<div className='my-6 border-t-2 border-gray-300'>

							<ul>
								{products.map((product, index) => (
									<li key={index} className='flex flex-col border-b-2 border-gray-300 py-4'>

										<div className='mb-2 flex justify-between items-center'>
											<div className='flex items-center gap-4'>
												<img src={`/${product.thumbnail}`} alt={product.title} className='w-20 h-20 object-contain' />
												<div>
													<h1 className='text-xl'>{product.title}</h1>
													<p className='text-gray-500 capitalize'>{product.category}</p>
												</div>
											</div>
											<p>{product._id}</p>
											<div>
												<p className='text-xl font-bold'>{product.price.toFixed(2)}€</p>
											</div>
											<div className='flex flex-col gap-2 text-center'>
												<a href={`/edit-product/${product._id}`} className='p-2 bg-yellow-500 hover:bg-yellow-700 rounded-md'>Edit</a>
												<button onClick={() => setWarningProductId(product._id)} className='p-2 bg-red-500 hover:bg-red-700 rounded-md'>Delete</button>
											</div>
										</div>

										{(warningProductId === product._id) && (
											<div className="p-2 flex flex-col items-center gap-4 bg-red-400 text-white uppercase">
												<p className='text-center'>Are you sure you want to delete this product?</p>
												<div className='w-full md:w-1/2 flex gap-1'>
													<button onClick={() => handleDelete(product._id)} className="w-full p-4 bg-red-700 hover:bg-red-900">Yes</button>
													<button onClick={() => setWarningProductId(null)} className="w-full p-4 bg-blue-700 hover:bg-blue-900">No</button>
												</div>
											</div>
										)}

									</li>
								))}
							</ul>
							
						</div>
					</div>
				)
					: <h1 className='h-1/2 text-4xl text-center flex justify-center items-center'>Loading products...</h1>
				}
			</div>
		</div>
	)
}

export default AdminAllProducts