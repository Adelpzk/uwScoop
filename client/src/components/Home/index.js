import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@mui/material/Button";
import StartIcon from "@mui/icons-material/Start";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Landing from "../images/Landing2.jpeg";
import Request from "../images/Request.gif";
import Post from "../images/Post2.png";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import DialogHome from "./Dialog";
import { fontWeight } from "@mui/system";
import { Link } from "react-router-dom";
import "./index.css";
import { ToastContainer, toast } from "react-toastify";
import SignIn from "../SignUp";

//Dev mode
const serverURL = ""; //enable for dev mode

//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number:
//ssh to ov-research-4.uwaterloo.ca and run the following command:
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");

const opacityValue = 0.9;

const theme = createTheme({
  palette: {
    type: "light",
    background: {
      default: "#FFFFFF",
    },
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#b552f7",
    },
  },
});

const styles = (theme) => ({
  root: {
    body: {
      backgroundColor: "#000000",
      opacity: opacityValue,
      overflow: "hidden",
    },
  },
  mainMessage: {
    opacity: opacityValue,
  },

  mainMessageContainer: {
    marginTop: "20vh",
    marginLeft: theme.spacing(20),
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(4),
    },
  },
  paper: {
    overflow: "hidden",
  },
  message: {
    opacity: opacityValue,
    maxWidth: 250,
    paddingBottom: theme.spacing(2),
  },

  image: {},
});

// const [open, setOpen] = React.useState(false);
// const [renderList, setRenderList] = React.useState(false);

// const handleClickOpen = () => {
//   setOpen(true);
// };

// const handleClose = () => {
//   setOpen(false);
// };

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      mode: 0,
      open: false,
    };
  }

  componentDidMount() {
    //this.loadUserSettings();
  }

  loadUserSettings() {
    this.callApiLoadUserSettings().then((res) => {
      //console.log("loadUserSettings returned: ", res)
      var parsed = JSON.parse(res.express);
      console.log("loadUserSettings parsed: ", parsed[0].mode);
      this.setState({ mode: parsed[0].mode });
    });
  }


  callApiLoadUserSettings = async () => {
    const url = serverURL + "/api/loadUserSettings";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        userID: this.state.userID,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  };

  render() {
    const { classes } = this.props;

    const mainMessage = (
      <Grid
        container
        spacing={0}
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ minHeight: "100vh" }}
        className={classes.mainMessageContainer}
      >
        <Grid item>
          <Typography
            variant={"h3"}
            className={classes.mainMessage}
            align="flex-start"
          >
            {this.state.mode === 0 ? (
              <React.Fragment>Adel's Crazy Change!</React.Fragment>
            ) : (
              <React.Fragment>Welcome back!</React.Fragment>
            )}
          </Typography>
        </Grid>
      </Grid>
    );

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <ToastContainer
              enableMultiContainer
              containerId={"Home"}
              toastStyle={{ color: "black" }}
              position="top-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          <Paper
            className={classes.paper}
            style={{ border: "none", boxShadow: "none" }}
          >
            <Card style={{ border: "none", boxShadow: "none" }}>
              <Box>
                <CardContent xs={12} sm={12} md={6}>
                  <a>
                    <Link to={`/Matches`}>
                      <CardMedia
                        className="image"
                        component="img"
                        image={Landing}
                        alt="Live from space album cover"
                        style={{ maxWidth: 600, float: "right" }}
                      />
                    </Link>
                  </a>
                  <div style={{ marginTop: 100 }}>
                    <Typography
                      variant="h4"
                      style={{
                        marginLeft: 50,
                        fontStyle: "oblique",
                        fontWeight: "bold",
                      }}
                    >
                      Share Rides.
                    </Typography>
                    <Typography
                      variant="h4"
                      style={{
                        marginLeft: 50,
                        fontStyle: "oblique",
                        fontWeight: "bold",
                      }}
                    >
                      Make Friends.
                    </Typography>
                    <Typography
                      variant="h4"
                      style={{
                        marginLeft: 50,
                        fontStyle: "oblique",
                        fontWeight: "bold",
                      }}
                    >
                      Stay Safe.
                    </Typography>
                  </div>
                  <br />

                  <Button
                    variant="contained"
                    startIcon={<StartIcon />}
                    onClick={() => this.setState({ open: true })}
                    sx={{
                      marginLeft: 6.5,
                      marginTop: 2,
                      backgroundColor: "#ffd500",
                      color: "black",
                      "&:hover": {
                        backgroundColor: "#ffd500",
                        color: "#be0002",
                      },
                      fontWeight: "bold",
                    }}
                  >
                    Get Started
                  </Button>
                  <Dialog
                    fullWidth="true"
                    open={this.state.open}
                    onClose={() => this.setState({ open: false })}
                    style={{ boxShadow: "none", border: "none" }}
                  >
                    <DialogTitle>
                      <strong>Leaving or Heading to Waterloo?</strong>
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText style={{ marginBottom: 20 }}>
                        Choose whether youre driving or need a ride
                      </DialogContentText>
                      <DialogHome />
                    </DialogContent>
                    <DialogActions>
                      <Button
                        variant="outlined"
                        sx={{
                          borderColor: "#ffd500",
                          color: "black",
                          "&:hover": {
                            borderColor: "#ffd500",
                            color: "#be0002",
                          },
                          fontWeight: "bold",
                        }}
                        onClick={() => this.setState({ open: false })}
                        startIcon={<CloseIcon />}
                      >
                        Cancel
                      </Button>
                    </DialogActions>
                  </Dialog>

                  <br />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      marginTop: 40,
                      marginLeft: 50,
                    }}
                  >
                    <MonetizationOnIcon fontSize="large" />
                    <Typography
                      variant="caption"
                      display="block"
                      style={{
                        fontSize: 12,
                      }}
                    >
                      cheap & <br />
                      affordable
                    </Typography>
                    <EmojiEmotionsIcon
                      fontSize="large"
                      style={{ marginLeft: 30 }}
                    />
                    <Typography
                      variant="caption"
                      display="block"
                      style={{
                        fontSize: 12,
                      }}
                    >
                      safe & <br />
                      secure
                    </Typography>
                    <PeopleAltIcon
                      fontSize="large"
                      style={{ marginLeft: 30 }}
                    />
                    <Typography
                      variant="caption"
                      display="block"
                      style={{
                        fontSize: 12,
                      }}
                    >
                      friendly & <br />
                      comfortable
                    </Typography>
                  </div>

                  {/* <img src={Landing} style={{ display: { xs: 'flex', md: 'none' }, mr: 1, maxWidth: 150}}/> */}
                </CardContent>
              </Box>
            </Card>
            <br />
            <br />
            <br />
            <br />
            <br />
            <Card
              style={{
                backgroundColor: "rgba(255, 213, 0, .7)",
                border: "none",
                boxShadow: "none",
              }}
            >
              <Box>
                <CardContent xs={12} sm={12} md={6}>
                  <a>
                    <Link to={`/Request`}>
                      <CardMedia
                        className="imageRequest"
                        component="img"
                        image={Request}
                        alt="Live from space album cover"
                        style={{}}
                      />
                    </Link>
                  </a>
                  <div className="request">
                    <Typography
                      variant="h4"
                      style={{
                        fontStyle: "oblique",
                        fontWeight: "bold",
                      }}
                    >
                      Request for Rides
                    </Typography>
                    <Typography
                      variant="h4"
                      style={{
                        fontStyle: "oblique",
                        fontWeight: "bold",
                      }}
                    >
                      from a Trusted
                    </Typography>
                    <Typography
                      variant="h4"
                      style={{
                        paddingRight: 20,
                        fontStyle: "oblique",
                        fontWeight: "bold",
                      }}
                    >
                      UW Fellow and
                    </Typography>
                    <Typography
                      variant="h4"
                      style={{
                        fontStyle: "oblique",
                        fontWeight: "bold",
                      }}
                    >
                      Make a New Friend.
                    </Typography>
                  </div>
                </CardContent>
              </Box>
            </Card>
            <Card
              style={{
                border: "none",
                boxShadow: "none",
                paddingBottom: 20,
              }}
            >
              <Box>
                <CardContent xs={12} sm={12} md={6}>
                  <a>
                    <Link to={`/Post`}>
                      <CardMedia
                        className="imagePost"
                        component="img"
                        image={Post}
                        alt="Live from space album cover"
                        style={{}}
                      />
                    </Link>
                  </a>
                  <div className="post">
                    <Typography
                      variant="h4"
                      style={{
                        fontStyle: "oblique",
                        fontWeight: "bold",
                      }}
                    >
                      Driving Back Home?
                    </Typography>
                    <Typography
                      variant="h4"
                      style={{
                        fontStyle: "oblique",
                        fontWeight: "bold",
                      }}
                    >
                      or Driving to Waterloo?
                    </Typography>
                    <Typography
                      variant="h4"
                      style={{
                        paddingRight: 20,
                        fontStyle: "oblique",
                        fontWeight: "bold",
                      }}
                    >
                      Why not Drive
                    </Typography>
                    <Typography
                      variant="h4"
                      style={{
                        fontStyle: "oblique",
                        fontWeight: "bold",
                      }}
                    >
                      a UW fellow.
                    </Typography>
                  </div>
                </CardContent>
              </Box>
            </Card>
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
