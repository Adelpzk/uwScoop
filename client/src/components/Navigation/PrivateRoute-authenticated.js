import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import SignInForm from "../SignUp";
import SignUpPage from "../SignIn";
import LandingPage from "../Landing";
import HomePage from "../Home";
import Navbar from "../NavBar";
import history from "./history";
import { AuthProvider, useAuth } from "../Context/AuthContext";
import Footer from "../Footer";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  return (
    <React.Fragment>
    <Navbar/>
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        );
      }}
    />
    <Footer/>
    </React.Fragment>
  );
}
