import * as React from "react";
import { HashLink } from "react-router-hash-link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import UwScoop from "../images/uw-scoop-logo-removebg.png";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { ToastContainer, toast, Bounce } from "react-toastify";

const pages = ["Home", "Request", "Post", "Matches"];
const settings = ["Profile", "Logout"];

const serverURL = "";

function ResponsiveAppBar({ socket }) {
  const { logout } = useAuth();
  const { currentUser } = useAuth();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElNotif, setAnchorElNotif] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [notifications, setNotifications] = React.useState([]);
  const [postedTripsId, setPostedTripsId] = React.useState(null);
  const [postedTripsEmail, setPostedTripsEmail] = React.useState(null);
  const [requestedTripsId, setRequestedTripsId] = React.useState(null);
  const [requestedTripsEmail, setRequestedTripsEmail] = React.useState(null);
  const [pendingState, setPendingState] = React.useState({});
  const [pendingPostState, setPendingPostState] = React.useState({});

  var key = 0;

  const callApiGetNotifs = async () => {
    const url = serverURL + "/api/getNotifs";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        users_email: currentUser.email,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  const loadNotifs = () => {
    callApiGetNotifs().then((res) => {
      var parsed = JSON.parse(res.express);
      console.log("Notifications Returned: " + JSON.stringify(parsed));
      setNotifications(parsed);
    });
  };

  // React.useEffect(() => {
  //   socket?.on("getNotification", (data) => {
  //     setNotifications((prev) => [...prev, data]);
  //   });
  // }, []);

  React.useEffect(() => {
    loadNotifs();
  }, []);

  console.log(notifications);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenNotif = (event) => {
    setAnchorElNotif(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseNotif = () => {
    setAnchorElNotif(null);
  };

  const history = useHistory();

  function handleLogOut() {
    logout();
    history.push("/signin");
  }

  const callApiGetUserInfo = async () => {
    const url = serverURL + "/api/getUserInfo";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        users_email: currentUser.email,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  const loadUserInfo = () => {
    callApiGetUserInfo().then((res) => {
      var parsed = JSON.parse(res.express);
      console.log("User Info Returned: " + JSON.stringify(parsed));
      if (parsed[0].image == null) {
        setImage("");
      } else {
        setImage("http://localhost:3000/" + parsed[0].image);
      }
    });
  };

  React.useEffect(() => {
    loadUserInfo();
  }, []);

  const notifyAccept = (action, senderEmail) =>
    toast.success(
      <p>
        🎉Accepted {action} from {senderEmail}
      </p>,
      {
        containerId: "Navbar",
      }
    );

  const notifyDecline = (action, senderEmail) =>
    toast.error(
      <p>
        ❌ Declined {action} from {senderEmail}
      </p>,
      {
        containerId: "Navbar",
      }
    );

  const callApiPostPending = async (id, pending) => {
    const url = serverURL + "/api/postPendingRequests";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        pending: pending,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  const callApiRequestPending = async (id, pending) => {
    const url = serverURL + "/api/postPendingPosts";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        pending: pending,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  const callApiAcceptNotif = async () => {
    const url = serverURL + "/api/acceptNotification";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        posted_trips_id: postedTripsId,
        posted_trips_users_email: postedTripsEmail,
        requested_trips_id: requestedTripsId,
        requested_trips_users_email: requestedTripsEmail,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  const callApiUnsedNotif = async (requestId, postId, status) => {
    const url = serverURL + "/api/unsedNotif";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestId: requestId,
        postId: postId,
        status: status,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  const handleAcceptNotif = async (
    id,
    senderEmail,
    postedtrips_id,
    requestedtrips_id,
    date,
    type,
    pending,
    pendingPost
  ) => {
    setPendingState(JSON.parse(pending));
    setPendingPostState(JSON.parse(pendingPost));
    let action;
    setRequestedTripsId(requestedtrips_id);
    setPostedTripsId(postedtrips_id);
    if (type == 1) {
      setPostedTripsEmail(currentUser.email);
      setRequestedTripsEmail(senderEmail);
      setPendingState((prevState) => ({
        ...prevState,
        [postedtrips_id]: 2,
      }));
      action = "Request";
    } else if (type == 2) {
      setPostedTripsEmail(senderEmail);
      setRequestedTripsEmail(currentUser.email);
      setPendingPostState((prevState) => ({
        ...prevState,
        [requestedtrips_id]: 2,
      }));
      action = "Invite";
    }

    console.log(pendingState);

    console.log(requestedTripsEmail);
    console.log(postedTripsEmail);
    console.log(requestedTripsId);
    console.log(postedTripsId);
    console.log(type);
    if (
      requestedTripsEmail &&
      requestedTripsId &&
      postedTripsEmail &&
      postedTripsId &&
      type == 1
    ) {
      callApiAcceptNotif();
      notifyAccept(action, senderEmail);
      callApiRequestPending(requestedTripsId, JSON.stringify(pendingState));
      // setNotifications(notifications.filter((notif) => notif.id !== id));
      callApiUnsedNotif(requestedTripsId, postedTripsId, type);
    }
    if (
      requestedTripsEmail &&
      requestedTripsId &&
      postedTripsEmail &&
      postedTripsId &&
      type == 2
    ) {
      callApiAcceptNotif();
      notifyAccept(action, senderEmail);
      callApiPostPending(postedTripsId, JSON.stringify(pendingPostState));
      //setNotifications(notifications.filter((notif) => notif.id !== id));
      callApiUnsedNotif(requestedTripsId, postedTripsId, type);
    }
  };

  const handleDeclineNotif = (
    postedtrips_id,
    requestedtrips_id,
    type,
    senderEmail
  ) => {
    let action;
    if (type == 1) {
      setPendingState((prevState) => ({
        ...prevState,
        [postedtrips_id]: 0,
      }));
      action = "Request";
    } else if (type == 2) {
      setPendingPostState((prevState) => ({
        ...prevState,
        [requestedtrips_id]: 0,
      }));
      action = "Invite";
    }
    setRequestedTripsId(requestedtrips_id);
    setPostedTripsId(postedtrips_id);
    if (requestedTripsId && postedTripsId && type == 1) {
      callApiRequestPending(requestedTripsId, JSON.stringify(pendingState));
      // setNotifications(notifications.filter((notif) => notif.id !== id));
      callApiUnsedNotif(requestedTripsId, postedTripsId, type);
      notifyDecline(action, senderEmail);
    }
    if (requestedTripsId && postedTripsId && type == 2) {
      callApiPostPending(postedTripsId, JSON.stringify(pendingPostState));
      // setNotifications(notifications.filter((notif) => notif.id !== id));
      callApiUnsedNotif(requestedTripsId, postedTripsId, type);
      notifyDecline(action, senderEmail);
    }
  };

  const displayNotifs = (
    id,
    senderEmail,
    postedtrips_id,
    requestedtrips_id,
    date,
    type,
    pending,
    pendingPost
  ) => {
    let action;
    let noun;
    let route;
    switch (type) {
      case 1:
        action = "Requested";
        noun = "your";
        route = requestedtrips_id;
        break;
      case 2:
        action = "Invited";
        noun = "their";
        route = postedtrips_id;
        break;
      default:
    }

    console.log("id " + route);

    return (
      <>
        <Box component="span" sx={{ p: 2, borderBottom: "1px solid red" }}>
          <HashLink to={`Matches#${route}`} style={{ textDecoration: "none" }}>
            <Typography color="black" variant="h8" onClick={handleCloseNotif}>
              🎉 {senderEmail + " " + action + " "} to join {noun} ride on{" "}
              {date}!{" "}
            </Typography>
          </HashLink>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#006400",
              color: "white",
              "&:hover": {
                backgroundColor: "#3CB371",
                color: "black",
              },
              fontWeight: "bold",
              justifyContent: "end",
              margin: 1,
            }}
            onClick={() =>
              handleAcceptNotif(
                id,
                senderEmail,
                postedtrips_id,
                requestedtrips_id,
                date,
                type,
                pending,
                pendingPost
              )
            }
          >
            Accept
          </Button>

          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#be0002",
              color: "white",
              "&:hover": {
                backgroundColor: "#FF6347",
                color: "black",
              },
              fontWeight: "bold",
              justifyContent: "end",
            }}
            onClick={() =>
              handleDeclineNotif(
                postedtrips_id,
                requestedtrips_id,
                type,
                senderEmail
              )
            }
          >
            Decline
          </Button>
        </Box>
      </>
    );
  };

  return (
    <AppBar position="static" style={{ background: "transparent" }}>
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <ToastContainer
            enableMultiContainer
            containerId={"Navbar"}
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

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "black",
                      margin: "5px",
                    }}
                    to={`/${page}`}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <a>
            <Link to={`/Home`}>
              <img
                src={UwScoop}
                style={{
                  display: { xs: "flex", md: "none" },
                  mx: 1,
                  maxWidth: 170,
                  paddingLeft: 30,
                }}
              />
            </Link>
          </a>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
                display: "flex",
                justifyContent: "flex-end",
              },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "inherit",
                  display: "block",
                  fontFamily: "sans-serif",
                  fontSize: 12.5,
                }}
              >
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                    margin: "5px",
                  }}
                  to={`/${page}`}
                >
                  <strong>{page}</strong>
                </Link>
              </Button>
            ))}
          </Box>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="default"
            onClick={handleOpenNotif}
            sx={{ marginRight: 2 }}
          >
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Box sx={{ flexGrow: 0 }}>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElNotif}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNotif)}
              onClose={handleCloseNotif}
            >
              {notifications.map(
                (notif) => (
                  console.log(
                    notif.senderEmail,
                    notif.postedtrips_id,
                    notif.requestedtrips_id,
                    notif.departure_date,
                    notif.status,
                    notif.pending,
                    notif.pendingPosts
                  ),
                  (
                    <MenuItem key={"Notif" + key++}>
                      {displayNotifs(
                        notif.idnotification,
                        notif.senderEmail,
                        notif.postedtrips_id,
                        notif.requestedtrips_id,
                        notif.departure_date,
                        notif.status,
                        notif.pending,
                        notif.pendingPosts
                      )}
                    </MenuItem>
                  )
                )
              )}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 0, marginRight: 1 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={image == "" ? "" : image} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
                to={`/Profile`}
              >
                <MenuItem key="profile" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
              </Link>
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
                to={`/History`}
              >
                <MenuItem key="profile" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">History</Typography>
                </MenuItem>
              </Link>
              <MenuItem key="logout" onClick={handleLogOut}>
                <Typography textAlign="center">Log Out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
