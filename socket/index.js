const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: ['http://localhost:3000' , 'http://localhost:3001'],
  },
});

let onlineUsers = [];

const addNewUser = (userEmail, socketId) => {
  !onlineUsers.some((user) => user.userEmail === userEmail) &&
    onlineUsers.push({ userEmail, socketId });
};

console.log(onlineUsers);

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socket !== socketId);
};

const getUser = (userEmail) => {
  return onlineUsers.find((user) => user.userEmail == userEmail);
};
io.on("connection", (socket) => {
  socket.on("newUser", (userEmail) => {
    addNewUser(userEmail, socket.id)
    console.log(onlineUsers);
  })

  socket.on("sendNotification", ({id,requestedtrips_id, postedtrips_id, senderEmail, receiverEmail, date, type, pending}) => {
    console.log(senderEmail)
    console.log(receiverEmail);
    const receiver = getUser(receiverEmail)
    console.log("receiver: " + JSON.stringify(receiver));
    io.to(receiver.socketId).emit("getNotification", {
        id,
        requestedtrips_id,
        postedtrips_id,
        senderEmail,
        date,
        type,
        pending
    })
  })
  socket.on("disconnect", () => {
    removeUser(socket.id)
  })
});

io.listen(7500);
