import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// initializing the Store
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
