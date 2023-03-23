import * as React from "react";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import io from 'socket.io-client'
import { useRadioGroup } from "@material-ui/core";
import Button from "@mui/material/Button";
import Message from "./Message";
import { useAuth } from "../Context/AuthContext";

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

export default function MessagingModal({ socket, receiver }) {
  const [message, setMessage] = React.useState('')
  const [arrivalMessage, setArrivalMessage] = React.useState(null)
  const { currentUser } = useAuth();
  const [messages, setMessages] = React.useState([]);


  socket.emit('message', 'joined chat room')

  React.useEffect(() => {
    socket?.emit("newUser", currentUser.email);
  }, [socket, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Message sent from " + currentUser.email + " to " + receiver)
    const today = new Date(), time = today.getHours() + ':' + today.getMinutes()

    if (message === "") {
      return
    }
    const messageInfo = {
      sender: currentUser.email,
      receiver: receiver,
      message: message,
      time:time
    }
    console.log(messageInfo)

    socket.emit("sendMessage", {
      senderEmail: currentUser.email,
      receiverEmail: receiver,
      text: message,
      time: time
    })

    setMessages([...messages, messageInfo]);
    console.log(messages)
    setMessage("")
  }

  React.useEffect(() => {
    socket.on("getMessage", (data) => {
      const messageInfo = {
        sender: data.senderEmail,
        receiver: data.receiverEmail,
        message: data.text,
        time: data.time
      }
      setMessages((prev) => [...prev, messageInfo]);
      console.log(messages)
    });
  }, [socket]);

  return (
    <MuiThemeProvider theme={theme}>
      <div>
        {messages.map(m => (
          <Message message={m} own={m.sender === currentUser.email}/>
        ))}

        <div className="sendBox">
          <input value={message} onChange={(e) => setMessage(e.target.value)} />
          <Button
            variant="contained"
            type="submit"
            style={{
              backgroundColor: "ffd500",
              borderRadius: "10px",
              color: "white",
              "&:hover": {
                borderColor: "#ffd500",
                color: "#ffd500",
              },
              fontWeight: "bold",
            }}
            onClick={handleSubmit}
          >
            Send
          </Button>

        </div>


      </div>
    </MuiThemeProvider>
  );
}
