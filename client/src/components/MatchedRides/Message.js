import "./Message.css";
// import { format } from "timeago.js";

export default function Message({message, own}) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <p className="messageName">{message.sender}</p>
        <p className="messageText">{message.message}</p>
      </div>
      <div className="messageBottom">{message.time}</div>

    </div>
  );
}