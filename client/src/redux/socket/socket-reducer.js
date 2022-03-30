import * as socketActionTypes from "./socket-actionTypes";

const initialState = {
  socket: undefined,
  joinedRoom: false,
  gameStarted: false,
  gameOver: false,
  erro: "",
  roomName: "",
  playerMarker: "",
  myTurn: false,
  board: ["", "", "", "", "", "", "", "", ""],
};

const socketReducer = function (state = initialState, action) {
  switch (action.type) {
    case socketActionTypes.SOCKET_CONNECTED:
      return {
        ...state,
        socket: action.payload.socket,
      };
    case socketActionTypes.JOINED_ROOM:
      console.log(action.payload.playerMarker);
      return {
        ...state,
        joinedRoom: true,
        error: "",
        roomName: action.payload.roomName,
        playerMarker: action.payload.playerMarker,
      };
    case socketActionTypes.GAME_STARTED:
      return {
        ...state,
        gameStarted: true,
        error: "",
      };
    case socketActionTypes.SHOW_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    case socketActionTypes.USER_LEFT:
      return {
        ...state,
        joinedRoom: false,
        gameStarted: false,
        gameOver: false,
        erro: "",
      };
    case socketActionTypes.SWITCH_TURN:
      return {
        ...state,
        myTurn: action.payload.currentTurn === state.playerMarker,
      };

    case socketActionTypes.PLACE_MARKER:
      let temp = state.board;
      temp[action.payload.tileNo] = action.payload.playerMarker;
      return { ...state, board: temp };

    default:
      return {
        ...state,
      };
  }
};

export default socketReducer;
