import React from "react";
import { useSelector } from "react-redux";

export default function GridTile({ tileNo }) {
  const { playerMarker, socket, roomName, board } = useSelector(
    (state) => state.socket
  );
  return (
    <div
      onClick={(e) => {
        socket.emit("play-turn", { roomName, tileNo, playerMarker });
      }}
      className="w-full h-full border-2 border-gray-200 flex items-center justify-center hover:bg-gray-300 cursor-pointer"
    >
      <h1 className="text-8xl font-semibold">{board[tileNo]}</h1>
    </div>
  );
}
