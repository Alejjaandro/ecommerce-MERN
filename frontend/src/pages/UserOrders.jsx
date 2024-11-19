import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

function UserOrders() {

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    
    return (
        <div className='bg-gray-200 md:ml-[25%] min-h-screen flex justify-center'>
            <div className='w-[90%] p-4 bg-white'>
                {user && <h1 className='text-2xl md:text-4xl md:my-10 font-bold text-center'>Hi! {user.username}</h1>}

            </div>
        </div >
    )
}

export default UserOrders