import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../redux/userSlice'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()
        
        // Save data in local storage
        const user = {
            email: e.target[0].value,
            password: e.target[1].value,
        }

        dispatch(login(user))

        // Redirect to home page
        navigate('/')
    }

    return (
        <div className='bg-gray-200 md:ml-[25%] min-h-screen flex justify-center'>
            <div className='bg-white w-[90%]'>
                <div className='h-full flex flex-col justify-center items-center'>
                    
                    <div className='h-1/2 w-full bg-pink-900 flex flex-col justify-center items-center'>

                        <h1 className='text-4xl p-4 uppercase text-white'>Login</h1>
                        <form action="" method='POST' onSubmit={onSubmit}>
                            <div className='flex flex-col gap-4 p-4'>
                                <input type="email" placeholder='Email' className='p-2 border-2 border-gray-300' required/>
                                <input type="password" placeholder='Password' className='p-2 border-2 border-gray-300' required/>
                                <button type='submit' className='bg-pink-600 hover:bg-pink-700 text-white p-2 uppercase'>Login</button>
                            </div>
                        </form>

                        <a href="/register" className='text-white hover:underline'>Don&apos;t have an account? Register</a>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login