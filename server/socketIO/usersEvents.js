const { getRoomBoard } = require("../utils/rooms");
const { switchTurn } = require("../utils/users");

// User plays move
const PlayMove = (socket, client) => {
  socket.on("play-turn", ({ roomName, tileNo, playerMarker }) => {
    let board = getRoomBoard(roomName);
    board.addToBoard(tileNo, playerMarker);
    client.sockets.in(roomName).emit("played-turn", { tileNo, playerMarker });
    if (board.checkWinner(tileNo, playerMarker)) {
      client.sockets
        .in(roomName)
        .emit("gameOver", { msg: `Winner is Player ${playerMarker}` });
    }

    let currentTurn = switchTurn(playerMarker);

    client.sockets.in(roomName).emit("switch-turn", {
      currentTurn,
    });
  });
};

// combine all room events
const initUsersEvents = (socket, client) => {
  PlayMove(socket, client);
};

module.exports = { initUsersEvents };
