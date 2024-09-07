import { useState } from "react";
//creating the Testa function
const Testa = (users) => {
  //learning about forms
  const [workers, setWorkers] = useState([
    JSON.parse(localStorage.getItem("hotelUsers")),
  ]);

  /*   const handleWorkers = () => {
    setWorkers();
  }; */

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li>{user.userName}</li>
        ))}
      </ul>
    </div>
  );
};

export default Testa;
