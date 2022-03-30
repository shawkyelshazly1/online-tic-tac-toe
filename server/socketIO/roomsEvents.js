const {
  addNewUser,
  generateRoomName,
  getRoomUsersCount,
  createNewRoom,
  isRoomExist,
  roomHasCapacity,
} = require("../rooms");

// joining room
const joinRandomRoom = (socket, client) => {
  socket.on("join-random-room", () => {
    // Generate room name & add user to room
    let roomName = generateRoomName();

    let roomCreated = createNewRoom(socket.id, roomName);

    if (roomCreated) {
      socket.join(roomName);
      client.sockets.in(roomName).emit("joined-room");
    } else if (!roomCreated && roomHasCapacity(socket, roomName)) {
      addNewUser(socket.id, roomName);
      socket.join(roomName);
      client.sockets.in(roomName).emit("joined-room");
    }
  });
};

// creating custom room
const createCustomRoom = (socket, client) => {
  socket.on("create-room", ({ roomName }) => {
    let roomCreated = createNewRoom(socket.id, roomName);
    if (roomCreated) {
      socket.join(roomName);
      client.sockets.in(roomName).emit("join-room");
    } else {
      socket.emit("error", { msg: "Room exists already" });
    }
  });
};

// join custom room
const joinCustomRoom = (socket, client) => {
  socket.on("join-room", ({ roomName }) => {
    if (!isRoomExist(roomName)) {
      socket.emit("error", { msg: "Invalid Room Name." });
    } else if (roomHasCapacity(socket, roomName)) {
      addNewUser(socket.id, roomName);
      client.sockets.in(roomName).emit("joined-room");
    }
  });
};

// disconnect user from room
const userLeftRoom = (socket, client) => {
  socket.on("disconnecting", () => {
    client.sockets.in(socket.rooms[0]).emit("user-left");
  });
};

// combine all room events
const initRoomsEvents = (socket, client) => {
  joinRandomRoom(socket, client);
  createCustomRoom(socket, client);
  joinCustomRoom(socket, client);
  userLeftRoom(socket, client);
};

module.exports = { initRoomsEvents };
