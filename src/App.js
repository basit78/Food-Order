import React from "react";
import Routes from "./Config/routes";
import Contextprovider from "./Contex/contex";

function App() {
  return (
    <Contextprovider>
      <Routes/>
    </Contextprovider>
  );
}

export default App;

