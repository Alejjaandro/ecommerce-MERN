import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice'
import { useState } from 'react';

function ProductCard({ product }) {

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const addToCartButton = (product) => {
        if (!user) {
            setError('Log in first')
            setTimeout(() => {
                setError(null)
            }, 3000)

            return
        } else {
            dispatch(addToCart({ userId: user._id, product }))
            setSuccess('Added to cart')
            setTimeout(() => {
                setSuccess(null)
            }, 3000)
        }
    }

    return (
        <div className='border border-gray-300 p-4 flex flex-col justify-between'>
                        
            <div className='mb-4'>
                <img src={`/${product.thumbnail}`} alt={product.title} className='w-full h-52 object-contain' />
                <a href={`/product/${product._id}`} className='text-lg font-semibold mt-2 hover:underline'>{product.title}</a>
                <p className='text-sm font-light mt-2'>{product.price.toFixed(2)}€</p>
            </div>
            
            {error && (
                <p className='mb-4 text-red-500 text-center mt-4'>{error}</p>
            )}
            {success && (
                <p className='mb-4 text-green-500 text-center mt-4'>{success}</p>
            )}

            <button onClick={()=>addToCartButton(product)} className='w-full md:w-fit p-2 bg-blue-500 text-white self-end hover:bg-blue-700 rounded-md'>Add to Cart</button>        
        </div>
    )
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
};

export default ProductCard