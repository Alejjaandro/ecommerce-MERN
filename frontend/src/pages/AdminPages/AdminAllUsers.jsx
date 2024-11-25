import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../redux/adminSlice'

function AdminAllUsers() {
	const dispatch = useDispatch()
	const allUsers = useSelector(state => state.admin.allUsers)

	useEffect(() => {
		dispatch(getAllUsers())
	}, [dispatch])

	const [warningUserId, setWarningUserId] = useState(null);

	const handleDelete = (userId) => {
		console.log(userId);
	}

	return (
		<div className='bg-gray-200 md:ml-[25%] min-h-screen flex justify-center'>
			<div className='w-[90%] bg-white'>
				<h1 className='text-lg md:text-4xl my-10 font-bold text-center uppercase'>Users Administration</h1>

				{allUsers ? (
					<table className='w-full text-center'>
						<thead>
							<tr className='border-b-2 border-gray-300'>
								<th className='hidden lg:table-cell py-2'>ID</th>
								<th className='hidden min-[425px]:table-cell py-2'>Userame</th>
								<th className='py-2'>Email</th>
								<th className='hidden md:table-cell  py-2'>Admin</th>
								<th className='py-2'>Actions</th>
							</tr>
						</thead>
						<tbody>
								{allUsers.map(user => (
									<React.Fragment key={user._id}>
										<tr  className={`${user.isAdmin && "bg-amber-500"} border-b border-gray-300`}>
											<td className='hidden lg:table-cell py-2'>{user._id}</td>
											<td className='hidden min-[425px]:table-cell py-2'>{user.username}</td>
											<td className='py-2'>{user.email}</td>
											<td className='hidden md:table-cell py-2'>{user.isAdmin ? 'Yes' : 'No'}</td>
											<td className='p-2'>
												<div className='flex flex-col gap-2'>
													<a href={`/edit-user/${user._id}`} className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded-md'>Details</a>
													<button onClick={() => setWarningUserId(user._id)} className='bg-red-500 hover:bg-red-800 text-white px-4 py-1 rounded-md'>Delete</button>
												</div>
											</td>
										</tr>

										{(warningUserId === user._id) && (
											<tr>
												<td colSpan="5">
													<div className="p-2 flex flex-col items-center gap-4 bg-red-400 text-white uppercase">
														<p className='text-center'>Are you sure you want to delete this user?</p>
														<div className='w-full md:w-1/2 flex gap-1'>
															<button onClick={() => handleDelete(user._id)} className="w-full p-4 bg-red-700 hover:bg-red-900">Yes</button>
															<button onClick={() => setWarningUserId(null)} className="w-full p-4 bg-blue-700 hover:bg-blue-900">No</button>
														</div>
													</div>
												</td>
											</tr>
										)}
									</React.Fragment>

							))}
						</tbody>
					</table>
				)
					: <h1 className='h-1/2 text-4xl text-center flex justify-center items-center'>Loading users...</h1>
				}
			</div>
		</div>
	)
}

export default AdminAllUsers