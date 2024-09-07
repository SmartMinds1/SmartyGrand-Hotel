// Component to display the list of users
const DisplayUsers = ({ users, deleteUser }) => {
  return (
    <table className="userTable">
      {/* Table header */}
      <thead>
        <tr>
          <th>Users</th>
          <th>User ID</th>
          <th>Action</th>
        </tr>
      </thead>

      {/* Table body containing the list of users */}
      <tbody>
        {users.map((user) => (
          // Each table row represents a user
          // The `key` prop is important for React's rendering performance and correct behavior
          <tr key={user.id}>
            {/* Display user's first name */}
            <td>{user.userFirstName}</td>
            {/* Display user's ID */}
            <td>{user.id}</td>
            {/* Button to delete the user, invoking the deleteUser function passed as a prop */}
            <td>
              <button className="deleteBtn" onClick={() => deleteUser(user.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DisplayUsers;

/* import React, { useState } from "react";
import DisplayUsers from "./DisplayUsers";

const Content = ({ newUser, setNewUser, handleSubmit, users, deleteUser }) => {
  const [showUsers, setShowUsers] = useState(false);

  const toggleShowUsers = () => {
    setShowUsers(prevShowUsers => !prevShowUsers);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="on"
          id="userName"
          size={30}
          placeholder="Your Name"
          required
          autoFocus
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        <button onClick={toggleShowUsers}>
          {showUsers ? "Hide users" : "See users..."}
        </button>
        {showUsers && <DisplayUsers deleteUser={deleteUser} users={users} />}
      </div>
    </div>
  );
};

export default Content; */
