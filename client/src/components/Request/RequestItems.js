import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { Avatar } from "@mui/material";
import TaxiAlertIcon from "@mui/icons-material/TaxiAlert";
import CloseIcon from "@mui/icons-material/Close";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import "./RequestItems.css";
import classes from "./RequestItems.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useAuth } from "../Context/AuthContext";

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
  const notifyAll = () =>
    toast.success(
      <p>
        🎉your request was Deleted successfully
        <br />
        <br />
        📍pick up location: {pickup}
        <br />
        <br />
        📍drop off location: {dropoff}
        <br />
        <br />
        🗓pick up date: {date}
      </p>,
      {
        containerId: "A",
        style: { backgroundColor: "#C02F1D", color: "white" },
      }
    );

  const [open, setOpen] = React.useState(false);
  const [pickup, setPickup] = React.useState();
  const [dropoff, setDropoff] = React.useState();
  const [date, setDate] = React.useState();

  const handleClickOpen = (selectedId, pickup, dropoff, date) => {
    console.log(selectedId);
    console.log(pickup);
    setOpen(true);
    setId(selectedId);
    setPickup(pickup);
    setDropoff(dropoff);
    setDate(date);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [requests, setRequests] = React.useState([]);
  const [id, setId] = React.useState(null);
  const { currentUser } = useAuth();

  const callApiDeleteRequest = async () => {
    const url = serverURL + "/api/deleteRequest";
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postedTrip_id: id,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    await loadRequestsList();
    return body;
  };

  const callApiDeleteHistory = async () => {
    const url = serverURL + "/api/deleteHistoryRequest";
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postedTrip_id: id,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    await loadRequestsList();
    return body;
  };

  const callApiGetRequests = async () => {
    const url = serverURL + "/api/getRequests";
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

  console.log("list  ");

  const loadRequestsList = () => {
    callApiGetRequests().then((res) => {
      var parsed = JSON.parse(res.express);
      console.log("LoadMoviesList Returned: " + JSON.stringify(parsed));
      setRequests(parsed);
    });
  };

  React.useEffect(() => {
    loadRequestsList();
  }, [props.props]);

  const handleRemove = () => {
    console.log(id);
    callApiDeleteHistory().then(callApiDeleteRequest());
    notifyAll();
    handleClose();
    //window.location.reload(false);
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
          {requests.map((option, index) => (
            <Card
              className="card"
              sx={{
                marginTop: 2,
                marginBottom: 2,
              }}
              key={option.requestedtrips_id}
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
                    <TaxiAlertIcon
                      fontSize="medium"
                      style={{ color: "black" }}
                    />
                  </Avatar>
                </Box>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  marginTop={2}
                >
                  <b>Request Details</b>
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
              </CardContent>
              <CardActions sx={{ justifyContent: "end" }}>
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
                    justifyContent: "end",
                  }}
                  onClick={() =>
                    handleClickOpen(
                      option.requestedtrips_id,
                      option.pickup_location,
                      option.dropoff_location,
                      option.departure_date
                    )
                  }
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
                <CssBaseline />
                <Paper
                  className={classes.paper}
                  style={{
                    border: "none",
                    boxShadow: "none",
                    overflow: "hidden",
                  }}
                >
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    BackdropProps={{
                      style: {
                        backgroundColor: "transparent",
                        border: "none",
                        boxShadow: "none",
                      },
                    }}
                  >
                    <DialogTitle
                      display="flex"
                      alignItems="center"
                      flexWrap="wrap"
                    >
                      <DeleteIcon /> Deleting Request
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Are you sure you want to delete the request?
                      </DialogContentText>
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
                        onClick={handleRemove}
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
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
                        startIcon={<CloseIcon />}
                        onClick={handleClose}
                      >
                        Cancel
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Paper>
              </CardActions>
            </Card>
          ))}
        </Grid>
      </div>
    </MuiThemeProvider>
  );
}
