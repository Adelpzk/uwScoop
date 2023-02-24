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
import Form from "./Form";
import { ToastContainer, toast, Bounce } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import RequestItems from "./RequestItems";
import CloseIcon from "@mui/icons-material/Close";
import "./index.module.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CarPool from "../images/CarPool.png";
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
      main: "#ffd500",
    },
    secondary: {
      main: "#be0002",
    },
  },
});

export default function Request() {
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
        <Card style={{ border: "none", boxShadow: "none" }}>
          <Box>
            <CardContent xs={12} sm={12} md={6}>
              <a>
                <Link to={`/Home`}>
                  <CardMedia
                    className="image"
                    component="img"
                    image={CarPool}
                    alt="Live from space album cover"
                    style={{ maxWidth: 550, float: "right", marginRight: "2%" }}
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
                  Need a ride?
                </Typography>
                <Typography
                  variant="h4"
                  style={{
                    marginLeft: 50,
                    fontStyle: "oblique",
                    fontWeight: "bold",
                  }}
                >
                  Simply make a new Request and
                </Typography>
                <Typography
                  variant="h4"
                  style={{
                    marginLeft: 50,
                    fontStyle: "oblique",
                    fontWeight: "bold",
                  }}
                >
                  Get Matched with a UW driver!
                </Typography>
                <Typography
                  variant="h4"
                  style={{
                    marginLeft: 50,
                    fontStyle: "oblique",
                    fontWeight: "bold",
                  }}
                >
                  Below you can Access your Requests.
                </Typography>
              </div>
              <br />
              <Button
                variant="contained"
                startIcon={<AddCircleIcon />}
                onClick={handleClickOpen}
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
                Make a new Request
              </Button>
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
                <PeopleAltIcon fontSize="large" style={{ marginLeft: 30 }} />
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
            </CardContent>
          </Box>
        </Card>
        <CssBaseline />
        <Paper
          className={classes.paper}
          style={{ border: "none", boxShadow: "none", overflow: "hidden" }}
        >
          <RequestItems props={renderList} />
          <Card style={{ border: "none", boxShadow: "none" }}>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              marginBottom={5}
            >
              <Button
                variant="contained"
                startIcon={<AddCircleIcon />}
                onClick={handleClickOpen}
                sx={{
                  marginTop: 5,
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
              <Dialog open={open} onClose={handleClose} 
              style={{ boxShadow: "none", border: "none"}}
              >
                <DialogTitle><strong>Post a Request</strong></DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Provide the necassary information of your trip, to get
                    matched with UW drivers!
                  </DialogContentText>
                  <Form setOpen={handleClose} setRenderList={setRenderList} />
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
                    onClick={handleClose}
                    startIcon={<CloseIcon />}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Card>
        </Paper>
      </div>
    </MuiThemeProvider>
  );
}
