import * as React from "react";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import GoogleAutoComplete from "./GoogleAutoComplete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DatePicker from "./DatePicker";
import { ToastContainer, toast, Bounce } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";

const theme = createTheme();

//Dev mode
const serverURL = " "; //enable for dev mode

//Deployment mode instructions
//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3100"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number:
//ssh to ov-research-4.uwaterloo.ca and run the following command:
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");

export default function RequestForm(props) {
  const notify1 = () =>
    toast.error("📍Please enter pick up location", {
      containerId: "B",
    });
  const notify2 = () =>
    toast.error("📍Please enter drop off location", {
      containerId: "B",
    });
  const notify3 = () =>
    toast.error("🗓Please enter a valid pick up date", {
      containerId: "B",
    });
  const notifyAll = () =>
    toast.success(
      <p>
        🎉your request was posted successfully
        <br />
        <br />
        📍pick up location: {pickup}
        <br />
        <br />
        📍drop off location: {dropoff}
        <br />
        <br />
        🗓pick up date: {date.format("DD/MM/YYYY")}
      </p>,
      {
        containerId: "A",
      }
    );

  const [pickup, setPickUp] = React.useState("");
  const [pickupError, setPickUpError] = React.useState(false);
  const [dropoff, setDropOff] = React.useState("");
  const [dropoffError, setDropOffError] = React.useState(false);
  const [date, setDate] = React.useState(dayjs());
  const [dateError, setDateError] = React.useState(false);

  const userId = 1;

  const callApiPostRequest = async () => {
    const url = serverURL + "/api/postRequest";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pickupLocation: pickup,
        dropoffLocation: dropoff,
        deaprtureDate: date.format("DD/MM/YYYY"),
        users_userId: userId,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      date.format("DD/MM/YYYY") >= dayjs().format("DD/MM/YYYY") &&
      pickup !== "" &&
      dropoff !== ""
    ) {
      callApiPostRequest();
      notifyAll();
      props.setOpen();
    }
    if (pickup === "") {
      notify1();
      setPickUpError(true);
    }
    if (pickup !== "") {
      setPickUpError(false);
    }
    if (dropoff === "") {
      notify2();
      setDropOffError(true);
    }
    if (dropoff !== "") {
      setDropOffError(false);
    }
    if (date.format("DD/MM/YYYY") < dayjs().format("DD/MM/YYYY")) {
      notify3();
      setDateError(true);
    }
    if (date.format("DD/MM/YYYY") >= dayjs().format("DD/MM/YYYY")) {
      setDateError(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <ToastContainer
          enableMultiContainer
          containerId={"B"}
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
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#ffd500" }}>
            <FmdGoodIcon fontSize="medium" style={{ color: "black" }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Post a Request
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl variant="standard">
                  <GoogleAutoComplete
                    label={"Pick Up Location"}
                    onChange={setPickUp}
                    error={pickupError}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <GoogleAutoComplete
                  label={"Drop Off Location"}
                  onChange={setDropOff}
                  error={dropoffError}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="standard">
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <DatePicker label={"Departure Date"} onChange={setDate} error={dateError} />
                  </Box>
                </FormControl>
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#ffd500",
                color: "black",
                "&:hover": {
                  backgroundColor: "#ffd500",
                  color: "#be0002",
                },
                fontWeight: "bold",
              }}
              variant="contained"
            >
              Post Ride Request
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
