import "./myForm.css";

//user form UI

const MyForm = ({ handleChange }) => {
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
            /*   value={formData.name} */
            onChange={handleChange}
          />

          <div className="inputDivHr1"></div>
        </div>

        <div className="Insidetable">
          <input
            size="20"
            autoComplete="on"
            type="email"
            id="email"
            name="email"
            /*  value={formData.email} */
            onChange={handleChange}
            required
            placeholder="Email"
          />
        </div>
        <div className="inputDivHr2"></div>
      </div>
    </form>
  );
};

export default MyForm;
