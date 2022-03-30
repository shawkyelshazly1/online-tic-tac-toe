const {
  addNewUser,
  generateRoomName,
  getRoomUsersCount,
  createNewRoom,
  isRoomExist,
  roomHasCapacity,
  removeUser,
  getPlayerMarker,
} = require("../utils/rooms");

// joining room
const joinRandomRoom = (socket, client) => {
  socket.on("join-random-room", () => {
    // Generate room name & add user to room
    let roomName = generateRoomName();

    let roomCreated = createNewRoom(socket.id, roomName);

    // validating if new room created or exists already
    if (roomCreated) {
      /**
       * if new room created join the user
       */
      socket.join(roomName);
      let playerMarker = getPlayerMarker(socket.id, roomName);
      if (getRoomUsersCount(roomName) < 2) {
        /**
         * send join event or start game if second player
         */
        socket.emit("joined-room", { roomName, playerMarker });
      } else {
        socket.emit("joined-room", { roomName, playerMarker });
        client.sockets.in(roomName).emit("start-game");
        let options = ["X", "O"];
        client.sockets.in(roomName).emit("switch-turn", {
          currentTurn: options[Math.floor(Math.random() * 2)],
        });
      }
      /**
       * If room exists & not full join user and emit the event
       */
    } else if (!roomCreated && roomHasCapacity(socket, roomName)) {
      if (addNewUser(socket.id, roomName)) {
        socket.join(roomName);
        let playerMarker = getPlayerMarker(socket.id, roomName);
        if (getRoomUsersCount(roomName) < 2) {
          socket.emit("joined-room", { roomName, playerMarker });
        } else {
          socket.emit("joined-room", { roomName, playerMarker });
          client.sockets.in(roomName).emit("start-game");
          let options = ["X", "O"];
          client.sockets.in(roomName).emit("switch-turn", {
            currentTurn: options[Math.floor(Math.random() * 2)],
          });
        }
      }
    }
  });
};

// creating custom room
const createCustomRoom = (socket, client) => {
  /**
   * listen to new room creation event from client
   */
  socket.on("create-room", ({ roomName }) => {
    let roomCreated = createNewRoom(socket.id, roomName);
    // checking if room created or already exists
    if (roomCreated) {
      // if created join user and send joined event as first user in room
      socket.join(roomName);
      let playerMarker = getPlayerMarker(socket.id, roomName);
      socket.emit("joined-room", { roomName, playerMarker });
    } else {
      // send error if room exists
      socket.emit("error", { msg: "Room exists already" });
    }
  });
};

// join custom room
const joinCustomRoom = (socket, client) => {
  /**
   * Listen to client event for joining custom room by name
   */
  socket.on("join-room", ({ roomName }) => {
    // validation room exists or not
    if (!isRoomExist(roomName)) {
      socket.emit("error", { msg: "Invalid Room Name." });

      // if room has capacity for another user or not
    } else if (roomHasCapacity(socket, roomName)) {
      if (addNewUser(socket.id, roomName)) {
        // join user and send join & start game event if second user
        socket.join(roomName);
        let playerMarker = getPlayerMarker(socket.id, roomName);

        if (getRoomUsersCount(roomName) < 2) {
          socket.emit("joined-room", { roomName, playerMarker });
        } else {
          socket.emit("joined-room", { roomName, playerMarker });
          client.sockets.in(roomName).emit("start-game");
          let options = ["X", "O"];
          client.sockets.in(roomName).emit("switch-turn", {
            currentTurn: options[Math.floor(Math.random() * 2)],
          });
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
