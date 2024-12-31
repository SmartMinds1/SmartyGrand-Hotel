import React from "react";
import "./App.css";
import Header from "./Header";
import MyForm from "./MyForm";
import Button from "./Button";
import Footer from "./Footer";

function App() {
  return (
    <>
      <div className="App">
        <Header title="Smarty Grand Hotel" />
        <MyForm />
        <Button />
        <Footer />
      </div>
    </>
  );
}

export default App;
