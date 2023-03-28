import * as React from "react";
import Button from "@mui/material/Button";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import classes from "./index.module.css";
import { Grid } from "@mui/material";
import StartIcon from "@mui/icons-material/Start";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import TextField from "@mui/material/TextField";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useAuth } from "../Context/AuthContext";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import HistoryIcon from "@mui/icons-material/History";
import { Box } from "@mui/material";
import RequestMatchedHistory from "./HistoryRequests";
import PostMatchedHistory from "./HistoryPosts";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";

const serverURL = "";

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

export default function History(props) {
  const { currentUser, updatePassword, upSuccess } = useAuth();

  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <ToastContainer
          enableMultiContainer
          containerId={"profile"}
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
        <Card
          style={{
            border: "none",
            boxShadow: "none",
            display: "flex",
            alignItems: "center",
            marginBottom: 25,
          }}
        >
          <form>
            <Box
              sx={{
                marginTop: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ mt: 2, bgcolor: "#ffd500", width: 56, height: 56 }}>
                <HistoryIcon fontSize="large" style={{ color: "black" }} />
              </Avatar>

              <Typography
                style={{ marginTop: 5, marginBottom: 20 }}
                component="h1"
                variant="h4"
              >
                Ride History
              </Typography>
            </Box>
          </form>
        </Card>
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
                variant="h5"
                style={{
                  fontWeight: "bold",
                  marginBottom: 25,
                }}
              >
                Rides Taken:
              </Typography>
              <RequestMatchedHistory/>
              <Typography
                variant="h5"
                style={{
                  fontWeight: "bold",
                  marginBottom: 25,
                  marginTop:25
                }}
              >
                Rides Shared:
              </Typography>
              <PostMatchedHistory/>
            </Grid>
          </Card>
        </Paper>
      </div>
    </MuiThemeProvider>
  );
}
