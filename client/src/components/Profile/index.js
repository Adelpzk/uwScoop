import * as React from "react";
import Button from "@mui/material/Button";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import StartIcon from "@mui/icons-material/Start";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import TextField from "@mui/material/TextField";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useAuth } from "../Context/AuthContext";
import DatePicker from "./DatePicker";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import FaceIcon from '@mui/icons-material/Face';
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";

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

export default function Profile(props) {
  const { signup } = useAuth();
  const { currentUser, updatePassword, upSuccess } = useAuth();

  const error1 = () =>
    toast.error("Please fill out all required fields!", {
      containerId: "profile",
    });

  const failConfirmPassword = () =>
    toast.error("Passwords do not match!", {
      containerId: "profile",
    });
  const failPasswordValid = () =>
    toast.error("Passwords must be 6 characters long!", {
      containerId: "profile",
    });

  const success = () =>
    toast.success(<p>🎉Information updated successfully!</p>, {
      containerId: "profile",
    });

  const ImageDeleteSuccess = () =>
    toast.success(<p>🗑 Your Image was Deleted!</p>, {
      containerId: "profile",
    });

  const passSuccess = () =>
    toast.success(<p>Password updated successfully!</p>, {
      containerId: "A",
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
  const [image, setImage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [passwordChanged, setPasswordChanged] = React.useState(false);

  const [userInfo, setUserInfo] = React.useState([]);

  const history = useHistory();

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
      setUserInfo(parsed);

      setFirstName(parsed[0].first_name);
      setLastName(parsed[0].last_name);
      setPhoneNumber(parsed[0].phone_number);
      setEmail(parsed[0].email);
      setPassword(parsed[0].password);
      setConfirmPassword(parsed[0].password);
      setProgram(parsed[0].program);
      setMusic(parsed[0].music_prefrence);
      setYear(parsed[0].school_year);
      setBirthday(
        dayjs(
          parsed[0].birthday
            .replace(new RegExp("/", "g"), "-")
            .substring(6, 10) +
            "-" +
            parsed[0].birthday
              .replace(new RegExp("/", "g"), "-")
              .substring(3, 5) +
            "-" +
            parsed[0].birthday
              .replace(new RegExp("/", "g"), "-")
              .substring(0, 2)
        )
      );
      setImage("http://localhost:3000/" + parsed[0].image);
    });
  };

  React.useEffect(() => {
    loadUserInfo();
  }, [props.props]);

  const [file, setFile] = React.useState();
  const [fileName, setFileName] = React.useState("");

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("users_email", currentUser.email);
    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        users_email: currentUser.email,
      });
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  const callApiDeleteUserImage = async () => {
    const url = serverURL + "/api/DeleteUserImage";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  const callApiPostRequest = async () => {
    const url = serverURL + "/api/updateUserProfile";
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
        //birthday: birthday,
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
    updatePassword(password);
    if (
      firstName == "" ||
      lastName == "" ||
      email == "" ||
      program == "" ||
      password == "" ||
      confirmPassword == "" ||
      year == "" ||
      phoneNumber == "" ||
      music == ""
    ) {
      setError(true);
      error1();
    } else if (password != confirmPassword) {
      setError(true);
      failConfirmPassword();
    } else if (upSuccess == true) {
      setLoading(true);
      success();
      uploadFile();
      callApiPostRequest();
    }
    setLoading(false);
  };

  // const passwordChange = (password) => {
  //   const promise = [];
  //   promise.push(updatePassword(password))
  //   Promise.all(promise).then(()=>{
  //       passSuccess()
  //   })
  // }

  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <ToastContainer
          enableMultiContainer
          containerId={"profile"}
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
            marginBottom: 25,
          }}
        >
          {userInfo.map((option, index) => (
            <form>
              <Box
                sx={{
                  marginTop: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ mt: 2, bgcolor: "#ffd500" }}>
                  <FaceIcon
                    fontSize="medium"
                    style={{ color: "black" }}
                  />
                </Avatar>

                <Typography
                  style={{ marginBottom: 50 }}
                  component="h1"
                  variant="h5"
                >
                  Update Profile
                  {}
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
                  defaultValue={option.first_name}
                />
                <TextField
                  label="Last Name"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  type="text"
                  onChange={(event) => setLastName(event.target.value)}
                  defaultValue={option.last_name}
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
                defaultValue={option.phone_number}
              />
              <br />
              <TextField
                label="Email"
                id="email"
                formControlProps={{
                  fullWidth: true,
                }}
                type="text"
                disabled={true}
                defaultValue={currentUser.email}
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
                defaultValue={option.password}
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
                defaultValue={option.password}
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
                  defaultValue={option.program}
                />
                <TextField
                  label="Year"
                  id="names"
                  type="text"
                  onChange={(event) => setYear(event.target.value)}
                  defaultValue={option.school_year}
                />
              </div>
              <br />
              <div className="nameCols">
                <DatePicker
                  label={"Birthday"}
                  onChange={setBirthday}
                  defaultValue={dayjs(
                    option.birthday
                      .replace(new RegExp("/", "g"), "-")
                      .substring(6, 10) +
                      "-" +
                      option.birthday
                        .replace(new RegExp("/", "g"), "-")
                        .substring(3, 5) +
                      "-" +
                      option.birthday
                        .replace(new RegExp("/", "g"), "-")
                        .substring(0, 2)
                  ).toString()}
                />
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel>Music Preference</InputLabel>
                  <Select
                    value={music ? music : option.music_prefrence}
                    label="Music Preference"
                    onChange={(event) => setMusic(event.target.value)}
                    defaultValue={option.music_prefrence}
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
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                style={{ marginTop: 10 }}
              >
                <Button
                  variant="contained"
                  startIcon={<FileUploadIcon />}
                  sx={{
                    backgroundColor: "#ffd500",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "#ffd500",
                      color: "#be0002",
                    },
                    fontWeight: "bold",
                  }}
                  component="label"
                  disabled={loading}
                >
                  Upload new image {" " + fileName}
                  <input
                    hidden
                    onChange={saveFile}
                    accept="image/*"
                    type="file"
                  />
                </Button>
                <Button
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  sx={{
                    backgroundColor: "#be0002",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "#be0002",
                      color: "#ffd500",
                    },
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    callApiDeleteUserImage();
                    ImageDeleteSuccess();
                  }}
                  disabled={
                    image == "http://localhost:3000/null" ? true : false
                  }
                >
                  Delete Existing Image
                </Button>
              </Stack>
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
                disabled={loading}
              >
                Update Profile
              </Button>
            </form>
          ))}
        </Card>
      </div>
    </MuiThemeProvider>
  );
}
