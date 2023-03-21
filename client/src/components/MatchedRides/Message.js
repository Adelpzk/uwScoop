import "./Message.css";
// import { format } from "timeago.js";

export default function Message({message}) {
  return (
    <div className="message">
      <div className="messageTop">
        <p className="messageName">{message.sender}</p>
        <p className="messageText">{message.message}</p>
      </div>
    </div>
  );
}