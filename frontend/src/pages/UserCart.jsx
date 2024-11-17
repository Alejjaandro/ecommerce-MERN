import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { removeFromCart, deleteCart } from '../redux/cartSlice'

function UserCart() {

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const cart = useSelector(state => state.cart.cart)
    let cartTotal
    
    // Calculate the total price of the cart
    if (cart) {
        cartTotal = cart.products.reduce((acc, product) => acc + product.price * product.quantity, 0)
    }

    const onRemove = (product) => {       
        dispatch(removeFromCart({ 
                userId: user._id, 
                productId: product._id, 
                product 
            })
        )
    }

    const removeAll = () => {
        dispatch(deleteCart(user._id))
    }

    
    return (
        <div className='bg-gray-200 md:ml-[25%] min-h-screen flex justify-center'>
            <div className='w-[90%] p-4 bg-white'>
                {user && <h1 className='text-2xl md:text-4xl md:my-10 font-bold text-center'>Hi! {user.username}</h1>}

                {cart ? (
                    <div className='my-4 flex flex-col gap-4'>

                        <div className='my-4 flex flex-col gap-4 md:flex-row justify-between items-center'>
                            <h1 className='text-xl md:text-2xl uppercase'>Your cart:</h1>
                            <div className='flex gap-4'>
                                <button onClick={removeAll} className='bg-red-500 text-white font-bold p-2 rounded-md hover:bg-red-700'>Remove All</button>
                                <a href='/' className='bg-green-500 text-white font-bold p-2 rounded-md hover:bg-green-700'>Checkout Now!</a>
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                            {cart.products.map((product, index) => (
                                <div key={index} className='flex flex-col justify-between gap-4 p-4 border-2 border-gray-300'>

                                    <div className='h-full flex flex-col justify-around text-center'>
                                        <img src={`/${product.thumbnail}`} className='w-1/2 self-center' alt={product.title} />
                                        <h1 className='text-xl font-bold flex flex-col'>
                                            {product.title}
                                            <span className='font-light text-base'> x {product.quantity}</span>
                                        </h1>
                                        <p className='md:text-lg mt-4'>{(product.price*product.quantity)}€</p>
                                    </div>

                                    <div className='flex gap-2'>
                                        <button className='w-1/2 self-center bg-blue-500 text-white font-bold p-2 rounded-md hover:bg-blue-700'>Buy</button>
                                        <button onClick={()=>onRemove(product)} className='w-1/2 self-center bg-red-500 text-white font-bold p-2 rounded-md hover:bg-red-700'>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='mt-4 uppercase gap-4 flex justify-end'>
                            <h1 className='text-2xl font-bold'>Total:</h1>
                            <p className='text-2xl font-bold'>{cartTotal}€</p>
                        </div>
                    </div>
                )
                    : <h1 className='h-1/2 text-4xl text-center flex justify-center items-center'>Your cart is empty</h1>
                }
            </div>
        </div >
    )
}

export default UserCart