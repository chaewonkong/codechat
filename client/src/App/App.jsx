import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { GlobalStyle } from "../global_styles";
import Chat from "../Routes/Chat";
import Landing from "../Routes/Landing";
// import styled from "styled-components";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Route exact path="/" component={Landing} />
        <Route path="/chat" component={Chat} />
      </BrowserRouter>
    </>
  );
}

export default App;
