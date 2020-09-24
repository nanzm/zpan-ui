import React from "react";
import { Button } from "antd";

export default function (props) {
  const pushTo = () => {
    console.log();
    props.history.push("/");
  };

  return (
    <div>
      <Button onClick={pushTo}>按钮</Button>
    </div>
  );
}
