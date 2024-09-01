//craeting the footer functions
const Footer = () => {
  const copyrightdate = new Date();

  return (
    <div>
      <div></div>
      <p>&copy;smartygrandhotel{copyrightdate.getFullYear()}</p>
    </div>
  );
};

export default Footer;
