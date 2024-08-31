//creating the content function
const Content = () => {
  const moreInfor = () => {
    console.log("You have clicked Me");
  };

  return (
    <main>
      <h4>Where your imaginations meets reality</h4>
      <button onClick={moreInfor}>See more...</button>
    </main>
  );
};

export default Content;
