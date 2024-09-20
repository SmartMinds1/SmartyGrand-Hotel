const Button = ({ buttonText, setRegType }) => {
  return (
    <button
      type="button"
      className="mainButtons"
      //now lets say that we want these buttons to perform diffent operations when clicked. This is how to go about it.PUt the function that is supposed to run on click
      onClick={() => setRegType(buttonText)}
    >
      {buttonText}
    </button>
  );
};

export default Button;
