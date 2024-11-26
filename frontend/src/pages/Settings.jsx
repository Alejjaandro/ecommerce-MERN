import { useDispatch, useSelector } from 'react-redux'
import { updateUser, clearMessage } from '../redux/authSlice'
import { useEffect } from 'react'

function Settings() {

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const errors = useSelector(state => state.auth.error)
    const success = useSelector(state => state.auth.success)

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        for (let field in data) {
            if (data[field] === "") {
                delete data[field];
            }
        }

        // Petition to update user data.
        dispatch(updateUser({ userId: user._id, info: data }));
        // Clear form after 3 seconds
        setTimeout(() => e.target.reset(), 3000)
    }

    // Clear messages after 3 seconds
    useEffect(() => {
        if (errors || success) {
            setTimeout(() => dispatch(clearMessage()), 3000)
        }
    }, [errors, success, dispatch])

    return (
        <div className='bg-gray-200 md:ml-[25%] min-h-screen flex justify-center items-center'>
            <div className='w-[90%] p-4 bg-white md:h-[50%] rounded-md'>
                <h1 className='my-4 text-4xl md:mt-10 uppercase text-center'>Settings</h1>
                {user ? (
                    <div className='mt-6'>

                        <form method='POST' onSubmit={handleSubmit} className='flex flex-col items-center gap-4'>
                            <div className="w-3/4 lg:w-1/2 flex flex-col gap-2">
                                <label>Change your Name: </label>
                                <input placeholder="New Name" type='text' name='name' className='p-2 bg-gray-200 rounded-md' />
                            </div>

                            <div className="w-3/4 lg:w-1/2 flex flex-col gap-2">
                                <label>Change your Lastname: </label>
                                <input placeholder="New Lastname" type='text' name='lastname' className='p-2 bg-gray-200 rounded-md' />
                            </div>

                            <div className="w-3/4 lg:w-1/2 flex flex-col gap-2">
                                <label>Change your Email: </label>
                                <input placeholder="New Email" type='email' name='email' className='p-2 bg-gray-200 rounded-md' />
                            </div>

                            <div className="w-3/4 lg:w-1/2 flex flex-col gap-2">
                                <label>Change your Username: </label>
                                <input placeholder="New Username" type='text' name='username' className='p-2 bg-gray-200 rounded-md' />
                            </div>

                            <div className="w-3/4 lg:w-1/2 flex flex-col gap-2">
                                <label>Change your Password: </label>
                                <input placeholder="New Password" type='password' name='password' className='p-2 bg-gray-200 rounded-md' />
                            </div>

                            <div className="w-3/4 lg:w-1/2 flex flex-col gap-2">
                                <label>Confirm your new Password: </label>
                                <input placeholder="New Password" type='password' name='confirmPassword' className='p-2 bg-gray-200 rounded-md' />
                            </div>

                            {user.isAdmin && (
                                <div className="w-3/4 lg:w-1/2 flex flex-col gap-2">
                                    <label>Is Admin: </label>
                                    <select defaultValue="Admin Permission" className="p-2 bg-gray-200 rounded-md" name="isAdmin">
                                        <option disabled value="Admin Permission">Admin Permission</option>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>
                            )}

                            {errors && <div className='text-red-500'>{errors}</div>}
                            {success && <div className='text-green-500'>{success}</div>}

                            <div className="my-4 w-full md:w-3/4 text-center grid grid-cols-2 gap-4">
                                <a href={`/profile/${user._id}`} className="p-2 md:p-4 bg-blue-400 hover:bg-blue-700">Back to profile</a>
                                <button type='submit' className="p-2 md:p-4 bg-green-400 hover:bg-green-700">Change Info</button>
                            </div>

                        </form>
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

export default Settings