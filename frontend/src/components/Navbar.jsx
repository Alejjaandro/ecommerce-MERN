import { useEffect, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getUser, logout } from '../redux/userSlice'

const Navbar = () => {
    const [sidebar, setSidebar] = useState(false);
    const handleSidebar = () => setSidebar(!sidebar);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    const user = useSelector(state => state.user)

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
                            <p className='hover:line-through'>Products</p>
                            <div className='hidden group-hover:flex flex-col gap-4 p-4 font-normal normal-case'>
                                <a href="/products" className='hover:line-through border-b-2'>All</a>
                                <a href="/products/pc" className='hover:line-through border-b-2'>PC</a>
                                <a href="/products/laptops" className='hover:line-through border-b-2'>Laptops</a>
                                <a href="/products/headphones" className='hover:line-through border-b-2'>Headphones</a>
                                <a href="/products/smartphones" className='hover:line-through border-b-2'>Smartphones</a>
                            </div>
                        </li>
                        <li className='p-4 hover:line-through border-b-2'><a href={`/aboutUs`}>Who we Are</a></li>
                    </ul>
                </div>

                {/* LOGIN */}
                {!user ? (
                    <div className='mt-10 p-4 flex flex-col gap-4'>
                        <a href="/login" className='w-1/2 hover:underline text-pink-700'>Login</a>
                        <a href="/register" className='w-1/2 hover:underline text-sky-800'>Register</a>
                    </div>
                ) : (
                    <div className='mt-10 p-4'>
                        <p className='text-white'>Welcome! {user.username}</p>
                        <button onClick={() => dispatch(logout())} className='w-1/2 text-justify uppercase text-pink-700 hover:underline'>Logout</button>
                    </div>
                )}

                {/* CONTACT */}
                <div className='p-4 text-white'>
                    <p className='mt-10 mb-4'>Contact</p>
                    <span className='capitalize block m-2'>Adress: <span className='font-light normal-case'>C/Example, 29001 Málaga</span></span>
                    <span className='capitalize block m-2'>Phone: <span className='font-light'> +34 952 999 999</span></span>
                    <span className='capitalize block m-2'>Email: <span className='font-light normal-case'>company@email.com</span></span>
                </div>
            </div>

            {/* MOBILE NAVBAR */}
            <div className={(user && user.isAdmin ? 'bg-amber-500' : 'bg-black') + ' md:hidden p-4 flex justify-between'}>
                <div onClick={handleSidebar} className="flex items-center text-white">
                    <AiOutlineMenu size={25} />
                </div>
                <img src={"CompanyLogo.png"} alt="image" width={50} height={50} />
            </div>

            <div className={sidebar ? "md:hidden fixed w-full h-screen bg-black/70 z-10" : ""}>
                <div className={
                    sidebar
                        ? (user && user.isAdmin ? 'bg-amber-500' : 'bg-black') + " fixed h-screen ease-in duration-500"
                        : "fixed left-[-100%] ease-in duration-500"
                }>
                    <div className="flex w-full">
                        <div>
                            <ul className='w-full text-white uppercase'>
                                <li className='p-4 hover:line-through border-t-2 border-b-2'><a href={`/`}>Home</a></li>
                                <li className='p-4 list-none group border-b-2'>
                                    <p className='hover:line-through'>Products</p>
                                    <div className='hidden group-hover:flex flex-col gap-4 p-4 font-normal normal-case'>
                                        <a href="/products" className='hover:line-through border-b-2'>All</a>
                                        <a href="/products/pc" className='hover:line-through border-b-2'>PC</a>
                                        <a href="/products/laptops" className='hover:line-through border-b-2'>Laptops</a>
                                        <a href="/products/headphones" className='hover:line-through border-b-2'>Headphones</a>
                                        <a href="/products/smartphones" className='hover:line-through border-b-2'>Smartphones</a>
                                    </div>
                                </li>
                                <li className='p-4 hover:line-through border-b-2'><a href={`/whoAreWe`}>Who we Are</a></li>
                            </ul>

                            {/* LOGIN */}
                            {!user ? (
                                <div className='mt-10 p-4 flex flex-col gap-4'>
                                    <a href="/login" className='w-1/2 hover:underline text-pink-700'>Login</a>
                                    <a href="/register" className='w-1/2 hover:underline text-sky-800'>Register</a>
                                </div>
                            ) : (
                                <div className='mt-10 p-4'>
                                    <p className='text-white'>Welcome! {user.username}</p>
                                    <button onClick={() => dispatch(logout())} className='w-1/2 text-justify uppercase text-pink-700 hover:underline'>Logout</button>
                                </div>
                            )}

                            {/* CONTACT */}
                            <div className='p-4 text-white'>
                                <p className='mt-10 mb-4'>Contact</p>
                                <span className='capitalize block m-2'>Adress: <span className='font-light normal-case'>C/Example, 29001 Málaga</span></span>
                                <span className='capitalize block m-2'>Phone: <span className='font-light'> +34 952 999 999</span></span>
                                <span className='capitalize block m-2'>Email: <span className='font-light normal-case'>company@email.com</span></span>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Navbar