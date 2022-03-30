const { Server } = require("socket.io");

// Initializing the socketIO server
const initSocketIO = (httpServer) => {
  const ioServer = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  ioServer.on("connection", (socket) => {
    console.log(`New client connected`);

    socket.on("disconnected", () => {
      console.log(` client disconnected`);
    });
  });
};

module.exports = {
  initSocketIO,
};
