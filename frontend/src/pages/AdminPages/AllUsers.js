import Footer from "../../components/Footer";
import AdminNav from "../../components/AdminNavbar";

import "./styles/AllUsers.css";

import { useUser } from "../../context/UserContext";
import { useEffect } from "react";

export default function AllUsers() {

  const { getAllUsers, allUsers } = useUser();

  useEffect(() => { getAllUsers() }, []);

  console.log(allUsers);

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
            {allUsers.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td >{user.username}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "Yes" : "No"}</td>
                <td>
                  <button className="btn-edit">Edit</button>
                  <button className="btn-remove">Remove</button>
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