import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  gameStarted,
  joinedRoom,
  setError,
} from "../redux/socket/socket-actions";
import store from "../redux/store";
import CreateNewRoom from "./CreateNewRoom";
import JoinExistingRoom from "./JoinExistingRoom";
import JoinRandomRoom from "./JoinRandomRoom";

export default function WelcomeScreen() {
  const { socket, error } = useSelector((state) => state.socket);

  if (socket) {
    socket.on("error", ({ msg }) => {
      store.dispatch(setError(msg));
    });

    socket.on("joined-room", ({ roomName, playerMarker }) => {
      store.dispatch(joinedRoom(roomName, playerMarker));
    });

    socket.on("start-game", () => {
      store.dispatch(gameStarted());
    });
  }

  return (
    <>
      <h1 className="text-3xl pb-2">
        Welcome to the ultimate TIC-TAC-TOE game
      </h1>
      <JoinRandomRoom />
      <h1 className="py-4">- OR -</h1>
      <div className="flex flex-row">
        <CreateNewRoom />
        <hr className="w-1 h-full bg-gray-300" />
        <JoinExistingRoom />
      </div>
      {error !== "" ? (
        <ul className="flex flex-col items-center justify-center">
          <li className="text-red-500">{error}</li>
        </ul>
      ) : null}
    </>
  );
}
