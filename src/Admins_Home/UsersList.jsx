import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err);
        setLoading(false);
      }
    };

    
    /* The data refresher when the tab is still open and a change is made */
    useEffect(() => {
        fetchUsers(); // Initial load
    
        // Set up listener
        const handleListChange = () => {
          fetchUsers(); // Re-fetch users
        };
    
        window.addEventListener("listChange", handleListChange);
    
        // 🧹 Clean up
        return () => {
          window.removeEventListener("listChange", handleListChange);
        };
      }, []);



  if (loading) return <p>Loading users...</p>;

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Users List</h2>
        <p>Total: <strong>{users.length}</strong></p>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user.user_id}>
              <td>{idx + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
