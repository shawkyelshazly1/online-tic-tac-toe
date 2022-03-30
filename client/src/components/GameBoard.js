import React from "react";
import { range } from "lodash";
import GridTile from "./GridTile";
import { useSelector } from "react-redux";
import store from "../redux/store";
import { placeMarker, switchTurns } from "../redux/socket/socket-actions";

export default function GameBoard() {
  const { socket, myTurn } = useSelector((state) => state.socket);

  const gridTiles = 9;

  if (socket) {
    socket.on("switch-turn", ({ currentTurn }) => {
      store.dispatch(switchTurns(currentTurn));
    });

    socket.on("played-turn", ({ tileNo, playerMarker }) => {
      store.dispatch(placeMarker(tileNo, playerMarker));
    });
  }

  console.log(myTurn);

  return (
    <div className="h-full w-full justify-center items-center flex flex-1">
      <div className="grid grid-cols-3 w-3/5 h-3/5">
        {range(gridTiles).map((tile) => (
          <GridTile key={tile} tileNo={tile} />
        ))}
      </div>
    </div>
  );
}
