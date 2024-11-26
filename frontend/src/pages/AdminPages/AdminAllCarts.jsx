import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getAllCarts } from '../../redux/adminSlice'

function AdminAllCarts() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCarts());
    }, [dispatch]);

    const allCarts = useSelector(state => state.admin.allCarts);

    return (
        <div className='bg-gray-200 md:ml-[25%] min-h-screen flex justify-center'>
            <div className='w-[90%] p-4 bg-white'>
                <h1 className='text-xl md:text-4xl my-10 font-bold text-center uppercase'>Carts Administration</h1>

                {allCarts ? (
                    allCarts.map((cart, index) => (
                        <div key={index} className='border-y-2 border-gray-300 p-4'>
                            <h1 className='my-4 md:text-lg font-bold text-center uppercase'>User ID: {cart._id}</h1>
                            <h1 className='md:text-lg'>Products Quantity: {cart.productsQuantity}</h1>
                            <h1 className='md:text-lg font-bold'>Total Price: {cart.totalPrice.toFixed(2)}€</h1>
                            
                            <div className='flex items-center overflow-x-scroll'>
                                {cart.products.map((product, index) => (
                                    <div key={index} className='flex flex-col justify-between gap-4 border-r-2 border-gray-300 p-4'>
                                        <img className='w-30 md:w-40' src={`/${product.thumbnail}`} alt="" />
                                        <div className='w-32 md:w-40'>
                                            <p className='md:text-lg'>{product.title}</p>
                                            <p className='md:text-lg'>x{product.quantity}</p>
                                            <p className='md:text-lg'>{product.price.toFixed(2)}€</p>
                                        </div>
                                         <p className='md:text-lg font-bold'>Total: {(product.price * product.quantity).toFixed(2)}€</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <h1 className='text-center'>No Carts</h1>
                )}
            </div>
        </div>
    )
}

export default AdminAllCarts