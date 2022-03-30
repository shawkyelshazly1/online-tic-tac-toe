const { Server } = require("socket.io");
const { initRoomsEevents } = require("./roomsEevents");

// Initializing the socketIO server
const initSocketIO = (httpServer) => {
  const ioServer = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  ioServer.on("connection", (socket) => {
    console.log(`New client connected`);
    initRoomsEevents(socket, ioServer);
  });
};

module.exports = {
  initSocketIO,
};
