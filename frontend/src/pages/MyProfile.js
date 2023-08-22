import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import './styles/MyProfile.css';

import { useAuth } from '../context/AuthContext';
import {format} from 'date-fns';

export default function MyProfile() {

  const { user } = useAuth();

  const createdDate = format(new Date(user.createdAt), "dd/MM/yyyy");
  const createdHour = format(new Date(user.createdAt), "HH:mm:ss");

  const updatedDate = format(new Date(user.updatedAt), "dd/MM/yyyy");
  const updatedHour = format(new Date(user.updatedAt), "HH:mm:ss");

  return (
    <>
      <Navbar />

      <div className="profile-container">

        <div className="profile-image">
          <img src={user.image} alt="profile-img"/>
          <p>Profile picture</p>
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

      </div>

      <Footer />
    </>
  )
}
