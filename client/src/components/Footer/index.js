// src/componetns/Footer.tsx

import React, { FC, ReactElement } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import UwScoop from "../images/uw-scoop-logo-white.png"

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "rgb(0,0,0,0.92)",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}

    >
      <Container maxWidth="lg">
        <Grid container direction="row" alignItems="center">
          <Grid item xs={12}>
          <img src={UwScoop} style={{ display: { xs: 'flex', md: 'none' }, mx: 1, maxWidth: 170, maxHeight: 40}} />
            
            <Typography color="white" variant="subtitle1" style={{float: "right" , paddingTop: 10}}>
              {`${new Date().getFullYear()} | coded by The Algorithm Avengers`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
