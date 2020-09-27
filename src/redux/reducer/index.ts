import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import common from "./common";
import user from "./user";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    [common.namespace]: common.method,
    [user.namespace]: user.method,
  });

export default createRootReducer;
