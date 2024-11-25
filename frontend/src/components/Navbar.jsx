import { useEffect, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { logout, verifyToken } from '../redux/authSlice'
import { getCart } from '../redux/cartSlice';

const Navbar = () => {
    const [menu, setMenu] = useState(false);
    const [adminMenu, setAdminMenu] = useState(false);
    const [sidebar, setSidebar] = useState(false);
    const handleSidebar = () => setSidebar(!sidebar);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const categories = useSelector(state => state.products.allCategories)
    const user = useSelector(state => state.auth.user)

    const displayMenu = () => setMenu(!menu)
    const displayAdminMenu = () => setAdminMenu(!adminMenu)

    const cartTotal = useSelector(state => state.cart.cartTotal)

    useEffect(() => {
        if (user) {
            dispatch(getCart())
            // Chack if the token has expired
            dispatch(verifyToken())
        }
    }, [dispatch, user, cartTotal])

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }
    return (
        <div >
            <div className={(user && user.isAdmin ? 'bg-amber-500' : 'bg-black') + ' w-1/4 fixed h-full font-medium uppercase hidden md:flex flex-col justify-around'}>
                {/* LOGO & MENU */}
                <div className='flex flex-col items-center'>
                    <img src="/CompanyLogo.png" alt="image" width={150} height={150} className='mb-10' />
                    {(user && user.isAdmin) && (<p className='text-white mb-10'>Admin</p>)}

                    <ul className='w-full text-white'>
                        <li className='p-4 hover:line-through border-t-2 border-b-2'><a href={`/`}>Home</a></li>
                        <li className='p-4 list-none group border-b-2'>
                            <p onClick={displayMenu} className='hover:line-through hover:cursor-pointer flex justify-between items-center'>
                                Products {menu ? <FaCircleArrowUp /> : <FaCircleArrowDown />}
                            </p>

                            <div className={!menu ? 'hidden' : 'flex flex-col gap-4 p-4 font-normal capitalize'}>
                                <a href="/products" className='hover:line-through border-b-2'>All Products</a>
                                {categories.map((category, index) => (
                                    <a key={index} href={`/products/${category}`} className='hover:line-through border-b-2'>{category}</a>
                                ))}
                            </div>

                        </li>
                        <li className='p-4 hover:line-through border-b-2'><a href={`/aboutUs`}>Who we Are</a></li>

                        {/* ADMIN ROUTES */}
                        {user && user.isAdmin && (
                            <li className='p-4 list-none group border-b-2'>
                                <p onClick={displayAdminMenu} className='hover:line-through hover:cursor-pointer flex justify-between items-center'>
                                    Admin Options {adminMenu ? <FaCircleArrowUp /> : <FaCircleArrowDown />}
                                </p>

                                <div className={!adminMenu ? 'hidden' : 'flex flex-col gap-4 p-4 font-normal capitalize'}>
                                    <a href="/admin-all-products" className='hover:line-through border-b-2'>All Products</a>
                                    <a href="/create-product" className='hover:line-through border-b-2'>Create Product</a>
                                    <a href="/all-users" className='hover:line-through border-b-2'>All Users</a>
                                </div>
                            </li>
                        )}

                    </ul>
                </div>

                {/* LOGIN */}
                {!user ? (
                    <div className='mt-10 p-4 flex flex-col gap-4'>
                        <a href="/login" className='w-1/2 hover:underline text-pink-700 lg:text-xl'>Login</a>
                        <a href="/register" className='w-1/2 hover:underline text-sky-800 lg:text-xl'>Register</a>
                    </div>
                ) : (
                    <div className='mt-10 p-4 flex flex-col lg:text-xl'>
                        <p className='text-white my-4'>Welcome! {user.username}</p>
                        <a href={`/cart/${user._id}`} className='w-fit text-white hover:underline capitalize'>Your cart ({cartTotal})</a>
                        <a href={`/orders/${user._id}`} className='w-fit text-white hover:underline capitalize'>Your Orders</a>
                        <a href={`/profile/${user._id}`} className='w-fit text-white hover:underline capitalize'>Your profile</a>
                        <a href={`/settings/${user._id}`} className='w-fit text-white hover:underline capitalize'>Settings</a>
                        <button onClick={handleLogout} className='w-1/2 my-4 text-justify uppercase text-pink-700 hover:underline'>Logout</button>
                    </div>
                )}

                {/* CONTACT */}
                <div className='p-4 text-white text-sm lg:text-base'>
                    <p className='mt-10 mb-4'>Contact</p>
                    <span className='capitalize block my-2'>Adress: <span className='font-light normal-case'>C/Example, 29001 Málaga</span></span>
                    <span className='capitalize block my-2'>Phone: <span className='font-light'> +34 952 999 999</span></span>
                    <span className='capitalize block my-2'>Email: <span className='font-light normal-case'>company@email.com</span></span>
                </div>
            </div>

            {/* MOBILE NAVBAR */}
            <div className={(user && user.isAdmin ? 'bg-amber-500' : 'bg-black') + ' md:hidden p-4 flex justify-between'}>
                <div onClick={handleSidebar} className="flex items-center text-white">
                    <AiOutlineMenu size={25} />
                </div>
                <img src={"/CompanyLogo.png"} alt="image" width={50} height={50} />
            </div>

            <div className={sidebar ? "md:hidden fixed w-full h-screen bg-black/70 z-10" : ""}>
                <div className={
                    sidebar
                        ? (user && user.isAdmin ? 'bg-amber-500' : 'bg-black') + " fixed h-screen ease-in duration-500"
                        : "fixed left-[-100%] ease-in duration-500"
                }>
                    <div className="flex w-full uppercase">
                        <div>
                            <ul className='w-full text-white'>
                                <li className='p-4 hover:line-through border-t-2 border-b-2'><a href={`/`}>Home</a></li>
                                <li className='p-4 list-none group border-b-2'>
                                    <p onClick={displayMenu} className='hover:line-through hover:cursor-pointer flex justify-between items-center'>
                                        Products {menu ? <FaCircleArrowUp /> : <FaCircleArrowDown />}
                                    </p>

                                    <div className={!menu ? 'hidden' : 'flex flex-col gap-4 p-4 font-normal capitalize'}>
                                        <a href="/products" className='hover:line-through border-b-2'>All Products</a>
                                        {categories.map((category, index) => (
                                            <a key={index} href={`/products/${category}`} className='hover:line-through border-b-2'>{category}</a>
                                        ))}
                                    </div>
                                </li>
                                <li className='p-4 hover:line-through border-b-2'><a href={`/whoAreWe`}>Who we Are</a></li>

                                {/* ADMIN ROUTES */}
                                {user && user.isAdmin && (
                                    <li className='p-4 list-none group border-b-2'>
                                        <p onClick={displayAdminMenu} className='hover:line-through hover:cursor-pointer flex justify-between items-center'>
                                            Admin Options {adminMenu ? <FaCircleArrowUp /> : <FaCircleArrowDown />}
                                        </p>

                                        <div className={!adminMenu ? 'hidden' : 'flex flex-col gap-4 p-4 font-normal capitalize'}>
                                            <a href="/admin-all-products" className='hover:line-through border-b-2'>All Products</a>
                                            <a href="/create-product" className='hover:line-through border-b-2'>Create Product</a>
                                            <a href="/all-users" className='hover:line-through border-b-2'>All Users</a>
                                        </div>
                                    </li>
                                )}

                            </ul>

                            {/* LOGIN */}
                            {!user ? (
                                <div className='mt-10 p-4 flex flex-col gap-4'>
                                    <a href="/login" className='w-1/2 hover:underline text-pink-700'>Login</a>
                                    <a href="/register" className='w-1/2 hover:underline text-sky-800'>Register</a>
                                </div>
                            ) : (
                                <div className='mt-10 p-4 flex flex-col'>
                                    <p className='text-white my-4'>Welcome! {user.username}</p>
                                    <a href={`/cart/${user._id}`} className='w-fit text-white hover:underline capitalize'>Your cart ({cartTotal})</a>
                                    <a href={`/orders/${user._id}`} className='w-fit text-white hover:underline capitalize'>Your Orders</a>
                                    <a href={`/profile/${user._id}`} className='w-fit text-white hover:underline capitalize'>Your profile</a>
                                    <a href={`/settings/${user._id}`} className='w-fit text-white hover:underline capitalize'>Settings</a>
                                    <button onClick={() => dispatch(logout())} className='w-1/2 my-4 text-justify uppercase text-pink-700 hover:underline'>Logout</button>
                                </div>
                            )}

                            {/* CONTACT */}
                            <div className='p-4 text-white text-sm'>
                                <p className='mt-10 mb-4'>Contact</p>
                                <span className='capitalize block my-2'>Adress: <span className='font-light normal-case'>C/Example, 29001 Málaga</span></span>
                                <span className='capitalize block my-2'>Phone: <span className='font-light'> +34 952 999 999</span></span>
                                <span className='capitalize block my-2'>Email: <span className='font-light normal-case'>company@email.com</span></span>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
