import Footer from "../../components/Footer";
import AdminNav from "../../components/AdminNavbar";

import "./styles/AllUsers.css";

import { useAdmin } from "../../context/AdminContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function AllUsers() {

  const { getAllUsers, allUsers, adminDeleteUser, success } = useAdmin();

  useEffect(() => { getAllUsers() }, []);

  return (
    <>
      <AdminNav />

      <div className="allUsers-container">
        <h1>All Users</h1>

        <table className="users-table">
          <thead className="users-table-head">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Lastname</th>
              <th>Username</th>
              <th>Email</th>
              <th>Is Admin</th>
              <th></th>
            </tr>
          </thead>

          <tbody className="users-table-body">
            {/* We map all users and we show them in a table. Added a distinction for admin users. */}
            {allUsers.map((user) => (
              <tr key={user._id} className={user.isAdmin ? 'admin-row' : ''}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td >{user.username}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "Yes" : "No"}</td>
                <td>
                  <button className="btn-edit"><Link to={`/edit-user/${user._id}`}>Edit</Link></button>
                  <button className="btn-remove" onClick={() => adminDeleteUser(user._id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      
      <Footer />
    </>
  )
}