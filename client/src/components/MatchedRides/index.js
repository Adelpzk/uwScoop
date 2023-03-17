import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import classes from "./index.module.css";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Grid } from "@mui/material";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "material-react-toastify/dist/ReactToastify.css";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import CloseIcon from "@mui/icons-material/Close";
import "./index.module.css";
import MatchedItemsRequests from "./MatchedItemsRequests"
import MatchedItemsPosts from "./MatchedItemsPosts"
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CarPool from "../images/carpool-vector.jpeg";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";

const theme = createTheme({
  palette: {
    type: "light",
    background: {
      default: "#FFFFFF",
    },
    primary: {
      main: "#be0002",
    },
    secondary: {
      main: "#be0002",
    },
  },
});

export default function MatchedRides({socket}) {
  const [open, setOpen] = React.useState(false);
  const [renderList, setRenderList] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <ToastContainer
          enableMultiContainer
          containerId={"A"}
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
        <Card style={{ border: "none", boxShadow: "none", marginBottom:20 }}>
          <Box>
            <CardContent xs={12} sm={12} md={6}>
              <a>
                <Link to={`/Home`}>
                  <CardMedia
                    className="image"
                    component="img"
                    image={CarPool}
                    alt="Live from space album cover"
                    style={{ maxWidth: 700, float: "Left", marginRight: "5%" }}
                  />
                </Link>
              </a>
              <div style={{ marginTop: 130 }}>
                <Typography
                  variant="h4"
                  style={{
                    marginLeft: 50,
                    fontStyle: "oblique",
                    fontWeight: "bold",
                  }}
                >
                  Below You can
                </Typography>
                <Typography
                  variant="h4"
                  style={{
                    marginLeft: 50,
                    fontStyle: "oblique",
                    fontWeight: "bold",
                  }}
                >
                  Find your Matches
                </Typography>
                <Typography
                  variant="h4"
                  style={{
                    marginLeft: 50,
                    fontStyle: "oblique",
                    fontWeight: "bold",
                  }}
                >
                  From your Requests and Rides
                </Typography>
              </div>
            </CardContent>
          </Box>
        </Card>
        <CssBaseline />
        <Paper
          className={classes.paper}
          style={{ border: "none", boxShadow: "none", overflow: "hidden" }}
        >
             <Card style={{ border: "none", boxShadow: "none" }}>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              marginBottom={3}
            >
             <Typography
                  variant="h4"
                  style={{
                    fontStyle: "oblique",
                    fontWeight: "bold",
                    marginBottom: 25
                  }}
                >
                 Matches from your Requests:
                </Typography>
          <MatchedItemsRequests socket={socket}/>
          <Link to="/Request">
            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              sx={{
                marginTop: 3,
                marginBottom:5,
                backgroundColor: "#ffd500",
                color: "black",
                "&:hover": {
                  backgroundColor: "#ffd500",
                  color: "#be0002",
                },
                fontWeight: "bold",
              }}
            >
              Make a new Request
            </Button>
          </Link>
          <Typography
                  variant="h4"
                  style={{
                    fontStyle: "oblique",
                    fontWeight: "bold",
                    marginBottom: 25
                  }}
                >
                 Matches from your Posts:
                </Typography>
          <MatchedItemsPosts  socket={socket}/>
          <Link to="/Request">
            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              sx={{
                marginTop: 3,
                marginBottom:5,
                backgroundColor: "#ffd500",
                color: "black",
                "&:hover": {
                  backgroundColor: "#ffd500",
                  color: "#be0002",
                },
                fontWeight: "bold",
              }}
            >
              Make a new Post
            </Button>
          </Link>
          </Grid>
          </Card>
        </Paper>
      </div>
    </MuiThemeProvider>
  );
}
