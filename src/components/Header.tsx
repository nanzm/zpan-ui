import React from "react";
import { Layout } from "antd";
import style from "./style/layout.module.css";

const { Header } = Layout;

export default function () {
  return (
    <Header className={style.dashboard_head}>
      <div className={style.dashboard_head_logo}>zpan</div>
      <div></div>
    </Header>
  );
}
