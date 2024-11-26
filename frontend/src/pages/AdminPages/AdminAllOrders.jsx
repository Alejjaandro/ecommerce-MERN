import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getAllOrders } from '../../redux/adminSlice'
import { format } from 'date-fns';

function AdminAllCarts() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    function formatDate(date) {
        const createdDate = format(new Date(date), "dd/MM/yyyy HH:mm:ss");
        return createdDate;
    }

    // Get all orders from the store 
    const allOrders = useSelector(state => state.admin.allOrders);
    // Initialize the state with all orders.
    const [filteredOrders, setFilteredOrders] = useState(allOrders);
    useEffect(() => {
        setFilteredOrders(allOrders);
    }, [allOrders]);
    
    const emailFilter = (e) => {
        // Get the value from the input and filter the orders.
        const email = e.target.value;
        const filtered = filteredOrders.filter(order => order.orderInfo.email.toLowerCase().includes(email.toLowerCase()));
        setFilteredOrders(filtered);

        if (email === '') {
            setFilteredOrders(allOrders);
        }
    }

    return (
        <div className='bg-gray-200 md:ml-[25%] min-h-screen flex justify-center'>
            <div className='w-[90%] p-4 bg-white'>
                <h1 className='text-xl md:text-4xl my-10 font-bold text-center uppercase'>Orders Administration</h1>
                
                <div className='my-10 flex flex-col sm:flex-row gap-2'>
                    <label>Search by email:</label>
                    <input onChange={emailFilter} className='bg-gray-200 rounded' type="text"/>
                </div>

                {(filteredOrders && filteredOrders.length > 0) ? (
                    <div className='overflow-x-auto'>
                        <table className='w-full text-center'>
                            <thead className=''>
                                <tr className='border-b-2 border-gray-300'>
                                    <th className='py-2'>Order ID</th>
                                    <th className='py-2'>User</th>
                                    <th className='py-2'>Email</th>
                                    <th className='py-2'>Address</th>
                                    <th className='py-2'>Order Date</th>
                                    <th className='py-2'>Products</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map(order => (
                                    <React.Fragment key={order._id}>
                                        <tr className='border-b border-gray-300 whitespace-nowrap'>
                                            <td className='p-2'>
                                                <a className='hover:underline' href={`/order-details/${order._id}`}>{order._id}</a>
                                            </td>
                                            <td className='p-2'>{order.orderInfo.name} {order.orderInfo.lastname}</td>
                                            <td className='p-2'>{order.orderInfo.email}</td>
                                            <td className='p-2'>
                                                {order.orderInfo.city}, {order.orderInfo.zipcode}, {order.orderInfo.country}
                                            </td>
                                            <td className='p-2'>{formatDate(order.createdAt)}</td>
                                            <td className='pl-4 p-2 text-right'>
                                                {order.products.map(product => (
                                                    <p key={product._id}>{product.title} x {product.quantity}</p>
                                                ))}
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>

                ) : (
                    <h1 className='text-center'>No Orders</h1>
                )}
            </div>
        </div>
    )
}

export default AdminAllCarts