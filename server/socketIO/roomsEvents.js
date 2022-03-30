const {
  addNewUser,
  generateRoomName,
  getRoomUsersCount,
  createNewRoom,
  isRoomExist,
  roomHasCapacity,
  rooms,
  removeUser,
  getUserRoom,
} = require("../rooms");

// joining room
const joinRandomRoom = (socket, client) => {
  socket.on("join-random-room", () => {
    // Generate room name & add user to room
    let roomName = generateRoomName();

    let roomCreated = createNewRoom(socket.id, roomName);

    if (roomCreated) {
      socket.join(roomName);
      if (getRoomUsersCount(roomName) < 2) {
        socket.emit("joined-room");
      } else {
        client.sockets.in(roomName).emit("start-game");
      }
    } else if (!roomCreated && roomHasCapacity(socket, roomName)) {
      if (addNewUser(socket.id, roomName)) {
        socket.join(roomName);
        if (getRoomUsersCount(roomName) < 2) {
          socket.emit("joined-room");
        } else {
          client.sockets.in(roomName).emit("start-game");
        }
      }
    }
  });
};

// creating custom room
const createCustomRoom = (socket, client) => {
  socket.on("create-room", ({ roomName }) => {
    let roomCreated = createNewRoom(socket.id, roomName);
    if (roomCreated) {
      socket.join(roomName);
      socket.emit("joined-room");
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
      if (addNewUser(socket.id, roomName)) {
        socket.join(roomName);
        if (getRoomUsersCount(roomName) < 2) {
          socket.emit("joined-room");
        } else {
          client.sockets.in(roomName).emit("start-game");
        }
      }
    }
  });
};

// disconnect user from room
const userLeftRoom = (socket, client) => {
  let roomName = "";
  socket.on("disconnecting", () => {
    roomName = [...socket.rooms][1];
    removeUser(socket.id);
  });
  socket.on("disconnect", () => {
    socket.broadcast.to(roomName).emit("user-left");
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
