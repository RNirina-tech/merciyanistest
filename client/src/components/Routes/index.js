import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "../../pages/Home";
import Purchase from "../../pages/Purchase";

const index = () => {
  
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/purchase" exact component={Purchase} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default index;
