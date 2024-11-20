import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getOrders } from '../redux/orderSlice'
import { useEffect } from 'react'
import { format } from 'date-fns';

function UserOrders() {

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const userOrders = useSelector(state => state.order.userOrders)

    useEffect(() => {
        if (user) {
            dispatch(getOrders(user._id))
        }
    }, [user, dispatch])

    // Function to format the date.
    function formatDate(date) {
        const createdDate = format(new Date(date), "dd/MM/yyyy HH:mm:ss");
        return createdDate;
    }

    return (
        <div className='bg-gray-200 md:ml-[25%] min-h-screen flex justify-center'>
            <div className='w-[90%] p-4 bg-white'>
                {user && <h1 className='text-2xl md:text-4xl md:my-10 font-bold text-center'>Hi! {user.username}</h1>}

                <div className='flex flex-col'>
                    {userOrders ? userOrders.map(order => (
                        <div key={order._id} className='flex flex-col lg:flex-row justify-between items-center border-b-4 p-4'>

                            <div className='mb-4'>
                                <h1 className='text-lg md:text-xl font-bold'>Order ID: {order._id}</h1>
                                <p className='text-sm'>Total Price: {order.orderInfo.total}€</p>
                                <p className='text-sm'>Date: {formatDate(order.createdAt)}</p>
                            </div>

                            <div className='pr-4 md:w-1/2 max-h-[50vh] overflow-y-scroll'>
                                {/* <h1 className='text-lg font-semibold uppercase'>Products</h1> */}
                                {order.products.map(product => (
                                    <div key={product._id} className='py-2 w-full grid grid-cols-3 border-b-2'>
                                        <img className='self-center' src={`/${product.thumbnail}`} alt="" />
                                        <p className='text-center self-center'>{product.title}</p>
                                        <p className='text-center self-center'>x {product.quantity}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                        : <h1 className='text-2xl font-bold text-center'>No Orders</h1>
                    }

                </div>
            </div>
        </div >
    )
}

export default UserOrders