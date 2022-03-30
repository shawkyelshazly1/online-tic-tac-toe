const { Server } = require("socket.io");
const { initRoomsEvents } = require("./roomsEvents");

// Initializing the socketIO server
const initSocketIO = (httpServer) => {
  const ioServer = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  ioServer.on("connection", (socket) => {
    console.log(`New client connected`);
    initRoomsEvents(socket, ioServer);
  });
};

module.exports = {
  initSocketIO,
};
