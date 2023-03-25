import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import SignInForm from "../SignUp";
import SignUpPage from "../SignIn";
import LandingPage from "../Landing";
import HomePage from "../Home";
import Navbar from "../NavBar";
import history from "./history";
import { AuthProvider, useAuth } from "../Context/AuthContext";
import { io } from "socket.io-client";
import Footer from "../Footer";

export default function PrivateRoute({ component: Component, socket, ...rest }) {
  const { currentUser } = useAuth();
  // const [socket, setSocket] = React.useState(null);

  // React.useEffect(() => {
  //   setSocket(io("http://localhost:7500"));
  // }, []);

  // console.log(socket);

  // React.useEffect(() => {
  //   socket?.emit("newUser", currentUser.email);
  // }, [socket, currentUser]);
  
  return (
    <React.Fragment>
    <Navbar socket={socket}/>
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} socket={socket}/>
        ) : (
          <Redirect to="/signin" />
        );
      }}
    />
    <Footer/>
    </React.Fragment>
  );
}
