import React from "react";
import { useSelector } from "react-redux";
import { joinRandRoom } from "../redux/socket/socket-actions";
import store from "../redux/store";

export default function JoinRandomRoom() {
  const { socket } = useSelector((state) => state.socket);

  const handleJoinRandomRoom = () => {
    if (socket) {
      store.dispatch(joinRandRoom(socket));
    } else {
      console.log(`not connected`);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          handleJoinRandomRoom();
        }}
        className="bg-gray-200 rounded-full py-2 px-4 hover:bg-gray-300 font-semibold text-lg"
      >
        Join A Random Room
      </button>
    </>
  );
}
