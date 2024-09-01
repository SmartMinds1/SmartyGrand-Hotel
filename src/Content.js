import { useState } from "react";

//creating the content function
const Content = () => {
  //learning about useState hook
  //use is the initial value of a given variable then State is the is value after changes

  //example
  const newName = "Paul";
  const [userName, setUserName] = useState("smartMinds");

  const moreInfor = () => {
    setUserName(newName); //This changes the initial value to a final state of a variable
  };

  return (
    <main>
      <h3>Welcome {userName}!</h3>
      <h4>This is where your imaginations meets reality!</h4>

      <button onClick={moreInfor}>See more...</button>

      <img src="" alt="" />
    </main>
  );
};

export default Content;
