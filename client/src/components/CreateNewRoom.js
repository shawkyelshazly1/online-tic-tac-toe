import React from "react";
import { useSelector } from "react-redux";
import { createCustomRoom } from "../redux/socket/socket-actions";
import store from "../redux/store";
export default function CreateNewRoom() {
  const { socket } = useSelector((state) => state.socket);

  const handleSubmittion = (e) => {
    e.preventDefault();
    if (e.target[0].value.trim() !== "") {
      store.dispatch(createCustomRoom(socket, e.target[0].value));
    }
  };

  return (
    <div className="flex flex-col  items-center gap-2 px-4">
      <h1 className="font-medium text-xl">Create A New Room</h1>
      <form
        onSubmit={(e) => handleSubmittion(e)}
        className="flex flex-col items-center gap-4"
      >
        <input
          placeholder="Room Name"
          type="text"
          required
          className="py-2 px-4 rounded-full text-lg bg-gray-200 focus:outline-none focus:border-sky-200 border-2"
        />
        <button
          type="submit"
          className="bg-gray-200 rounded-full py-2 px-4 hover:bg-gray-300 font-semibold text-lg"
        >
          Create & Join Room.
        </button>
      </form>
    </div>
  );
}
