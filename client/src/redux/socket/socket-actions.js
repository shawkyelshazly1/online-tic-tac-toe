import io from "socket.io-client";
import * as socketActionTypes from "./socket-actionTypes";

// initialize socket connection action
export const initSocketConnection = (URL) => (dispatch) => {
  const socket = io(URL);
  dispatch({ type: socketActionTypes.SOCKET_CONNECTED, payload: { socket } });
};

// join random room request action
export const joinRandRoom = (socket) => (dispatch) => {
  socket.emit("join-random-room");
};

//create custom room action
export const createCustomRoom = (socket, roomName) => (dispatch) => {
  socket.emit("create-room", { roomName });
};

//join custom room
export const joinCustomRoom = (socket, roomName) => (dispatch) => {
  socket.emit("join-room", { roomName });
};

// dispatched action to confirm joining room based on socket event
export const joinedRoom = (roomName, playerMarker) => (dispatch) => {
  dispatch({
    type: socketActionTypes.JOINED_ROOM,
    payload: { roomName, playerMarker },
  });
};

// game started action
export const gameStarted = () => (dispatch) => {
  dispatch({
    type: socketActionTypes.GAME_STARTED,
  });
};

// game started action
export const setError = (error) => (dispatch) => {
  dispatch({ type: socketActionTypes.SHOW_ERROR, payload: { error } });
};

// user left room
export const userLeftRoom = () => (dispatch) => {
  alert("User Left");
  dispatch({ type: socketActionTypes.USER_LEFT });
};

// switch current turn
export const switchTurns = (currentTurn) => (dispatch) => {
  dispatch({ type: socketActionTypes.SWITCH_TURN, payload: { currentTurn } });
};

// place marker on board based on socket played event
export const placeMarker = (tileNo, playerMarker) => (dispatch) => {
  dispatch({
    type: socketActionTypes.PLACE_MARKER,
    payload: { tileNo, playerMarker },
  });
};
