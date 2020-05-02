import React from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import PizzaForm from "./components/PizzaForm";



const App = () => {
  return (
    <div className = "app">
      <NavBar />

      <Route exact path = "/" component = {Home} />
      <Route path = "/pizza" component = {PizzaForm} />

    </div>
  );
};
export default App;
