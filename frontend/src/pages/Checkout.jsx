import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { createOrder } from "../redux/orderSlice";
import { deleteCart } from '../redux/cartSlice'

// "react-country-region-selector" provides a pair of React components to display connected country and region dropdowns.
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
// A simple and reusable Datepicker component for React.
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Checkout() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.auth.user)
    const cart = useSelector(state => state.cart.cart)
    const error = useSelector(state => state.order.error)
    const success = useSelector(state => state.order.success)

    // For the country and region dropdowns, and the expiration date.
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [billingCountry, setBillingCountry] = useState('');
    const [billingRegion, setBillingRegion] = useState('');
    const startDate = new Date();
    const [pickedDate, setPickedDate] = useState(startDate);

    // Calculate the total price of the cart
    let cartTotal
    if (cart) {
        cartTotal = cart.products.reduce((acc, product) => acc + product.price * product.quantity, 0)
    }

    // For the checkbox "Same as Customer".
    const [sameAsCustomer, setSameAsCustomer] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        let data = Object.fromEntries(formData);

        // Removing empty fields and converting fields to numbers.
        for (let key in data) {
            if (data[key] === '') {
                delete data[key];
            } else if (!isNaN(data[key])) {
                data[key] = Number(data[key]);
            }
        }

        // Add the cost and checkbox to the data object.
        data = { ...data, sameAsCustomer, total: cartTotal };

        dispatch(createOrder({
            userId: user._id,
            cart: cart,
            order: data,
        }))
    }

    // If the order is created successfully, redirect to Thanks page after 3 seconds.
    useEffect(() => {
        if (user && success) {
            setTimeout(() => {
                navigate(`/thank-you/${user._id}`);
                dispatch(deleteCart(user._id));
            }, 3000);
        }
    }, [success, navigate, user, dispatch]);

    return (
        <div className='bg-gray-200 md:ml-[25%] min-h-screen flex justify-center'>
            <div className='w-[90%] p-4 bg-white'>
                <h1 className='text-2xl md:text-4xl my-10 font-bold text-center uppercase'>Checkout</h1>

                {/* CHECKOUT INFO */}
                {user ? (
                    <div className="w-full flex">
                        <form onSubmit={handleSubmit} className='flex flex-col gap-4 lg:w-3/4'>
                            {/* CUSTOMER INFO */}
                            <h1 className="text-2xl uppercase">Customer Info</h1>

                            <div className="p-4 lg:w-3/4 grid gap-2 grid-cols-2">
                                <div className="flex flex-col">
                                    <label>Name:</label>
                                    <input className='p-2 bg-gray-200 rounded-md' type="text" name='name' defaultValue={user.name} />
                                </div>

                                <div className="flex flex-col">
                                    <label>Last Name:</label>
                                    <input className='p-2 bg-gray-200 rounded-md' type="text" name='lastname' defaultValue={user.lastname} />
                                </div>

                                <div className="flex flex-col">
                                    <label>Email:</label>
                                    <input className='p-2 bg-gray-200 rounded-md' type="email" name='email' defaultValue={user.email} />
                                </div>

                                <div className="flex flex-col">
                                    <label>Address:</label>
                                    <input className='p-2 bg-gray-200 rounded-md' type="text" name='address' />
                                </div>

                                <div className="flex flex-col">
                                    <label>Country:</label>
                                    <CountryDropdown
                                        name='country'
                                        value={country}
                                        onChange={(value) => setCountry(value)}
                                        className="p-2 bg-gray-200 rounded-md"
                                    />
                                </div>

                                <div className="md:w-1/2 flex flex-col">
                                    <label>State:</label>
                                    <input className='p-2 bg-gray-200 rounded-md' type="text" name='state' />
                                </div>

                                <div className="md:w-1/2 flex flex-col">
                                    <label>City:</label>
                                    <RegionDropdown
                                        name='city'
                                        className="p-2 bg-gray-200 rounded-md"
                                        disableWhenEmpty={true}
                                        country={country}
                                        value={region}
                                        onChange={setRegion}
                                    />
                                </div>
                                
                                <div className="md:w-1/2 flex flex-col">
                                    <label>Zip Code:</label>
                                    <input className='p-2 bg-gray-200 rounded-md' type="number" name='zipcode' />
                                </div>
                            </div>

                            {/* PAYMENT INFO */}
                            <h1 className="text-2xl uppercase">Payment Info</h1>

                            <div className="p-4 lg:w-3/4 grid gap-2 grid-cols-2">
                                <div className="flex flex-col">
                                    <label>Credit Card Number:</label>
                                    <input className='p-2 bg-gray-200 rounded-md' type="number" name='cardNumber' />
                                </div>

                                <div className="flex flex-col">
                                    <label>Expiration Date:</label>
                                    <DatePicker
                                        name='expirationDate'
                                        className="w-3/4 p-2 bg-gray-200 rounded-md"
                                        selected={pickedDate}
                                        minDate={startDate}
                                        onChange={(date) => setPickedDate(date)}
                                        dateFormat="MM/yyyy"
                                        showMonthYearPicker
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label>CVC:</label>
                                    <input className='p-2 bg-gray-200 rounded-md' type="number" name='cvc' />
                                </div>
                            </div>

                            {/* BILLING ADRESS */}
                            <h1 className="text-2xl uppercase">Billing Adress</h1>

                            <span> Same as Customer: <input type="checkbox" onChange={(e) => setSameAsCustomer(e.target.checked)} /></span>

                            <div className="p-4 lg:w-3/4 grid gap-2 grid-cols-2">

                                <div className="flex flex-col">
                                    <label>Billing Name:</label>
                                    <input
                                        disabled={sameAsCustomer}
                                        className='p-2 bg-gray-200 rounded-md'
                                        type="text"
                                        name='billingName'
                                        defaultValue={`${user.name} ${user.lastname}`}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label>Address:</label>
                                    <input className='p-2 bg-gray-200 rounded-md' type="text" name='billingAddress' disabled={sameAsCustomer} />
                                </div>
                                <div className="flex flex-col">
                                    <label>Country:</label>
                                    <CountryDropdown
                                        name='billingCountry'
                                        value={billingCountry}
                                        onChange={(value) => setBillingCountry(value)}
                                        className="p-2 bg-gray-200 rounded-md"
                                        disabled={sameAsCustomer}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label>State:</label>
                                    <input className='p-2 bg-gray-200 rounded-md' type="text" name='billingState' disabled={sameAsCustomer} />
                                </div>
                                <div className="flex flex-col">
                                    <label>City:</label>
                                    <RegionDropdown
                                        name='billingCity'
                                        className="p-2 bg-gray-200 rounded-md"
                                        disableWhenEmpty={true}
                                        country={billingCountry}
                                        value={billingRegion}
                                        onChange={setBillingRegion}
                                        disabled={sameAsCustomer}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label>Zip Code:</label>
                                    <input className='p-2 bg-gray-200 rounded-md' type="number" name='billingZipcode' disabled={sameAsCustomer} />
                                </div>
                            </div>

                            {/* ERROR */}
                            {error && <p className='text-red-500'>{error}</p>}

                            {/* SUCCESS */}
                            {success && <p className='text-green-500'>{success}</p>}

                            {/* BUTTONS */}
                            <div className="flex gap-4">
                                <button className='bg-green-500 text-white font-bold p-2 rounded-md hover:bg-green-700' type='submit'>CHECKOUT</button>
                                <a className='bg-blue-500 text-white font-bold p-2 rounded-md hover:bg-blue-700' href={`/cart/${user._id}`}>Back To Cart</a>
                            </div>
                        </form>

                        {/* CART INFO */}
                        {cart ? (
                            <div className='hidden md:inline w-1/4 h-min p-2 border-2'>

                                <h1 className='mb-4 pb-2 text-base lg:text-2xl text-center uppercase border-b-2'>Cart Info</h1>

                                <div className='p-2 flex flex-col max-h-[50vh] overflow-y-scroll items-center gap-2'>
                                    {cart.products.map(product => (
                                        <div key={product._id} className='pb-4 flex flex-col items-center justify-between border-b-2'>
                                            <img src={`/${product.thumbnail}`} className="w-3/4 object-contain lg:w-full" alt={product.title} />
                                            <p className="text-center">{product.title}</p>
                                            <p className="font-medium">{product.price}€ <span className="font-thin">x{product.quantity}</span></p>
                                        </div>
                                    ))}

                                </div>

                                <div className='mt-2 lg:text-xl uppercase text-center font-bold'>
                                    <p>Total Purchase:</p>
                                    <p>{cart.totalPrice.toFixed(2)}€</p>
                                </div>
                            </div>
                        ) : (
                            <h1 className='text-xl md:text-2xl text-center'>No cart</h1>
                        )}
                    </div>
                ) : (
                    <h1 className='text-xl md:text-2xl text-center'>No cart</h1>
                )}
            </div >
        </div >
    )
}

export default Checkout