import * as socketActionTypes from "./socket-actionTypes";

const initialState = {
  socket: undefined,
  joinedRoom: false,
  gameStarted: false,
  gameOver: false,
  erro: "",
};

const socketReducer = function (state = initialState, action) {
  switch (action.type) {
    case socketActionTypes.SOCKET_CONNECTED:
      return {
        ...state,
        socket: action.payload.socket,
      };
    case socketActionTypes.JOINED_ROOM:
      return {
        ...state,
        joinedRoom: true,
        error: "",
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
    default:
      return {
        ...state,
      };
  }
};

export default socketReducer;
