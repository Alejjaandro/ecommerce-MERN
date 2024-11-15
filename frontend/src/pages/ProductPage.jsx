import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleProduct } from '../redux/productsSlice'

function ProductPage() {

    const dispatch = useDispatch()
    // Get product by id. The id is passed as a parameter in the URL.
    const id = window.location.pathname.split('/')[2]

    useEffect(() => {
        dispatch(getSingleProduct(id))
    }, [dispatch, id])

    const product = useSelector(state => state.products.singleProduct)
    console.log(product);

    return (
        <div className='bg-gray-200 md:ml-[25%] min-h-screen flex justify-center lg:items-center'>
            <div className='w-[90%] p-4 bg-white lg:h-[50%] rounded-md'>
                
                <h1 className='text-4xl md:mt-10 font-bold text-center'>{product.title}</h1>
                
                {product ? (
                    <div className='mt-6'>
                        <div className='flex justify-around md:text-xl'>
                            <div className='flex flex-col items-center gap-4 lg:items-start'>

                                <div className='flex flex-col gap-4 items-center lg:flex-row'>
                                    <img src={`/${product.thumbnail}`} alt={product.title} className='object-contain' />
                                    <span className='text-justify'>{product.description}</span>
                                </div>

                                <div className="w-full flex gap-8 items-center justify-end">
                                    <span className='text-2xl'>${product.price}</span>
                                    <button className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md'>Add to cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )
}

export default ProductPage