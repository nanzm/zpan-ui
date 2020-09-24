import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const loading = (
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    }}
  >
    <Spin spinning tip="加载中..." />
  </div>
);

// 采用新的 react 官方 api
// 替换老的 react-loadable 库
const lazyLoad = (importFunc) => {
  const LazyComponent = React.lazy(importFunc);

  return (props) => (
    <React.Suspense fallback={loading}>
      <LazyComponent {...props} />
    </React.Suspense>
  );
};

export default lazyLoad;
