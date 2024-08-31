import "./App.css";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

function App() {
  return (
    <div className="App">
      <Header className="App-header" />

      <div className="content">
        <Content />
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
