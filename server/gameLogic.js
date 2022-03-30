let winningCases = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let emptyBoard = ["", "", "", "", "", "", "", "", ""];

// checking winner based on the baord and played index

// Gameboard Class
class GameBoard {
  constructor() {
    this.board = emptyBoard;
  }

  // add played move on board
  addToBoard = (index, playerMarker) => {
    if (board[index] === "") {
      board[index] = playerMarker;
    }
  };

  // reseting board
  resetBoard = () => {
    this.board = emptyBoard;
  };

  // check for winner
  checkWinner = (index, playerMarker) => {
    return winningCases
      .filter((winningCase) => winningCase.includes(index))
      .some((possibleCase) => {
        let win = possibleCase.every(
          (index) => this.board[index] === playerMarker
        );
        if (win) {
          return possibleCase;
        }
        return null;
      });
  };
}




module.exports = { GameBoard };
