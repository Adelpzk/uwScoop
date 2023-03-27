import React, { FC, ReactElement } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import UwScoop from "../images/uw-scoop-logo-white.png";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import "./index.module.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import GitHubIcon from '@mui/icons-material/GitHub';
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Adel from "../images/AdelProfile.jpg"


import Free from "../images/FreeProfile.png"
import Saed from "../images/SaedProfile.png"
import Michael from "../images/MichaelProfile.png"

import LinkedInIcon from '@mui/icons-material/LinkedIn';

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
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            <Grid item xs={2}
            >
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
            </Grid>
            <Grid item
              xs={8}
              spacing={4}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              marginTop={'1px'}>
              <Link href="/Home" className="link">
                <Typography variant="subtitle1" style={{
                  color: "white",
                  margin: "12px",
                  fontWeight: "bold"
                }}>
                  HOME
                </Typography>
              </Link>
              <Link href="/Requests">
                <Typography variant="subtitle1" style={{
                  color: "white",
                  margin: "12px",
                  fontWeight: "bold"
                }}>
                  REQUEST
                </Typography>
              </Link>
              <Link href="/Posts">
                <Typography variant="subtitle1" style={{
                  color: "white",
                  margin: "12px",
                  fontWeight: "bold"
                }}>
                  POST
                </Typography>
              </Link>
              <Link href="/Matches">
                <Typography variant="subtitle1" style={{
                  color: "white",
                  margin: "12px",
                  fontWeight: "bold",
                }}>
                  MATCHES
                </Typography>
              </Link>
              <Button onClick={handleClickOpen}>
                <Link>
                  <Typography variant="subtitle1" style={{
                    color: "white",
                    margin: "12px",
                    fontWeight: "bold"
                  }}>
                    ABOUT
                  </Typography>
                </Link>
              </Button>

            </Grid>
            <Grid item xs={2}>
              <Typography
                color="white"
                variant="subtitle1"
                style={{ float: "right", marginRight: 10 }}
              >
                {`The Algorithm Avengers © ${new Date().getFullYear()}`}
              </Typography>
            </Grid>
          </Grid>

          <Dialog
            open={open}
            onClose={handleClose}
            style={{
              boxShadow: "none", border: "none",
            }}
            PaperProps={{
              sx: {
                maxHeight: 1000
              }
            }}
            fullWidth
            maxWidth="xs"
          >
            <DialogTitle>
              <strong>Welcome to uwScoop! 🚗</strong>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#ffd500",
                  color: "black",
                  fontWeight: "bold",
                  marginLeft: "85px",
                }}
                onClick={handleClose}
              >
                <CloseIcon />
              </Button>

            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                A new rideshare application exclusive to University of Waterloo Students. uwScoop automatically matches you with rides that fit your criteria. Make new friends and enjoy your ride!
              </DialogContentText>
              <br />
              <DialogContentText>
                Project developed for MSCI342 by the Algorithm Avengers 🦸🏼‍♂️
              </DialogContentText>
              <br />
              <DialogContentText>
                <strong>
                  Developed By:
                </strong>

                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '15px' }}>
                  <IconButton sx={{ p: 0 }}>
                    <Avatar alt="Adel" src={Adel} style={{width:'70px', height:'70px'}}/>
                  </IconButton>
                  <ul style={{ marginLeft: '8px', marginRight: '5px' }}>Adel Pazoki</ul>
                  <Link href="https://www.linkedin.com/in/adel-pazoki-toroudi/" target="_blank">
                    <LinkedInIcon />
                  </Link>

                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '15px' }}>
                  <IconButton sx={{ p: 0 }}>
                    <Avatar alt="Michael" src={Michael} style={{width:'70px', height:'70px'}}/>
                  </IconButton>
                  <ul style={{ marginLeft: '8px', marginRight: '5px' }}>Michael Sheng</ul>
                  <Link href="https://www.linkedin.com/in/michaeljsheng/" target="_blank">
                    <LinkedInIcon />
                  </Link>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '15px' }}>
                  <IconButton sx={{ p: 0 }}>
                    <Avatar alt="Free" src={Free} style={{width:'70px', height:'70px'}}/>
                  </IconButton>
                  <ul style={{ marginLeft: '8px', marginRight: '5px' }}>Free Guang Zhang</ul>
                  <Link href="https://www.linkedin.com/in/freezhang/" target="_blank">
                    <LinkedInIcon />
                  </Link>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '15px' }}>
                  <IconButton sx={{ p: 0 }}>
                    <Avatar alt="Saed" src={Saed} style={{width:'70px', height:'70px'}}/>
                  </IconButton>
                  <ul style={{ marginLeft: '8px', marginRight: '5px' }}>Saed Nour</ul>
                  <Link href="https://www.linkedin.com/in/saed-nour/" target="_blank">
                    <LinkedInIcon />
                  </Link>
                </div>
              </DialogContentText>
              <br />
              <DialogContentText>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Link href="https://github.com/Adelpzk/uwScoop" target="_blank" style={{ marginRight:'5px'}}>
                    <GitHubIcon />
                  </Link>
                  Check out our project repo!
                </div>


              </DialogContentText>
            </DialogContent>

          </Dialog>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default Footer;
