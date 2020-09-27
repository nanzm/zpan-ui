import React from "react";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import { ConnectedRouter } from "connected-react-router";

import { ConfigProvider, message, notification, Modal } from "antd";
import zhCN from "antd/es/locale/zh_CN";

import moment from "moment";
import "moment/locale/zh-cn";

import store, { history } from "./redux/createStore";
import { rootRoutes } from "./router";

import "./App.less";

// @ts-ignore
import("!!raw-loader!./assets/font/iconfont.js").then((rawModule) => {
  // eslint-disable-next-line no-eval
  eval.call(window, rawModule.default);
});

moment.locale("zh-cn");

message.config({
  prefixCls: "zpan-message",
});
notification.config({
  prefixCls: "zpan-notification",
});
Modal.config({
  rootPrefixCls: "zpan", // 因为 Modal.confirm 里有 button，所以 `prefixCls: 'ant-modal'` 不够用。
});

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
