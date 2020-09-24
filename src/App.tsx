import React from "react";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import { ConnectedRouter } from "connected-react-router";

import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";

import moment from "moment";
import "moment/locale/zh-cn";

import configureStore, { history } from "./store/createStore";
import { rootRoutes } from "./router";

import "./App.less";

// @ts-ignore
import("!!raw-loader!./assets/font/iconfont.js").then((rawModule) => {
  // eslint-disable-next-line no-eval
  eval.call(window, rawModule.default);
});

const store = configureStore();

moment.locale("zh-cn");

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ConfigProvider locale={zhCN} prefixCls={"zpan"}>
          {renderRoutes(rootRoutes)}
        </ConfigProvider>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
