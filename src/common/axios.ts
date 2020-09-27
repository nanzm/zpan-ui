import axios from "axios";
import debounce from "lodash/debounce";
import { notification, message } from "antd";

axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: "",
  timeout: 10 * 1000,
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

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
    checkIsLoginError(response);
    return response;
  },
  (error) => {
    const { response } = error;
    checkIsLoginError(response);

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
        duration: 3,
      });
    }
    return Promise.reject(error);
  }
);

const checkIsLoginError = (response) => {
  //不需要拦截
  // @ts-ignore
  if (!response || response.config.noInterceptor) return;

  // 未登录
  if (response.data && response.data.code === 403) {
    localStorage.clear();
    redirectToLogin();
    return;
  }

  // 其他错误
  if (response.data && response.status !== 200) {
    notificationError(response.data.msg || response.data);
  }
};

const notificationError = debounce((msg) => {
  notification.error({
    message: "错误",
    description: msg,
    duration: 3,
  });
}, 100);

const redirectToLogin = debounce(() => {
  message.error("登录信息已过期，请重新登录！", 3, () => {
    const h = window.location.href;
    window.location.href = `/moreu/signin?redirect=${encodeURI(h)}`;
  });
}, 100);

export default instance;
