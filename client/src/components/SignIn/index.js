import * as React from "react";
import Button from "@mui/material/Button";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import classes from "./index.module.css";
import StartIcon from "@mui/icons-material/Start";
import TextField from '@mui/material/TextField';
import Typography from "@material-ui/core/Typography";
import "./index.css";
import { ToastContainer, toast, Bounce } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";

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


    const notifyAll = () =>
        toast.success(
            <p>
                🎉Welcome to uwScoop, {firstName}!
            </p>,
            {
                containerId: "success",
            }
        );

    

    const [error, setError] = React.useState(false);
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [program, setProgram] = React.useState("");
    const [year, setYear] = React.useState("");

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
            }),
        });
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message);
        }
        return body;
    };

    const handleSubmit = (e) => {
        e.persist();
        if (firstName == "" || lastName == "" || email == "" || password == "" || program == "" || year == "") {
            setError(true)
            error1();
        } else {
            console.log('1')
            // notifyAll();
            callApiPostRequest();
        }
        console.log(firstName, lastName, password, email, program, year)
    }

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
                    <Card style={{ border: "none", boxShadow: "none", height: '80vh', display: 'flex', alignItems: 'center' }}>
                        <form>
                            <Typography
                                variant="h4"
                                style={{
                                    marginBottom: 10,
                                    fontStyle: "oblique",
                                    fontWeight: "bold",
                                }}
                            >Register
                            </Typography>
                            <div className="nameCols">
                                <TextField
                                    label="First Name"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    type="text"
                                    onChange={(event) => setFirstName(event.target.value)}
                                />
                                <TextField
                                    label="Last Name"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    type="text"
                                    onChange={(event) => setLastName(event.target.value)}
                                />
                            </div>
                            <br />
                            <TextField
                                label="Email"
                                id="email"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                type="text"
                                onChange={(event) => setEmail(event.target.value)}

                            />
                            <br />
                            <TextField
                                label="Password"
                                id="password"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                type="password"
                                onChange={(event) => setPassword(event.target.value)}

                            />
                            <br />

                            <div className="dateCols">
                                <TextField
                                    label="Program"
                                    id="names"
                                    formControlProps={{
                                        fullWidth: true
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
                            >Register
                            </Button>

                        </form>

                    </Card>
                </Paper>
            </div>
        </MuiThemeProvider>
    );
}
