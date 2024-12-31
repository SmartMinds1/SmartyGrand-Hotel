//user form UI
const MyForm = () => {
  return (
    <form action="" method="">
      <input
        type="text"
        name="username"
        id="username"
        size="20"
        placeholder="username"
        autoComplete="on"
        required
      />
      <input
        type="password"
        name="userpassword"
        id="userpassword"
        size="20"
        placeholder="password"
        autoComplete="on"
        required
      />
    </form>
  );
};

export default MyForm;
