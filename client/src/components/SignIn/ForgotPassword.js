import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import UwScoop from "../images/uw-scoop-logo-removebg.png";
import Copyright from "./Copyright";

const theme = createTheme();

export default function ForgotPassword() {
  const [email, setEmail] = React.useState("");
  const { resetPassword } = useAuth();
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <ToastContainer
          enableMultiContainer
          containerId={"FP"}
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

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <form>
            <Box component="form" noValidate sx={{ mt: 0 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(event) => setEmail(event.target.value)}
              />
              <Button
                variant="contained"
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
                onClick={() => resetPassword(email)}
              >
                Reset Password
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/signin" variant="body2">
                    Back to Sign In
                  </Link>
                </Grid>
                <Grid item sm>
                  <Link to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
