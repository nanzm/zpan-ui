import React from "react";
import { Progress } from "antd";
import "./index.scoped.less";

const MyCapacity = () => {
  return (
    <div className="my-capacity">
      <div className="txt">已用 3 GB/ 10 GB</div>
      <Progress percent={30} size="small" />
    </div>
  );
};

export default MyCapacity;
