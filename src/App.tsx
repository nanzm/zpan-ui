import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";

import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";

import moment from "moment";
import "moment/locale/zh-cn";

import createStore from "./store/createStore";
import { rootRoutes } from "./router";

import "./App.less";

const store = createStore();

moment.locale("zh-cn");

const App = () => {
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN} prefixCls={"zpan"}>
        <BrowserRouter>{renderRoutes(rootRoutes)}</BrowserRouter>
      </ConfigProvider>
    </Provider>
  );
};

export default App;
