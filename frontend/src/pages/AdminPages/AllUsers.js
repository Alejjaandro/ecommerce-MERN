import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

import "./styles/AllUsers.css";

import { useAdmin } from "../../context/AdminContext";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function AllUsers() {

  const { getAllUsers, allUsers, adminDeleteUser } = useAdmin();
  const { user: currentAdmin, logout } = useAuth();

  useEffect(() => { getAllUsers() }, []);

  const handleDeleteUser = async (userId) => {
    await adminDeleteUser(userId);

    // If the user we deleted is the current user, we logout.
    if (userId === currentAdmin._id) {
      alert("You deleted yourself");
      logout();
    }
  }

  return (
    <>
      <Navbar />

      <div className="allUsers-container">
        <h1>All Users</h1>

        <div className="allUsers-table-container">
          <table className="allUsers-table">
            <thead className="allUsers-table-head">
              <tr>
                <th>ID</th>
                <th className="allUsers-name">Name</th>
                <th className="allUsers-lastname">Lastname</th>
                <th>Username</th>
                <th>Email</th>
                <th>Is Admin</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="allUsers-table-body">
              {/* We map all users and we show them in a table. Added a distinction for admin users. */}
              {allUsers.map((user) => (
                <tr key={user._id} className={user.isAdmin ? 'admin-row' : ''}>
                  <td>{user._id}</td>
                  <td className="allUsers-name">{user.name}</td>
                  <td className="allUsers-lastname">{user.lastname}</td>
                  <td >{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "Yes" : "No"}</td>
                  <td className="allUsers-options">
                    <Link to={`/edit-user/${user._id}`} className="allUsers-link-edit">Edit</Link>
                    <button className="allUsers-btn-remove" onClick={() => handleDeleteUser(user._id) }>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  )
}