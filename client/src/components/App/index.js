import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "../Context/AuthContext";
import Home from "../Home";
import PrivateRoute from "../Navigation/PrivateRoute.js";
import NavBar from "../NavBar/index";
import Footer from "../Footer";
import SignIn from "../SignIn";
import { io } from "socket.io-client";

function App (props) {
  const { currentUser } = useAuth();
  const [socket, setSocket] = React.useState(null);

  React.useEffect(() => {
    setSocket(io("http://localhost:7500"));
  }, []);

  console.log(socket);

  React.useEffect(() => {
    socket?.emit("newUser", currentUser?.email);
  }, [socket, currentUser]);
    return (
      <>
      <AuthProvider>
        <Router>
          <div>
            <PrivateRoute exact path="/" component={Home} socket={socket} />
          </div>
        </Router>
        {/* <Footer></Footer> */}
        </AuthProvider>
      </>
    );
  }

export default App;
