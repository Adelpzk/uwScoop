// src/componetns/Footer.tsx

import React, { FC, ReactElement } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import UwScoop from "../images/uw-scoop-logo-white.png";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          height: "auto",
          backgroundColor: "rgb(0,0,0,0.92)",
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }}
      >
        <Container maxWidth="xxl">
          <Grid container direction="row" alignItems="center">
            <Grid item xs={12}>
              <img
                src={UwScoop}
                style={{
                  display: { xs: "flex", md: "none" },
                  mx: 1,
                  maxWidth: 170,
                  maxHeight: 40,
                  marginLeft: 40,
                }}
              />

              <Typography
                color="white"
                variant="subtitle1"
                style={{ float: "right", paddingTop: 10, marginRight: 40 }}
              >
                {`${new Date().getFullYear()} | coded by The Algorithm Avengers`}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default Footer;
