import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import './styles/MyProfile.css';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');

export default function MyProfile() {

	const { user, logout } = useAuth();
	const { deleteUser } = useUser();
	const [loading, setLoading] = useState(true);
	const [modalIsOpen, setModalIsOpen] = useState(false);

	useEffect(() => {
		if (user) {
			setLoading(false);
		}
	}, [user]);

	if (loading) {
		return (
			<>
				<Navbar />
				<h1>Loading...</h1>
				<Footer />
			</>
		)
	};

	const createdDate = format(new Date(user.createdAt), "dd/MM/yyyy");
	const createdHour = format(new Date(user.createdAt), "HH:mm:ss");

	const updatedDate = format(new Date(user.updatedAt), "dd/MM/yyyy");
	const updatedHour = format(new Date(user.updatedAt), "HH:mm:ss");

	const handleDelete = async (userId) => {
		await deleteUser(userId);
		alert("Your account has been deleted");
		logout();
	}

	return (
		<>
			<Navbar />

			<div className="profile-container">

				<div className="profile-image">
					{user.image ? <img src={user.image} /> : <AccountBoxIcon />}
					<h1>Profile picture</h1>
				</div>

				<div className='name-lastname'>
					<div className="profile-name">
						<h1>Name:</h1>
						<p>{user.name}</p>
					</div>
					<div className="profile-lastname">
						<h1>Lastname:</h1>
						<p>{user.lastname}</p>
					</div>
				</div>

				<div className='username-email'>
					<div className="profile-username">
						<h1>Username:</h1>
						<p>{user.username}</p>
					</div>
					<div className="profile-email">
						<h1>Email:</h1>
						<p>{user.email}</p>
					</div>
				</div>

				<div class="created-updated">
					<div className="profile-created">
						<h1>Created:</h1>
						<p>{createdDate} at {createdHour}</p>
					</div>
					<div className="profile-updated">
						<h1>Last update:</h1>
						<p>{updatedDate} at {updatedHour}</p>
					</div>
				</div>

				<div className="profile-buttons">
					<button className="profile-edit"><Link to={`/settings/${user._id}`}>Edit Profile</Link></button>
					<button className="profile-delete" onClick={() => setModalIsOpen(true)}>Delete Account</button>
				</div>

				<Modal
					className="modal-container"
					isOpen={modalIsOpen}
					onRequestClose={() => setModalIsOpen(false)}
					contentLabel="Delete Account Confirmation"
				>
					<div className="modal">
						<h2>Are you sure you want to delete your account?</h2>
						<div className="modal-buttons">
							<button className='yes-button' onClick={async () => {
								await handleDelete(user._id);
								setModalIsOpen(false);
							}}>Yes</button>
							<button className='no-button' onClick={() => setModalIsOpen(false)}>No</button>
						</div>
					</div>
				</Modal>
			</div>


			<Footer />
		</>
	)
}
