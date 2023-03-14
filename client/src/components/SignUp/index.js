import * as React from "react";
import Button from "@mui/material/Button";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import classes from "./index.module.css";
import StartIcon from "@mui/icons-material/Start";
import TextField from "@mui/material/TextField";
import Typography from "@material-ui/core/Typography";
import "./index.css";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "material-react-toastify/dist/ReactToastify.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useAuth } from "../Context/AuthContext";
import DatePicker from "./DatePicker";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import UwScoop from "../images/uw-scoop-logo-removebg.png";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box } from "@mui/material";

const serverURL = "";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      The Algorithm Avengers {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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

export default function SignIn() {
  const { signup } = useAuth();
  const { currentUser } = useAuth();

  const error1 = () =>
    toast.error("Please fill out all required fields!", {
      containerId: "error",
    });

  const failConfirmPassword = () =>
    toast.error("Passwords do not match!", {
      containerId: "error",
    });
  const failPasswordValid = () =>
    toast.error("Passwords must be 6 characters long!", {
      containerId: "error",
    });

  const failEmal = () =>
    toast.error("Not a university of waterloo email!", {
      containerId: "error",
    });

  

  const [error, setError] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [PasswordValid, setPasswordValid] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [program, setProgram] = React.useState("");
  const [year, setYear] = React.useState("");
  const [birthday, setBirthday] = React.useState(dayjs());
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [music, setMusic] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const history = useHistory();

  const callApiPostRequest = async () => {
    const url = serverURL + "/api/registerUser";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        program: program,
        year: year,
        birthday: birthday.format("DD/MM/YYYY"),
        phoneNumber: phoneNumber,
        music: music,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  const redirectHome = () => {
    history.push("/Home");
  };

  const handleSubmit = (e) => {
    e.persist();
    if (
      firstName == "" ||
      lastName == "" ||
      email == "" ||
      password == "" ||
      program == "" ||
      year == "" ||
      phoneNumber == "" ||
      music == ""
    ) {
      setError(true);
      error1();
    } else if (password != confirmPassword) {
      setError(true);
      failConfirmPassword();
    } else if (password.length < 6) {
      setPasswordValid(true);
      failPasswordValid();
    } else if (!email.toLowerCase().includes("@uwaterloo.ca")) {
      failEmal();
    } else {
      setLoading(true);
      signup(email, password, redirectHome);
      callApiPostRequest();
      console.log(firstName, lastName, password, email, program, year);
    }
    setLoading(false);
  };

  return (
    <div className={classes.root}>
      <ToastContainer
        enableMultiContainer
        containerId={"error"}
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

      <Card
        style={{
          border: "none",
          boxShadow: "none",
          display: "flex",
          alignItems: "center",
        }}
      >
        <form>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={UwScoop}
              style={{
                display: { xs: "flex", md: "none" },
                marginBottom: 20,
                maxWidth: 200,
              }}
            />
            <Avatar sx={{ mt: 2, bgcolor: "#ffd500" }}>
              <LockOutlinedIcon fontSize="medium" style={{ color: "black" }} />
            </Avatar>

            <Typography
              style={{ marginBottom: 50 }}
              component="h1"
              variant="h5"
            >
              Sign Up
            </Typography>
          </Box>

          <div className="nameCols">
            <TextField
              label="First Name"
              formControlProps={{
                fullWidth: true,
              }}
              type="text"
              onChange={(event) => setFirstName(event.target.value)}
            />
            <TextField
              label="Last Name"
              formControlProps={{
                fullWidth: true,
              }}
              type="text"
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          <br />
          <TextField
            label="Phone Number"
            id="names"
            formControlProps={{
              fullWidth: true,
            }}
            type="text"
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
          <br />
          <TextField
            label="Email"
            id="email"
            formControlProps={{
              fullWidth: true,
            }}
            type="text"
            onChange={(event) => setEmail(event.target.value)}
          />
          <br />
          <TextField
            label="Password"
            id="password"
            formControlProps={{
              fullWidth: true,
            }}
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <br />
          <TextField
            label="Confirm Password"
            id="password"
            formControlProps={{
              fullWidth: true,
            }}
            type="password"
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          <br />
          <hr
            style={{
              backgroundColor: "#ffd500",
              height: "2px",
              border: "none",
            }}
          />
          <br />

          <div className="dateCols">
            <TextField
              label="Program"
              id="names"
              formControlProps={{
                fullWidth: true,
              }}
              type="text"
              onChange={(event) => setProgram(event.target.value)}
            />
            <TextField
              label="Year"
              id="names"
              type="text"
              onChange={(event) => setYear(event.target.value)}
            />
          </div>
          <br />
          <div className="nameCols">
            <DatePicker label={"Birthday"} onChange={setBirthday} />
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Music Preference</InputLabel>
              <Select
                value={music}
                label="Music Preference"
                onChange={(event) => setMusic(event.target.value)}
              >
                <MenuItem value={"Country"}>Country</MenuItem>
                <MenuItem value={"Classical"}>Classical</MenuItem>
                <MenuItem value={"Jazz"}>Jazz</MenuItem>
                <MenuItem value={"Latin"}>Latin</MenuItem>
                <MenuItem value={"Pop"}>Pop</MenuItem>
                <MenuItem value={"Rap"}>Rap</MenuItem>
                <MenuItem value={"R&B"}>R&B</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Button
            variant="contained"
            startIcon={<StartIcon />}
            sx={{
              marginTop: 2,
              marginBottom: 1,
              backgroundColor: "#ffd500",
              color: "black",
              "&:hover": {
                backgroundColor: "#ffd500",
                color: "#be0002",
              },
              fontWeight: "bold",
            }}
            onClick={handleSubmit}
            type="submit"
            disabled={loading}
          >
            Create Account
          </Button>
          <Typography variant="subtitle1">
            Already have an account?{" "}
            <Link to="/signin" variant="body2">
              {"signin"}
            </Link>
          </Typography>
        </form>
      </Card>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </div>
  );
}
