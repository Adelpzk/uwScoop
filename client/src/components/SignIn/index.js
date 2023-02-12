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
import { ToastContainer, toast } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

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

export default function SignIn() {
    const error1 = () =>
        toast.error("Please fill out all required fields!", {
            containerId: "error",
        });

    const failConfirmPassword = () =>
        toast.error("Passwords do not match!", {
            containerId: "error",
        });

    const notifyAll = () =>
        toast.success(<p>🎉Welcome to uwScoop, {firstName}!</p>, {
            containerId: "success",
        });

    const [error, setError] = React.useState(false);
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [program, setProgram] = React.useState("");
    const [year, setYear] = React.useState("");
    const [birthday, setBirthday] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [music, setMusic] = React.useState("");

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
                birthday: birthday,
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
            setError(true)
            failConfirmPassword();
        }
        else {
            callApiPostRequest();
            console.log(firstName, lastName, password, email, program, year);
            redirectHome();
        }
    };

    return (
        <MuiThemeProvider theme={theme}>
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
                <Paper
                    className={classes.paper}
                    style={{ border: "none", boxShadow: "none", overflow: "hidden" }}
                >
                    <Card
                        style={{
                            border: "none",
                            boxShadow: "none",
                            height: "80vh",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <form>
                            <Typography
                                variant="h4"
                                style={{
                                    marginBottom: 20,
                                    fontStyle: "oblique",
                                    fontWeight: "bold",
                                }}
                            >
                                Sign up to uwScoop!
                            </Typography>
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
                            <hr style={{ backgroundColor: "#ffd500", height: "2px", border: "none" }} />
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
                                <TextField
                                    label="Birthday"
                                    id="names"
                                    type="text"
                                    onChange={(event) => setBirthday(event.target.value)}
                                />
                                <FormControl sx={{ minWidth: 120 }}>
                                    <InputLabel >Music Preference</InputLabel>
                                    <Select value={music} label="Music Preference" onChange={(event) => setMusic(event.target.value)}>
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

                            <br />
                            <br />
                            <Button
                                variant="contained"
                                startIcon={<StartIcon />}
                                sx={{
                                    marginTop: 2,
                                    backgroundColor: "#ffd500",
                                    color: "black",
                                    "&:hover": {
                                        backgroundColor: "#ffd500",
                                        color: "#be0002",
                                    },
                                    fontWeight: "bold",
                                }}
                                onClick={handleSubmit}
                            >
                                Create Account
                            </Button>
                        </form>
                    </Card>
                </Paper>
            </div>
        </MuiThemeProvider>
    );
}
