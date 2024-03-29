import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { Avatar } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import "./MatchedItems.css";
import classes from "./MatchedItems.css";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";

import { lightGreen } from "@mui/material/colors";

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

export default function PostMatchedHistory() {

    const [matches, setMatches] = React.useState([]);
    const { currentUser } = useAuth();

    const callApiGetMatches = async () => {
        const url = serverURL + "/api/getPostHistory";
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
        })
    }

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
                  {option.image == null ? (
                    <Avatar
                      sx={{ m: 1, bgcolor: "#ffd500", width: 50, height: 50 }}
                    >
                      <GroupIcon
                        fontSize="medium"
                        style={{ color: "black", width: 40, height: 40 }}
                      ></GroupIcon>
                    </Avatar>
                  ) : (
                    <Avatar
                      alt="Remy Sharp"
                      src={"http://localhost:3000/" + option.image}
                      sx={{ width: 80, height: 80 }}
                    />
                  )}
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
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  marginTop={2}
                >
                  <b>Requesters Details</b>
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
            </Card>
          ))}
            </Grid>
          </div>
        </MuiThemeProvider>
      );

}