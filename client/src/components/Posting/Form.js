import * as React from "react";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import PaymentIcon from "@mui/icons-material/Payment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import GoogleAutoComplete from "../Request/googleAutoComplete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DatePicker from "../Request/DatePicker";
import { ToastContainer, toast, Bounce } from "react-toastify";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "material-react-toastify/dist/ReactToastify.css";
import InputAdornment from "@mui/material/InputAdornment";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import TextField from "@mui/material/TextField";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { useAuth } from "../Context/AuthContext";


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
  const notify4 = () =>
    toast.error("✏️Please Complete the necessary fields", {
      containerId: "B",
    });
  const notifyAll = () =>
    toast.success(
      <p>
        🎉your ride was posted successfully
        <br />
        <br />
        📍pick up location: {pickup}
        <br />
        <br />
        📍drop off location: {dropoff}
        <br />
        <br />
        🗓pick up date: {date.format("DD/MM/YYYY")}
        <br />
        <br />
        🤑Amount: {amount}
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
  const [payment, setPayment] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [carModel, setCarModel] = React.useState("");
  const [color, setColor] = React.useState("");
  const [departureTime, setDepartureTime] = React.useState(dayjs('2014-08-18T21:11:54'));
  const [arrivalTime, setArrivalTime] = React.useState(dayjs('2014-08-18T21:11:54'));
  const [error, setError] = React.useState(false);
  const { currentUser } = useAuth();

  props.setRenderList(false);

  const callApiPostRide = async () => {
    const url = serverURL + "/api/postRide";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pickupLocation: pickup,
        dropoffLocation: dropoff,
        departureDate: date.format("DD/MM/YYYY"),
        payment: payment,
        amount: amount,
        carModel: carModel,
        color: color,
        departureTime: departureTime.format("h:mm:ss A"),
        arrivalTime: arrivalTime.format("h:mm:ss A"),
        users_email: currentUser.email,
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
    console.log(amount);
    if (
      date.format("DD/MM/YYYY") >= dayjs().format("DD/MM/YYYY") &&
      pickup !== "" &&
      dropoff !== "" &&
      payment !== "" &&
      amount !== "" &&
      carModel !== "" &&
      color !== "" &&
      departureTime !== "" &&
      arrivalTime !== ""
    ) {
      callApiPostRide();
      props.setRenderList(true);
      notifyAll();
      props.setOpen();
      // window.location.reload(false);
    }
    if (
      payment === "" ||
      amount === "" ||
      carModel === "" ||
      color === "" ||
      departureTime === "" ||
      arrivalTime === ""
    ) {
      setError(true);
      notify4();
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
            Post a Ride
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
                <FormControl
                  variant="standard"
                  fullWidth
                  style={{ minWidth: 120 }}
                >
                  <InputLabel style={{ marginLeft: 30 }}>
                    Payment Method
                  </InputLabel>
                  <Select
                    startAdornment={
                      <InputAdornment position="start">
                        <PaymentIcon />
                      </InputAdornment>
                    }
                    style={{ marginLeft: 30 }}
                    onChange={(event) => setPayment(event.target.value)}
                    error={error}
                  >
                    <MenuItem value={"Interac e-Transfer"}>
                      <em>Interac e-Transfer</em>
                    </MenuItem>
                    <MenuItem value={"Cash"}>Cash</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CurrencyTextField
                  label="Amount"
                  style={{ maxWidth: 95, marginTop: 4 }}
                  currencySymbol="$"
                  onChange={(event) => setAmount(event.target.value)}
                  error={error}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Car Model"
                  style={{ marginLeft: 30 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DirectionsCarFilledOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(event) => setCarModel(event.target.value)}
                  variant="standard"
                  error={error}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Color"
                  style={{ maxWidth: 95 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PaletteOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  onChange={(event) => setColor(event.target.value)}
                  error={error}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Departure Time"
                    value={departureTime}
                    onChange={(newValue) =>
                      setDepartureTime(newValue)
                    }
                    InputAdornmentProps={{ position: "start" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        style={{ marginLeft: 30, maxWidth: 130 }}
                        variant="standard"
                        error={error}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Estimated Arrival Time"
                    onChange={(newValue) =>
                      setArrivalTime(newValue)
                    }
                    value={arrivalTime}
                    InputAdornmentProps={{ position: "start" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        style={{ maxWidth: 130 }}
                        variant="standard"
                        error={error}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="standard">
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <DatePicker
                      label={"Departure Date"}
                      onChange={setDate}
                      error={dateError}
                    />
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
              Post your Ride
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
