import { combineReducers } from "redux";

import login from "./login";
import encounter from "./encounter";
import intake from "./intake";
import message from "./message";
import chat from "./chat";
import notes from "./notes";

export default combineReducers({
  login,
  encounter,
  intake,
  message,
  chat,
  notes,
});
