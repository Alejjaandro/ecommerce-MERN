// import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { filterByCategory } from '../redux/productsSlice'
import ProductCard from '../components/ProductCard'

function AllProducts() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.filteredProducts)

    const changeCategory = (e) => {
        dispatch(filterByCategory(e.target.value))
    }

    return (
        <div className='bg-gray-200 md:ml-[25%] min-h-screen flex justify-center'>
            <div className='w-[90%] p-4 bg-white'>
                <h1 className='text-4xl md:my-10 font-bold text-center'>Check all our products!</h1>

                {products ? (
                    <div>
                        <div className='flex justify-around text-xl'>
                            <div className='flex flex-col gap-4'>
                                <span>Category:</span>
                                <select defaultValue="Category:" className='bg-gray-200' onChange={changeCategory}>
                                    <option value="all">All</option>
                                    <option value="laptops">Laptops</option>
                                    <option value="PC">PCs</option>
                                    <option value="Smartphones">Smartphones</option>
                                    <option value="Headphones">Headphones</option>
                                </select>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <span>Brands:</span>
                                <select defaultValue="Brands:" className='bg-gray-200'>
                                    <option value="all">All</option>
                                    <option value="laptops">Samsung</option>
                                    <option value="PC">Asus</option>
                                    <option value="smartphones">HP</option>
                                    <option value="headphones">Apple</option>
                                </select>
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                            {products.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    </div>
                )
                    : <h1 className='h-1/2 text-4xl flex justify-center items-center'>Loading products...</h1>
                }
            </div>
        </div>
    )
}

export default AllProducts