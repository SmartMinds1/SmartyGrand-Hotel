import { FaUsers } from "react-icons/fa";
import Button from "./Button";

//creating the content function
const Content = ({
  newUser,
  setNewUser,
  handleSubmit,
  reqType,
  setReqType,
}) => {
  //learning about forms

  return (
    <div>
      {" "}
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
        <Button buttonText="Submit" reqType={reqType} setRegType={setReqType} />
      </form>
      <div>
        <FaUsers role="button" /> Users
      </div>
    </div>
  );
};

export default Content;
