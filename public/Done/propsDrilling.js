function propsDrilling() {
  //This example is for demonstrating props drilling in react
  const newName = "Paul";
  const [userName, setUserName] = useState("smartMinds");

  const moreInfor = () => {
    setUserName(newName); //This changes the initial value to a final state of a variable
  };
  //When different components are able to access same props and utilize them, that is called props drilling
  //ie. both the Header & content components are able to access userName and utilize it.

  return (
    <div className="App">
      <Header className="App-header" title="Smarty Grand" userName={userName} />
      {/* title is a prop */}

      <div className="content">
        <Content moreInfor={moreInfor} userName={userName} />
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default propsDrilling;
