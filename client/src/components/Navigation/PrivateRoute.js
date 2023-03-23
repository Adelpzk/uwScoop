import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";
import Home from "../Home";
import history from "./history";
import Request from "../Request";
import MatchedRides from "../MatchedRides";
import Driver from "../Posting";
import SignUpForm from "../SignUp";
import SignInPage from "../SignIn";
import ForgotPassword from "../SignIn/ForgotPassword";
import PrivateRouteAuth from "./PrivateRoute-authenticated";
import { AuthProvider, useAuth } from "../Context/AuthContext";
import { io } from "socket.io-client";
import Profile from "../Profile";
import History from "../History";


export default function PrivateRoute ({socket}) {
  // const { currentUser } = useAuth();
  // const [socket, setSocket] = React.useState(null);

  // React.useEffect(() => {
  //   setSocket(io("http://localhost:7500"));
  // }, []);

  // console.log(socket);

  // React.useEffect(() => {
  //   socket?.emit("newUser", currentUser?.email);
  // }, [socket, currentUser]);

  return (
    <AuthProvider>
      <Router history={history}>
        <Switch>
          <PrivateRouteAuth path="/Home" exact component={Home} socket={socket}/>
          <PrivateRouteAuth path="/Post" exact component={Driver} socket={socket}/>
          <PrivateRouteAuth path="/Request" exact component={Request} socket={socket}/>
          <PrivateRouteAuth path="/Profile" exact component={Profile} socket={socket}/>
          <PrivateRouteAuth path="/History" exact component={History} socket={socket}/>
          <PrivateRouteAuth path="/Matches" exact component={MatchedRides} socket={socket}/>
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
