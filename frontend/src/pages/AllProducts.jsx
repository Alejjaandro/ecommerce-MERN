// import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { filterByCategory, filterByBrand } from '../redux/productsSlice'
import ProductCard from '../components/ProductCard'

function AllProducts() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.filteredProducts)
    const categories = useSelector(state => state.products.allCategories)
    const brands = useSelector(state => state.products.allBrands)
   
    const changeCategory = (e) => {
        dispatch(filterByCategory(e.target.value))
    }
    const changeBrand = (e) => {
        dispatch(filterByBrand(e.target.value))
    }

    return (
        <div className='bg-gray-200 md:ml-[25%] min-h-screen flex justify-center'>
            <div className='w-[90%] p-4 bg-white'>
                <h1 className='text-4xl md:my-10 font-bold text-center'>Check all our products!</h1>

                {products ? (
                    <div className='mt-6'>
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
                                <select defaultValue="all" className='bg-gray-200' onChange={changeBrand}>
                                    <option value="all">All</option>
                                    {brands.map((brand, index) => (
                                        <option key={index} value={brand} className='capitalize'>{brand}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                         
                        {/* Products grid */}
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4'>
                            {products.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    </div>
                )
                    : <h1 className='h-1/2 text-4xl text-center flex justify-center items-center'>Loading products...</h1>
                }
            </div>
        </div>
    )
}

export default AllProducts