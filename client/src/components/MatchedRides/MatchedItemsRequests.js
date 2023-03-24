import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { Avatar } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import CloseIcon from "@mui/icons-material/Close";
import CardMedia from "@mui/material/CardMedia";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import "./MatchedItems.css";
import classes from "./MatchedItems.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ToastContainer, toast, Bounce } from "material-react-toastify";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";

//Dev mode
const serverURL = " "; //enable for dev mode

//Deployment mode instructions
//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3100"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number:
//ssh to ov-research-4.uwaterloo.ca and run the following command:
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");

const theme = createTheme({
  palette: {
    type: "light",
    background: {
      default: "#FFFFFF",
    },
    primary: {
      main: "#ffd500",
    },
    secondary: {
      main: "#be0002",
    },
  },
});

export default function RequestItems(props) {
  const [matches, setMatches] = React.useState([]);
  const { currentUser } = useAuth();

  const callApiGetMatches = async () => {
    const url = serverURL + "/api/getMatchesFromRequests";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        users_email: currentUser.email,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  const loadRidesList = () => {
    callApiGetMatches().then((res) => {
      var parsed = JSON.parse(res.express);
      console.log("LoadMoviesList Returned: " + JSON.stringify(parsed));
      setMatches(parsed);
    });
  };

  React.useEffect(() => {
    loadRidesList();
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <Grid
          container
          spacing={0}
          display="flex"
          direction="column"
          alignItems="center"
          justify="center"
          style={{
            backgroundColor: "rgba(255, 213, 0, .7)",
            border: "none",
            boxShadow: "none",
          }}
        >
          {matches.map((option, index) => (
            <Card
              className="card"
              sx={{
                marginTop: 2,
                marginBottom: 2,
              }}
              key={option.postedtrips_id}
            >
              <CardContent>
                <Box
                  sx={{
                    marginTop: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "#ffd500" }}>
                    <GroupIcon fontSize="medium" style={{ color: "black" }} />
                  </Avatar>
                </Box>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  marginTop={2}
                >
                  <b>Ride Details</b>
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  <b>Date:</b> {option.departure_date}
                </Typography>
                <div>
                  <Typography gutterBottom variant="h7" component="div">
                    <b>From: </b> {option.pickup_location}
                  </Typography>
                </div>
                <div>
                  <Typography gutterBottom variant="h7" component="div">
                    <b>To: </b> {option.dropoff_location}
                  </Typography>
                </div>
                <div>
                  <Typography gutterBottom variant="h7" component="div">
                    <b>Departure Time: </b> {option.departure_time}
                  </Typography>
                </div>
                <div>
                  <Typography gutterBottom variant="h7" component="div">
                    <b>Estimated Arrival Time: </b> {option.arrival_time}
                  </Typography>
                </div>
                <div>
                  <Typography gutterBottom variant="h7" component="div">
                    <b>Payment Method: </b> {option.payment_method}
                  </Typography>
                </div>
                <div>
                  <Typography gutterBottom variant="h7" component="div">
                    <b>Amount: </b> {option.amount}
                  </Typography>
                </div>
                <div>
                  <Typography gutterBottom variant="h7" component="div">
                    <b>Car Details: </b> {option.car_brand}, {option.car_color}
                  </Typography>
                </div>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  marginTop={2}
                >
                  <b>Drivers Details</b>
                </Typography>

                <div>
                  <Typography gutterBottom variant="h7" component="div">
                    <b>Name: </b> {option.first_name + " " + option.last_name}
                  </Typography>
                </div>
                <div>
                  <Typography gutterBottom variant="h7" component="div">
                    <b>Phone Number: </b> {option.phone_number}
                  </Typography>
                </div>
                <div>
                  <Typography gutterBottom variant="h7" component="div">
                    <b>School Year: </b> {option.school_year}
                  </Typography>
                </div>
                <div>
                  <Typography gutterBottom variant="h7" component="div">
                    <b>Program: </b> {option.program}
                  </Typography>
                </div>
                <div>
                  <Typography gutterBottom variant="h7" component="div">
                    <b>Music Taste: </b> {option.music_prefrence}
                  </Typography>
                </div>
              </CardContent>
              <CardActions sx={{ justifyContent: "end" }}>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#ffd500",
                    color: "black",
                    "&:hover": {
                      borderColor: "#ffd500",
                      color: "green",
                    },
                    fontWeight: "bold",
                    justifyContent: "end",
                  }}
                  startIcon={<PendingOutlinedIcon />}
                >
                  Request
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#ffd500",
                    color: "black",
                    "&:hover": {
                      borderColor: "#ffd500",
                      color: "green",
                    },
                    fontWeight: "bold",
                    justifyContent: "end",
                  }}
                  startIcon={<MessageOutlinedIcon />}
                >
                  Message
                </Button>
              </CardActions>
            </Card>
          ))}
        </Grid>
      </div>
    </MuiThemeProvider>
  );
}
