import { useState } from "react";
import image1 from "./introAnimation1.jpg";
import image2 from "./introAnimation2.jpg";
import image3 from "./introAnimation11.jpg";
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
      <div>
        <img src={image1} width="200" height="200" />
        <img src={image2} width="200" height="200" />
        <img src={image3} width="200" height="200" />
      </div>

      <div>
        <h3>Welcome {userName}!</h3>
        <p>This is where your imaginations meets reality!</p>

        <button onClick={moreInfor}>See more...</button>
      </div>
    </main>
  );
};

export default Content;
