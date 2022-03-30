const { remove } = require("lodash");
const { GameBoard } = require("./gameLogic");
// initial state

let rooms = [];
let roomNo = 1;

// Adding new user to room
const addNewUser = (socketId, roomName) => {
  let room = rooms.find((room) => room.room === roomName);
  if (room) {
    let userFound = room.users.find((user) => user.socketId === socketId);

    if (!userFound) {
      editedRoom = room.users.push({ socketId, playerMarker: "O" });
      return true;
    } else {
      return false;
    }
  }
};

// removing user from room
const removeUser = (socketId) => {
  let editedRoom = rooms.find((room) =>
    room.users.find((user) => user.socketId === socketId)
  );
  if (!editedRoom) {
    return;
  }
  let removedUser = remove(editedRoom.users, function (user) {
    return user.socketId === socketId;
  });

  if (editedRoom.users.length === 0) {
    remove(rooms, function (room) {
      return room.room === editedRoom.room;
    });
  } else {
    rooms = rooms.map((room) =>
      room.room == editedRoom.room ? editedRoom : room
    );
  }
};

// get player marker
const getPlayerMarker = (socketId, roomName) => {
  let roomUsers = rooms.find((room) => room.room === roomName).users;
  return roomUsers.find((user) => user.socketId === socketId).playerMarker;
};

// get room Users count
const getRoomUsersCount = (roomName) => {
  let room = rooms.find((room) => room.room === roomName);
  if (room) {
    return room.users.length;
  } else {
    return 0;
  }
};

//generate random roomName
const generateRoomName = () => {
  let roomName = `Room-${Math.round(roomNo / 2)}`;
  roomNo += 1;
  return roomName;
};

// get Room Board
const getRoomBoard = (roomName) => {
  return rooms.find((room) => room.room === roomName).board;
};

// create new Room
const createNewRoom = (socketId, roomName) => {
  let room = rooms.find((room) => room.room === roomName);
  if (room) {
    return null;
  }

  // creating room id doesn't exist
  rooms.push({
    room: roomName,
    users: [{ socketId, playerMarker: "X" }],
    board: new GameBoard(),
  });
  return true;
};

// validate room exists
const isRoomExist = (roomName) => {
  return rooms.find((room) => room.room === roomName);
};

// validate max room users
const roomHasCapacity = (socket, roomName) => {
  let usersCount = getRoomUsersCount(roomName);
  if (usersCount === 2) {
    socket.emit("error", { msg: "Room is full!" });
    return false;
  }
  return true;
};

const getUserRoom = (socketId) => {
  let editedRoom = rooms.find((room) =>
    room.users.find((user) => user.socketId === socketId)
  );

  console.log(editedRoom);

  if (editedRoom) {
    return editedRoom.room;
  }
};

module.exports = {
  getUserRoom,
  addNewUser,
  roomHasCapacity,
  removeUser,
  getPlayerMarker,
  generateRoomName,
  getRoomUsersCount,
  createNewRoom,
  isRoomExist,
  getRoomBoard,
  rooms,
};
