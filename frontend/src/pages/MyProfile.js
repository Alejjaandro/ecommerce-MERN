import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import './styles/MyProfile.css';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import {format} from 'date-fns';
import { Link } from 'react-router-dom';

export default function MyProfile() {

  const { user } = useAuth();
  const { deleteUser } = useUser();

  const createdDate = format(new Date(user.createdAt), "dd/MM/yyyy");
  const createdHour = format(new Date(user.createdAt), "HH:mm:ss");

  const updatedDate = format(new Date(user.updatedAt), "dd/MM/yyyy");
  const updatedHour = format(new Date(user.updatedAt), "HH:mm:ss");

  return (
    <>
      <Navbar />

      <div className="profile-container">

        <div className="profile-image">
          {user.image ? <img src={user.image}/> : <AccountBoxIcon/> }
          <h1>Profile picture</h1>
        </div>

        <div className="profile-name">
          <h1>Name:</h1>
          <p>{user.name}</p>
        </div>

        <div className="profile-lastname">
          <h1>Lastname:</h1>
          <p>{user.lastname}</p>
        </div>

        <div className="profile-username">
          <h1>Username:</h1>
          <p>{user.username}</p>
        </div>

        <div className="profile-email">
          <h1>Email:</h1>
          <p>{user.email}</p>
        </div>

        <div className="profile-created">
          <h1>Created:</h1>
          <p>{createdDate} at {createdHour}</p>
        </div>

        <div className="profile-updated">
          <h1>Last update:</h1>
          <p>{updatedDate} at {updatedHour}</p>
        </div>

        <div className="profile-buttons">
          <button className="profile-edit"><Link to={`/settings/${user._id}`}>Edit Profile</Link></button>
          <button className="profile-delete" onClick={() => deleteUser(user._id)}>Delete Account</button>
        </div>

      </div>

      <Footer />
    </>
  )
}
