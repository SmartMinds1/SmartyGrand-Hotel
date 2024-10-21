//This is the button logic for all buttons
const Button = ({ buttonText, setReqType, reqType, name }) => {
  return (
    <button
      type={reqType}
      className="mainButtons"
      //now lets say that we want these buttons to perform different operations when clicked. This is how to go about it.PUt the function that is supposed to run on click
      onClick={() => setReqType(buttonText)}
    >
      {name}
    </button>
  );
};

export default Button;
