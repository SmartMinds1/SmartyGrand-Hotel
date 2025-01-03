import "./myForm.css";

//user form UI

const MyForm = () => {
  return (
    <form action="">
      <div className="formtable">
        <div className="Insidetable">
          <input
            type="text"
            name="username"
            id="username"
            size="20"
            placeholder="username"
            autoComplete="on"
            required
          />
          <div className="inputDivHr1"></div>
        </div>

        <div className="Insidetable">
          <input
            type="password"
            name="userpassword"
            id="userpassword"
            size="20"
            placeholder="password"
            autoComplete="on"
            required
          />
          <div className="inputDivHr2"></div>
        </div>
      </div>
    </form>
  );
};

export default MyForm;
