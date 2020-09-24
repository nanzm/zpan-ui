import React from "react";
import { Layout } from "antd";
import layout from "./style/layout.module.css";

const { Content } = Layout;

const DashboardContent = (props) => {
  return (
    <Content className={layout.dashboard_content_page}>
      {props.children}
    </Content>
  );
};

export default DashboardContent;
