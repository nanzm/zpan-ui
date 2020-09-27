import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import createRootReducer from "./reducer";
import rootSaga from "../saga";

export const history = createBrowserHistory();

function configureStore() {
  // 创建saga中间件
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    createRootReducer(history),
    composeWithDevTools(
      applyMiddleware(routerMiddleware(history), sagaMiddleware)
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
}

const store = configureStore();

export default store;
