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
import Form from "./Form";
import { ToastContainer, toast, Bounce } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";

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
      <CssBaseline />
      <Paper
        className={classes.paper}
        style={{ border: "none", boxShadow: "none", overflow: "hidden" }}
      >
        <Card style={{ border: "none", boxShadow: "none" }}>
          <Button
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
            variant="contained"
            className={classes.button}
            onClick={handleClickOpen}
          >
            Open form dialog
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Post a Request</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Provide the necassary information of your trip, to get matched
                with UW drivers!
              </DialogContentText>
              <Form setOpen={handleClose} />
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
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Card>
      </Paper>
    </div>
    </MuiThemeProvider>
  );
}
