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
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
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

import { useAuth } from "../Context/AuthContext";
import { element } from "prop-types";

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

export default function RequestItems({ socket }) {
  const [matches, setMatches] = React.useState([]);
  const [InviteSent, setInviteSent] = React.useState([]);
  const [inviteUpdate, setInviteUpdate]= React.useState({});
  const { currentUser } = useAuth();

  const callApiGetMatches = async () => {
    const url = serverURL + "/api/getMatchesFromPosts";
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
      parsed.forEach((element) => {
        // console.log([element.postedtrips_id] + ": {" +
        //   element.pendingPosts + "}"
        // );
        if ((element.pendingPosts != 0 || element.pendingPosts != {})) {
          setInviteSent((requestSent) => ({
            ...requestSent,
            [element.postedtrips_id]: JSON.parse(element.pendingPosts),
          }));
        }
      });
    });
  };

  React.useEffect(() => {
    loadRidesList();
  }, []);

  

  React.useEffect(() => {
    matches.forEach((element) => {
      if (!(element.postedtrips_id in InviteSent)) {
        setInviteSent((requestSent) => ({
          ...requestSent,
          [element.postedtrips_id]: {
            ...requestSent[element.postedtrips_id],
            [element.requestedtrips_id]: 0
          },
        }));
      }
  });
  }, [matches]);
  

  console.log(InviteSent);

  // React.useEffect(() => {
  //   InviteSent.forEach((element) => {
  //     callApiPostPending(element[])
  //   })

  // }, []);

  const callApiPostPending = async (id, pending) => {
    const url = serverURL + "/api/postPendingRequests";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        pending: pending,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  for (const key in InviteSent) {
    callApiPostPending(Number(key), JSON.stringify(InviteSent[key]));
  }

  const callApiSendNotid = async (requestId, postId, senderEmail, receiverEmail, status) => {
    const url = serverURL + "/api/sendNotification";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestId: requestId,
        postId: postId,
        senderEmail: senderEmail,
        receiverEmail: receiverEmail,
        status: status
      }),
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  const callApiUnsedNotif = async (requestId, postId, status) => {
    const url = serverURL + "/api/unsedNotif";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestId: requestId,
        postId: postId,
        status: status
      }),
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  const randomId = function (length = 6) {
    return Math.random()
      .toString(36)
      .substring(2, length + 2);
  };
  const checkId = function (id, existing = []) {
    let match = existing.find(function (item) {
      return item === id;
    });
    return match ? false : true;
  };
  const getId = function ({ length, existing = [] }) {
    const limit = 100; // max tries to create unique id
    let attempts = 0; // how many attempts
    let id = false;
    while (!id && attempts < limit) {
      id = randomId(length); // create id
      if (!checkId(id, existing)) {
        // check unique
        id = false; // reset id
        attempts++; // record failed attempt
      }
    }
    return id; // the id or false if did not get unique after max attempts
  };

  const handleInviteButton = (
    email,
    date,
    type,
    requestedtrips_id,
    postedtrips_id,
    action,
    pending
  ) => {
    let options = {
      "12ea": "An option",
      ufhg: "Another option.",
      psrw: "A different option",
    };
    let newId = getId({ length: 4, existing: Object.keys(options) }); // 'a9b'
    if (newId) {
      options[newId] = "A new option";
    } else {
      throw new Error("Could not create unique ID!");
    }
    
    // setInviteSent({
    //   ...InviteSent,
    //   [postedtrips_id]:{
    //     ...InviteSent[postedtrips_id],
    //     [requestedtrips_id]: action
    //   }
    // })

    setInviteSent((invite) => ({
      ...invite,
      [postedtrips_id]:{
        ...invite[postedtrips_id],
        [requestedtrips_id]: action
      }
    }))

     callApiPostPending(postedtrips_id, JSON.stringify(InviteSent[postedtrips_id]));
    
     if (action == 1){
      callApiSendNotid(requestedtrips_id, postedtrips_id, currentUser.email, email.toLowerCase(), type)
    //   socket.emit("sendNotification", {
    //   id: newId,
    //   requestedtrips_id: requestedtrips_id,
    //   postedtrips_id: postedtrips_id,
    //   senderEmail: currentUser.email,
    //   receiverEmail: email.toLowerCase(),
    //   date: date,
    //   type: type,
    //   pending: pending
    // });
    }
    if (action == 0){
      callApiUnsedNotif(requestedtrips_id, postedtrips_id, type)
    }
    window.location.reload(false);
  };

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
              key={option.requestedtrips_id}
              id={option.requestedtrips_id}
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
                      className="profileImage"
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
              <CardActions sx={{ justifyContent: "end" }}>
                {JSON.parse(option.pendingPosts)[option.requestedtrips_id] ==
                  1 && (
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "#be0002",
                      color: "black",
                      "&:hover": {
                        borderColor: "#be0002",
                        color: "red",
                      },
                      fontWeight: "bold",
                      justifyContent: "end",
                    }}
                    startIcon={<PendingOutlinedIcon />}
                    onClick={() =>
                      handleInviteButton(
                        option.email,
                        option.departure_date,
                        2,
                        option.requestedtrips_id,
                        option.postedtrips_id,
                        0,
                        option.pendingPosts
                      )
                    }
                  >
                    Pending
                  </Button>
                )}{" "}
                {JSON.parse(option.pendingPosts)[option.requestedtrips_id] ==
                  0 && (
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
                    startIcon={<PersonAddAltOutlinedIcon />}
                    onClick={() =>
                      handleInviteButton(
                        option.email,
                        option.departure_date,
                        2,
                        option.requestedtrips_id,
                        option.postedtrips_id,
                        1,
                        option.pendingPosts
                      )
                    }
                  >
                    Invite
                  </Button>
                )}
                {JSON.parse(option.pendingPosts)[option.requestedtrips_id] ==
                  2 && (
                  <Button
                    disabled="true"
                    variant="contained"
                    sx={{
                      backgroundColor: "#006400 !important",
                      color: "white !important",
                      fontWeight: "bold",
                      justifyContent: "end",
                    }}
                  >
                    Accepted
                  </Button>
                )}
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
