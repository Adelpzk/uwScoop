import * as React from "react";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
              <Grid item xs={12} sm={6}>
                <FormControl variant="standard">
                  <InputLabel
                    htmlFor="input-with-icon-adornment"
                    style={{ fontWeight: "bold" }}
                  >
                    Departure Date
                  </InputLabel>
                  <Input
                    id="input-with-icon-adornment"
                    startAdornment={
                      <InputAdornment position="start">
                        <CalendarMonthIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="standard">
                  <InputLabel
                    htmlFor="input-with-icon-adornment"
                    style={{ fontWeight: "bold" }}
                  >
                    Pick Up Location
                  </InputLabel>
                  <Input
                    style={{ width: 500 }}
                    id="input-with-icon-adornment"
                    startAdornment={
                      <InputAdornment position="start">
                        <FmdGoodIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="standard">
                  <InputLabel
                    htmlFor="input-with-icon-adornment"
                    style={{ fontWeight: "bold" }}
                  >
                    Drop Off Location
                  </InputLabel>
                  <Input
                    style={{ width: 500 }}
                    id="input-with-icon-adornment"
                    startAdornment={
                      <InputAdornment position="start">
                        <FmdGoodIcon />
                      </InputAdornment>
                    }
                  />
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
