//creating the header function
//PROPS EXAMPLE

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

Header.defaultProps = { title: "Default title" };

export default Header;
