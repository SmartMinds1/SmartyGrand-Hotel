/* import { useState, useEffect } from "react";
import { Form } from "myForm.js";

const myApp = () => {
  //Declaring our useState hooks
  const [newUser, setNewUser] = useState("");
  const [users, setUsers] = useState(() => {
    const responce = localStorage.getItem("hotelUsers");
    return responce ? JSON.parse(responce) : [];
  });

  //Updating changes using useEffect
  useEffect(() => {
    localStorage.setItem("hotelUsers", JSON.stringify(users));
  }, [users]);

  const addUser = (userName) => {
    const id = users.length ? users[users.length - 1].id + 1 : 1;
    const myUser = { id: id, userFirstName: userName };
    const usersList = (prevUsers) => [...prevUsers, myUser];
    setUsers(usersList);
  };

  //This is just a simple function that will be able to handle the submiting event of my form
  handleSubmit = (e) => {
    e.preventDefault();
    if (!newUser) return;
    addUser(newUser);
    alert(`A new user by the name ${newUser} has been added successfully!`);
    setNewUser("");
  };

  return (
    <Form
      newUser={newUser}
      setNewUser={setNewUser}
      handleSubmit={handleSubmit}
    />
  );
};
export default myApp; */
