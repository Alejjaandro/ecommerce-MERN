import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleProduct } from '../redux/productsSlice'
import { addToCart } from '../redux/cartSlice'

import { FaCircleArrowLeft } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { IoIosRemoveCircle } from "react-icons/io";

function ProductPage() {

    const dispatch = useDispatch()
    // Get product by id. The id is passed as a parameter in the URL.
    const id = window.location.pathname.split('/')[2]

    useEffect(() => {
        dispatch(getSingleProduct(id))
    }, [dispatch, id])

    const product = useSelector(state => state.products.singleProduct)
    const user = useSelector(state => state.auth.user)

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [quantity, setQuantity] = useState(1)

    const addToCartButton = (product) => {
        if (!user) {
            setError('You need to be logged in to add products to the cart')
            setTimeout(() => {
                setError(null)
            }, 3000)

            return
        } else {
            dispatch(addToCart({ userId: user._id, product, quantity }))
            setSuccess('Added to cart')
            setTimeout(() => {
                setSuccess(null)
            }, 3000)
        }
    }

    const increaseQuantity = () => setQuantity(quantity + 1)
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1)
    }

    return (
        <div className='bg-gray-200 md:ml-[25%] min-h-screen flex justify-center items-center'>
            <div className='w-[90%] p-4 bg-white rounded-md'>
                
                <a href="/products" className='flex items-center gap-2 hover:underline'><FaCircleArrowLeft/> Back to products page</a>
                
                {product ? (
                    <div className='mt-6'>
                        <h1 className='my-4 text-4xl md:mt-10 font-bold text-center'>{product.title}</h1>
                        <div className='flex justify-around md:text-xl'>
                            <div className='flex flex-col items-center gap-4 lg:items-start'>

                                <div className='flex flex-col gap-4 items-center lg:flex-row'>
                                    <img src={`/${product.thumbnail}`} alt={product.title} className='w-1/2 object-contain' />
                                    <span className='text-justify'>{product.description}</span>
                                </div>

                                <div className="w-full flex flex-col md:flex-row gap-8 items-center justify-end">
                                    <div className="flex gap-4 items-center">
                                        <button onClick={decreaseQuantity} className='text-2xl'><IoIosRemoveCircle/></button>
                                        <span className='text-2xl'>{quantity}</span>
                                        <button onClick={increaseQuantity} className='text-2xl'><IoIosAddCircle/></button>
                                    </div>
                                    <span className='text-2xl'>{product.price}€</span>
                                    <button onClick={() => addToCartButton(product)} className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md'>Add to cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}

                {error && (
                    <p className='text-red-500 text-center mt-4'>{error}</p>
                )}
                {success && (
                    <p className='text-green-500 text-center mt-4'>{success}</p>
                )}

            </div>
        </div>
    )
}

export default ProductPage