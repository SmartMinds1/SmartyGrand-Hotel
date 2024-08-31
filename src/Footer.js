//craeting the footer functions
const Footer = () => {
  const copyrightdate = new Date();
  return <p>&copy;smartygrandhotel{copyrightdate.getFullYear()}</p>;
};

export default Footer;
