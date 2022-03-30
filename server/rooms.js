import { remove } from "lodash";

// initial state
let emmptyBoard = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let rooms = [];

// Adding new user to room
const addNewUser = (socketId, roomName) => {
  let room = rooms.find((room) => room.room === roomName);
  if (room) {
    editedRoom = room.users.push({ socketId, playerMarker: "O" });
  }
  // creating room id doesn't exist
  rooms.push({
    room: roomName,
    users: [{ socketId, playerMarker: "X" }],
    board: emmptyBoard,
  });
};

// removing user from room
const removeUser = (socketId) => {
  let editedRoom = rooms.find((room) => room.users.includes(socketId));
  let removedUser = remove(editedRoom.users, function (id) {
    return id === socketId;
  });
  rooms = rooms.map((room) => (room.room == roomName ? editedRoom : room));
};

// get player marker
const getPlayerMarker = (socketId, roomName) => {
  let roomUsers = rooms.find((room) => room.room === roomName).users;
  return roomUsers.find((user) => user.socketId === socketId).playerMarker;
};



module.exports = {
  addNewUser,
  removeUser,
  getPlayerMarker,
};
