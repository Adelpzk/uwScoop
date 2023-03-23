const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: ['http://localhost:3000' , 'http://localhost:3001'],
    methods: ['GET', 'POST']
  },
});

let onlineUsers = [];

const addNewUser = (userEmail, socketId) => {
  !onlineUsers.some((user) => user.userEmail === userEmail) &&
    onlineUsers.push({ userEmail, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socket !== socketId);
};

const getUser = (userEmail) => {
  return onlineUsers.find((user) => user.userEmail == userEmail);
};

io.on("connection", (socket) => {
    console.log('CONNECTED')
    socket.on('sendMessage', ({senderEmail, receiverEmail, text, time})=>{
        console.log("Sent by:" + senderEmail)
        console.log("Received by:" + receiverEmail)

        const receiver = getUser(receiverEmail)
        io.to(receiver.socketId).emit("getMessage", {
            senderEmail,
            receiverEmail,
            text,
            time
        })
    })
  socket.on("newUser", (userEmail) => {
    addNewUser(userEmail, socket.id)
    // console.log('USERS:')
    console.log(onlineUsers);
  })

  socket.on("sendNotification", ({senderEmail, receiverEmail, date, type}) => {
    console.log(senderEmail)
    console.log(receiverEmail);
    const receiver = getUser(receiverEmail)
    console.log("receiver: " + JSON.stringify(receiver));
    io.to(receiver.socketId).emit("getNotification", {
        senderEmail,
        date,
        type
    })
  })
  socket.on("disconnect", () => {
    removeUser(socket.id)
  })
});

io.listen(7500);
