import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getProducts } from '../redux/productsSlice'
import ProductCard from '../components/ProductCard'

function Home() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    const products = useSelector(state => state.products)

    // Filter products by category and get the first 3 products
    let laptops
    let pcs
    let smartphones
    let headphones

    if (products) {      
        laptops = products.filter(product => product.category === 'laptops').slice(0, 3)
        pcs = products.filter(product => product.category === 'PC').slice(0, 3)
        smartphones = products.filter(product => product.category === 'smartphones').slice(0, 3)
        headphones = products.filter(product => product.category === 'Headphones').slice(0, 3)
    }

    return (
        <div className='bg-gray-200 md:ml-[25%] min-h-screen flex justify-center'>
            <div className='w-[90%] p-4 bg-white'>
                <h1 className='text-4xl md:mt-10 font-bold text-center'>Welcome to our Store!</h1>
                <p className='text-lg font-light text-center mt-4'>We offer the best products at the best prices</p>

                {products ? (
                    <>
                        <div className='mt-4'>
                            <a className='block p-2 bg-gray-200 text-2xl uppercase hover:underline' href='/'>Laptops</a>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                                {laptops.map(product => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        </div>

                        <div className='mt-4'>
                            <a className='block p-2 bg-gray-200 text-2xl uppercase hover:underline' href='/'>PCs</a>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                                {pcs.map(product => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        </div>

                        <div className='mt-4'>
                            <a className='block p-2 bg-gray-200 text-2xl uppercase hover:underline' href='/'>Smartphones</a>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                                {smartphones.map(product => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        </div>

                        <div className='mt-4'>
                            <a className='block p-2 bg-gray-200 text-2xl uppercase hover:underline' href='/'>Headphones</a>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                                {headphones.map(product => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        </div>
                    </>
                )
                    : <h1 className='h-1/2 text-4xl flex justify-center items-center'>Loading products...</h1>
                }
            </div>
        </div>
    )
}

export default Home