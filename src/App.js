import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import SearchBox from "./SearchBox";
import Content from "./Content";
import DisplayUsers from "./DisplayUsers";
import Footer from "./Footer";

function App() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("hotelUsers");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const [newUser, setNewUser] = useState("");

  useEffect(() => {
    localStorage.setItem("hotelUsers", JSON.stringify(users));
  }, [users]);

  const addUser = (userName) => {
    const id = users.length ? users[users.length - 1].id + 1 : 1;
    const myUser = { id, userFirstName: userName };
    setUsers((prevUsers) => [...prevUsers, myUser]);
  };

  const deleteUser = (id) => {
    const newUsersList = users.filter((user) => user.id !== id);
    setUsers(newUsersList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newUser) return;
    addUser(newUser);
    alert(`A new user by the name ${newUser} has been added successfully.`);
    setNewUser("");
  };

  return (
    <div className="App">
      <Header className="App-header" title="Smarty Grand Hotel" />

      <div className="content">
        <SearchBox search={search} setSearch={setSearch} />
        <Content
          newUser={newUser}
          setNewUser={setNewUser}
          handleSubmit={handleSubmit}
        />
      </div>

      <div>
        <DisplayUsers
          users={users.filter((user) =>
            user.userFirstName.toLowerCase().includes(search.toLowerCase())
          )}
          deleteUser={deleteUser}
        />
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
