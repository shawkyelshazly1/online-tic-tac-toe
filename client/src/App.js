import { useEffect } from "react";
import store from "./redux/store";
import {
  initSocketConnection,
  userLeftRoom,
} from "./redux/socket/socket-actions";
import WelcomeScreen from "./components/WelcomeScreen";
import { useSelector } from "react-redux";
import Searching from "./components/Searching";
import GameBoard from "./components/GameBoard";

function App() {
  const { joinedRoom, gameStarted, socket, roomName, myTurn, playerMarker } =
    useSelector((state) => state.socket);

  useEffect(() => {
    if (!socket) {
      store.dispatch(initSocketConnection("http://localhost:4000"));
    }

    if (socket) {
      socket.on("user-left", () => {
        if (gameStarted) {
          store.dispatch(userLeftRoom());
        }
      });

      socket.on("gameOver", ({ msg }) => {
        console.log(msg);
      });
    }
  }, [socket]);

  let child = <WelcomeScreen />;

  if (!joinedRoom && !gameStarted) {
    child = <WelcomeScreen />;
  } else if (joinedRoom && !gameStarted) {
    child = (
      <>
        <Searching />
        <h1>Waiting for a player to join</h1>
      </>
    );
  } else if (joinedRoom && gameStarted) {
    child = (
      <>
        <h1 className="text-xl">Room: {roomName}</h1>
        <h1 className="text-xl">
          {myTurn
            ? `It's Your Turn - ${playerMarker} `
            : `Waiting for other player's turn - ${playerMarker}`}
        </h1>
        <GameBoard />
      </>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center justify-center py-4">
      {child}
    </div>
  );
}

export default App;
