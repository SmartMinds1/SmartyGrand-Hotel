import "./Button.css";

//This is the button logic for all buttons
const Button = ({ type, btnLabel, onClick }) => {
  return (
    <button className="btn" type={type} onClick={onClick}>
      {btnLabel}
    </button>
  );
};

export default Button;
