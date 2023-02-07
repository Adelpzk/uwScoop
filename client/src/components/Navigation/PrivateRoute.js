import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { Redirect } from 'react-router';
import Navbar from "../NavBar";
import Home from '../Home';
import history from './history';
import Request from "../Request";
import Driver from "../Posting";
import Footer from "../Footer";

export default function PrivateRoute({
  //authenticated,
  //...rest
}) {
  return (

    <Router history={history}>
      <Navbar/>
      <Switch>
      <Route path="/Home" exact component={Home} />
      <Route path="/Post" exact component={Driver} />
      <Route path="/Request" exact component={Request} />
      <Route path="*">
          <Redirect to="/Home" />
      </Route>
      </Switch>
      <Footer/>
    </Router>
  );
}