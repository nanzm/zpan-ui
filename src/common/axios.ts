import axios from "axios";
import debounce from "lodash/debounce";
import { notification, message } from "antd";

axios.defaults.withCredentials = true;

const instance = axios.create({
  timeout: 30000,
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

const redirectToLogin = debounce(() => {
  message.error("登录信息已过期，请重新登录！", 3, () => {
    window.location.href = window.location.origin + "/login";
  });
}, 100);

// 添加拦截器
instance.interceptors.request.use(
  (config) => {
    // config.headers["token"] = localStorage.getItem("token");

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (response) => {
    // 不拦截部分接口
    // @ts-ignore
    if (!response.config.noInterceptor) {
      if (response.data && response.data.code === -402) {
        localStorage.clear();
        redirectToLogin();
      } else if (response.data && response.data.code !== 0) {
        // 错误提示
        notification.error({
          message: "错误",
          description: response.data.msg,
          duration: 4,
        });
      }
    }
    return response;
  },
  (error) => {
    const errMsg = error.toJSON();
    if (errMsg.message.indexOf("timeout") > -1) {
      notification.error({
        message: "请求超时",
        description: `接口：${errMsg.config.url}`,
        duration: 4,
      });
    }
    if (errMsg.message.indexOf("Network") > -1) {
      notification.error({
        message: "错误",
        description: `网络异常！`,
        duration: 4,
      });
    }
    return Promise.reject(error);
  }
);

export default instance;
