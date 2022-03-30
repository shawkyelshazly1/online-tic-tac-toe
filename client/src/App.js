import { useEffect } from "react";
import store from "./redux/store";
import {
  initSocketConnection,
  userLeftRoom,
} from "./redux/socket/socket-actions";
import WelcomeScreen from "./components/WelcomeScreen";
import { useSelector } from "react-redux";
import Searching from "./components/Searching";

function App() {
  const { joinedRoom, gameStarted, socket } = useSelector(
    (state) => state.socket
  );

  useEffect(() => {
    store.dispatch(initSocketConnection("http://localhost:4000"));
  }, []);

  if (socket) {
    socket.on("user-left", () => {
      if (gameStarted) {
        store.dispatch(userLeftRoom());
      }
    });
  }

  let child = <WelcomeScreen />;

  if (!joinedRoom && !gameStarted) {
    child = <WelcomeScreen />;
  } else if (joinedRoom && !gameStarted) {
    child = <Searching />;
  } else if (joinedRoom && gameStarted) {
    child = "started Game";
  }

  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center justify-center">
      {child}
    </div>
  );
}

export default App;
