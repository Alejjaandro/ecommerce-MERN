import { useDispatch, useSelector } from 'react-redux'
import { getUserToEdit, editUser } from '../../redux/adminSlice'
import { useEffect } from 'react'

function AdminEditUser() {
    const dispatch = useDispatch()
    const error = useSelector(state => state.admin.error)
    const success = useSelector(state => state.admin.success)

    const userId = window.location.pathname.split('/')[2]
    const user = useSelector(state => state.auth.user)

    useEffect(() => {
        dispatch(getUserToEdit(userId))
    }, [dispatch, userId])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        // Removing empty fields.
        for (let field in data) {
            if (data[field] === "") {
                delete data[field];
            }
        }

        // We check if the admin is triying to edit himself.
        if (user._id === userId) {
            return alert('To edit your own account, please go to your profile.')
        } else {
            dispatch(editUser({ userId, info: data }))
        }
    }

    const userToEdit = useSelector(state => state.admin.userToEdit)

    return (
        <div className='bg-gray-200 md:ml-[25%] min-h-screen flex justify-center items-center'>
            <div className='w-[90%] p-4 bg-white md:h-[50%] rounded-md'>
                {userToEdit ? (
                    <>
                        <div className="flex flex-col items-center uppercase text-center">
                            <h1 className='my-4 text-4xl md:mt-10 '>Editing {userToEdit.username}</h1>
                            <span className='font-light'>Id: {userToEdit._id}</span>
                        </div>

                        <div className='mt-6'>
                            <form method='POST' onSubmit={handleSubmit} className='flex flex-col items-center gap-4'>

                                <div className="w-full lg:w-3/4 flex flex-col gap-2">
                                    <label>Name: </label>
                                    <input placeholder={userToEdit.name} type='text' name='name' className='p-2 bg-gray-200 rounded-md' />
                                </div>

                                <div className="w-full lg:w-3/4 flex flex-col gap-2">
                                    <label>Lastname: </label>
                                    <input placeholder={userToEdit.lastname} type='text' name='lastname' className='p-2 bg-gray-200 rounded-md' />
                                </div>

                                <div className="w-full lg:w-3/4 flex flex-col gap-2">
                                    <label>Username: </label>
                                    <input placeholder={userToEdit.username} type='text' name='username' className='p-2 bg-gray-200 rounded-md' />
                                </div>

                                <div className="w-full lg:w-3/4 flex flex-col gap-2">
                                    <label>Email: </label>
                                    <input placeholder={userToEdit.email} type='email' name='email' className='p-2 bg-gray-200 rounded-md' />
                                </div>

                                <div className="w-full lg:w-3/4 flex flex-col gap-2">
                                    <label>Is Admin: </label>
                                    <select defaultValue="Admin Permission" className="p-2 bg-gray-200 rounded-md" name="isAdmin">
                                        <option disabled value="Admin Permission">Admin Permission</option>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>

                                {error && <div className='text-red-500'>{error}</div>}
                                {success && <div className='text-green-500'>{success}</div>}

                                <div className="my-4 w-full md:w-3/4 text-center grid grid-cols-2 gap-4">
                                    <a href='/all-users' className="p-2 md:p-4 bg-blue-400 hover:bg-blue-700">Back to Users</a>
                                    <button type='submit' className="p-2 md:p-4 bg-green-400 hover:bg-green-700">Edit User</button>
                                </div>

                            </form>
                        </div>
                    </>
                ) : (
                    <div className='text-red-500'>Loading User...</div>
                )}

            </div>
        </div>
    )
}

export default AdminEditUser