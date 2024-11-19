import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { deleteUser } from '../redux/authSlice';

function UserProfile() {
    const  navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const [warning ,setWarning] = useState(false)

    let createdDate;
    let createdHour;
    let updatedDate;
    let updatedHour;
   
    if (user) {
        createdDate = format(new Date(user.createdAt), "dd/MM/yyyy");
        createdHour = format(new Date(user.createdAt), "HH:mm:ss");

        updatedDate = format(new Date(user.updatedAt), "dd/MM/yyyy");
        updatedHour = format(new Date(user.updatedAt), "HH:mm:ss");
    }

    const displayWarning = () => {
        setWarning(!warning)
    }

    const handleDelete = () => {
        dispatch(deleteUser(user._id))
        alert('Your account has been deleted')
        navigate('/')
    }
    
    return (
        <div className='bg-gray-200 md:ml-[25%] min-h-screen flex justify-center items-center'>
            <div className='w-[90%] p-4 bg-white md:h-[50%] rounded-md'>
                <h1 className='my-4 text-4xl md:mt-10 uppercase text-center'>Your Profile</h1>
                {user ? (
                    <div className='mt-6'>
                        <div className='flex flex-col items-center gap-4 lg:text-xl'>

                            <div className='w-3/4 text-center grid grid-cols-2 gap-4'>

                                <p className='flex flex-col'>
                                    <span className='uppercase font-bold'>Name:</span>
                                    <span className=''>{user.name}</span>
                                </p>

                                <p className='flex flex-col'>
                                    <span className='uppercase font-bold'>Lastname:</span>
                                    <span className=''>{user.lastname}</span>
                                </p>

                            </div>

                            <div className='w-3/4 text-center grid grid-cols-2 gap-4'>

                                <p className='flex flex-col'>
                                    <span className='uppercase font-bold'>Userame:</span>
                                    <span className=''>{user.username}</span>
                                </p>

                                <p className='flex flex-col'>
                                    <span className='uppercase font-bold'>Email:</span>
                                    <span className=''>{user.email}</span>
                                </p>

                            </div>

                            <div className='w-3/4 text-center grid grid-cols-1 md:grid-cols-2 gap-4'>

                                <p className='flex flex-col'>
                                    <span className='uppercase font-bold'>Created:</span>
                                    <span className=''>{createdDate} at {createdHour}</span>
                                </p>

                                <p className='flex flex-col'>
                                    <span className='uppercase font-bold'>Last Update:</span>
                                    <span className=''>{updatedDate} at {updatedHour}</span>
                                </p>

                            </div>

                            <div className="my-4 w-full md:w-3/4 text-center grid grid-cols-2 gap-4">
                                <a href={`/settings/${user._id}`} className="p-2 md:p-4 bg-blue-400 hover:bg-blue-700">Edit Profile</a>
                                <button onClick={displayWarning} className="p-2 md:p-4 bg-red-400 hover:bg-red-700">Delete Account</button>
                            </div>

                        </div>

                        {warning && (
                            <div className="p-4 flex flex-col items-center gap-4 bg-red-400 text-white uppercase">
                                <p className='text-center'>Are you sure you want to delete your account?</p>
                                <div className='w-full md:w-1/2 flex gap-1'>
                                    <button onClick={() => handleDelete(user._id)} className="w-full p-4 bg-red-700 hover:bg-red-900">Yes</button>
                                    <button onClick={() => setWarning(false)} className="w-full p-4 bg-blue-700 hover:bg-blue-900">No</button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className='mt-6'>
                        <h1 className='my-4 text-4xl md:mt-10 font-bold text-center'>Loading info...</h1>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserProfile