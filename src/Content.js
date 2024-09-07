import { FaUsers } from "react-icons/fa";
//creating the content function
const Content = ({ newUser, setNewUser, handleSubmit }) => {
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
        <button type="submit">Submit</button>
      </form>
      <div>
        <FaUsers role="button" /> Users
      </div>
    </div>
  );
};

export default Content;
