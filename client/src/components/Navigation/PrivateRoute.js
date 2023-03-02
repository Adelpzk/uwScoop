import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";
import Home from "../Home";
import history from "./history";
import Request from "../Request";
import Driver from "../Posting";
import SignUpForm from "../SignUp";
import SignInPage from "../SignIn";
import ForgotPassword from "../SignIn/ForgotPassword";
import PrivateRouteAuth from "./PrivateRoute-authenticated";
import { AuthProvider, useAuth } from "../Context/AuthContext";
import Profile from "../Profile";

export default function PrivateRoute () {
  // const { currentUser } = useAuth();
  return (
    <AuthProvider>
      <Router history={history}>
        <Switch>
          <PrivateRouteAuth path="/Home" exact component={Home} />
          <PrivateRouteAuth path="/Post" exact component={Driver} />
          <PrivateRouteAuth path="/Request" exact component={Request} />
          <PrivateRouteAuth path="/Profile" exact component={Profile} />

          <Route path="/SignUp" component={SignUpForm} />
          <Route path="/SignIn" component={SignInPage} />
          <Route path="/ForgotPassword" component={ForgotPassword} />
          <Route path="*">
            <Redirect to="/Home" />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}
