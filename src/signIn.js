import Button from "./Button";

const SignIn = ({
  signInEmail,
  setSignInEmail,
  signInPassword,
  setSignInPassword,
  handleUserSignIn,
  reqType,
  setReqType,
}) => {
  return (
    <div>
      {" "}
      <form onSubmit={handleUserSignIn}>
        <input
          type="text"
          autoComplete="on"
          id="signInEmail"
          size={30}
          placeholder="Email"
          required
          value={signInEmail}
          onChange={(e) => setSignInEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          id="signInPassword"
          size={30}
          placeholder="Password"
          required
          value={signInPassword}
          onChange={(e) => setSignInPassword(e.target.value)}
        />
        <br />
        <Button
          buttonText="submit"
          reqType={reqType}
          setReqType={setReqType}
          name="signIn"
        />
      </form>
    </div>
  );
};
export default SignIn;
