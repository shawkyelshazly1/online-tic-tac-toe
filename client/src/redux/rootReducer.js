import socketReducer from "./socket/socket-reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  socket: socketReducer,
});

export default rootReducer;
