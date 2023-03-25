const { Server } = require("socket.io");

const io = new Server({
    cors:{
        origin: "http://localhost:3000"
    }
});

io.on("connection", (socket) => {

    io.emit("firstEvent", "Just a Test")
  console.log("connected eh bud!");
});

io.listen(7500);