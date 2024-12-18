import { useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard'
import SkeletonProductCard from '../components/SkeletonProductCard'

function Home() {
    const products = useSelector(state => state.products.allProducts)
    
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

                <div className='mt-4'>
                    <a className='block p-2 bg-gray-200 text-2xl uppercase hover:underline' href='/products/laptops'>Laptops</a>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                        {products ? laptops.map(product => (
                            <ProductCard key={product._id} product={product} />
                        )) : Array(3).fill().map((_, i) => (
                            <SkeletonProductCard key={i} />
                        ))}
                    </div>
                </div>

                <div className='mt-4'>
                    <a className='block p-2 bg-gray-200 text-2xl uppercase hover:underline' href='/products/pc'>PCs</a>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                        {products ? pcs.map(product => (
                            <ProductCard key={product._id} product={product} />
                        )) : Array(3).fill().map((_, i) => (
                            <SkeletonProductCard key={i} />
                        ))}
                    </div>
                </div>

                <div className='mt-4'>
                    <a className='block p-2 bg-gray-200 text-2xl uppercase hover:underline' href='/products/smartphones'>Smartphones</a>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                        {products ? smartphones.map(product => (
                            <ProductCard key={product._id} product={product} />
                        )) : Array(3).fill().map((_, i) => (
                            <SkeletonProductCard key={i} />
                        ))}
                    </div>
                </div>

                <div className='mt-4'>
                    <a className='block p-2 bg-gray-200 text-2xl uppercase hover:underline' href='/products/headphones'>Headphones</a>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                        {products ? headphones.map(product => (
                            <ProductCard key={product._id} product={product} />
                        )) : Array(3).fill().map((_, i) => (
                            <SkeletonProductCard key={i} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home