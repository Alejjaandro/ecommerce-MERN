import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

function ThankYou() {
    const navigate = useNavigate();
    const order = useSelector((state) => state.order.order);

    const handleButton = () => {
        navigate('/');
    }

    return (
        <div className='bg-gray-200 md:ml-[25%] min-h-screen flex justify-center items-center'>
            <div className='w-[90%] h-1/2 p-4 bg-white rounded-md'>

                <h1 className='text-2xl md:text-4xl font-bold text-center uppercase'>
                    Thanks for your order!
                    <p className="mt-4 normal-case font-normal">Here are the details:</p>
                </h1>

                {order ? (
                    <div className='mt-4 p-4 border-2 text-center'>
                        <h1 className='my-2 p-2 bg-gray-200 text-xl md:text-2xl text-center font-semibold'>Order ID: {order._id}</h1>

                        <div className='text-left pb-4 border-b-4'>
                            <p className='text-lg'>{order.orderInfo.name} {order.orderInfo.lastname}</p>
                            <p className='text-lg'>{order.orderInfo.country}</p>
                            <p className='text-lg'>{order.orderInfo.state}</p>
                            <p className='text-lg'>{order.orderInfo.city} - {order.orderInfo.zipcode}</p>
                            <p className='text-lg'>{order.orderInfo.address}</p>
                        </div>

                        <p className="my-4 text-xl text-center uppercase">Products:</p>
                        <div className='flex items-center overflow-x-scroll'>
                            {order.products.map((item) => (
                                <div key={item._id} className='p-2 w-full flex flex-col gap-2 items-center border-r-2'>

                                    <img src={`/${item.thumbnail}`} className="object-contain" alt={item.title} />

                                    <p className="flex gap-2 font-semibold">
                                        {item.price}€ <span className="font-extralight">x{item.quantity}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                        <p className='my-4 text-xl font-semibold uppercase'>Total: {order.orderInfo.total}€</p>
                    </div>
                ) : (
                    <h1 className='text-2xl my-10 text-center'>Loading order...</h1>
                )}

                <button onClick={handleButton} className='mt-4 bg-blue-500 text-white font-bold p-2 rounded-md hover:bg-blue-700'>Go Home</button>

            </div>
        </div >
    )
}

export default ThankYou