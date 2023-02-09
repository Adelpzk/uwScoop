import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from "../Home";
import PrivateRoute from "../Navigation/PrivateRoute.js";
import NavBar from "../NavBar/index";
import Footer from "../Footer";
import SignIn from "../SignIn";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //
    };
  }

  componentDidMount() {
    //
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <>
        <Router>
          <div>
            <PrivateRoute exact path="/" component={Home} />
          </div>
        </Router>
        <Footer></Footer>
      </>
    );
  }
}

export default App;
