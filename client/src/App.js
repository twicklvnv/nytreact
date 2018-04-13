import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Main from "./components/Main";
//import Search from "./pages/Search";
//import Saved from "./pages/Saved";
//import Navbar from "./components/Navbar";
//import Wrapper from "./components/Wrapper";

import './App.css';

const App = () => (
  <Router>
    <div>

        <Route exact path = "/" component = {Main} />
        {/*<Route exact path = "/home" component = {Home} />
        <Route exact path = "/search" component = {Search} />
<Route exact path = "/saved" component = {Saved} />*/}
    </div>
  </Router>
)

export default App;
