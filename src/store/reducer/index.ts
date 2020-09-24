import { combineReducers } from "redux";
import common from "./common";
import user from "./user";

export default combineReducers({
  [common.namespace]: common.method,
  [user.namespace]: user.method,
});
