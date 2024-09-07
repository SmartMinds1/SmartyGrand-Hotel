import { useState } from "react";

// Creating the ContentFooter function
const Content = () => {
  // Defining the state for the list of users
  const [users, setUsers] = useState([
    { userName: "Paul", id: 1, married: false },
    { userName: "Dave", id: 2, married: true },
    { userName: "Smart", id: 3, married: false },
    { userName: "Triza", id: 4, married: true },
  ]);

  const handleCheck = (id) => {
    const usersList = users.filter((user) =>
      user.id === id ? { ...user, married: !user.married } : user
    );
    setUsers(usersList);
  };

  return (
    <main>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="usersArray">
            <input
              type="checkbox"
              onChange={() => handleCheck(user.id)}
              checked={user.married}
              readOnly
            />
            <label>{user.userName}</label>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Content;
