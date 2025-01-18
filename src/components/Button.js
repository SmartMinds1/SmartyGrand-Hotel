import "./Button.css";

//This is the button logic for all buttons
const Button = ({ type, btnLabel }) => {
  return (
    <button className="btn" type={type}>
      {btnLabel}
    </button>
  );
};

export default Button;
