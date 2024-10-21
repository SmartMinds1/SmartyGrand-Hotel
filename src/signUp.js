import Button from "./Button";

const SignUp = ({
  newUser,
  setNewUser,
  userEmail,
  setUserEmail,
  userPassword,
  setUserPassword,
  handleUserSignUp,
  reqType,
  setReqType,
}) => {
  return (
    <div>
      {" "}
      <form onSubmit={handleUserSignUp}>
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
        <input
          type="text"
          autoComplete="on"
          id="userEmail"
          size={30}
          placeholder="Email"
          required
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          id="userPassword"
          size={30}
          placeholder="Password"
          required
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <br />
        <Button
          buttonText="submit"
          reqType={reqType}
          setReqType={setReqType}
          name="signUp"
        />
      </form>
    </div>
  );
};
export default SignUp;
