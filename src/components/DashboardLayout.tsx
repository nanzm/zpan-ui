import React, { useEffect } from "react";
import { Spin, Layout, Menu } from "antd";
import { connect } from "react-redux";
import { renderRoutes } from "react-router-config";

import Footer from "./Footer";
import LeftSide from "./LeftSide";

import style from "./style/layout.module.css";
import { dashboardRoutes } from "src/router";
import { myStorage } from "../service/user";
import { profile } from "../service/moreu";

const DashboardLayout = (props) => {
  const { dispatch } = props;

  useEffect(() => {
    myStorage().then((res) => {});
    profile().then((res) => {});
  }, []);

  // 是否有 用户信息了
  const hasUserInfo = props.currentRole && props.detail.id;

  // if (!hasUserInfo) {
  //   return (
  //     <div
  //       style={{
  //         position: "absolute",
  //         top: "50%",
  //         left: "50%",
  //         transform: "translate(-50%, -50%)",
  //       }}
  //     >
  //       <Spin spinning tip="获取用户信息..." />
  //     </div>
  //   );
  // }

  // 根据权限过滤路由
  // const routes = filterRolesRouter(mainRoutes, props.currentRole);

  return (
    <Layout className={style.dashboard_app}>
      <Layout className={style.dashboard_body}>
        <LeftSide />
        <Layout className={style.dashboard_content}>
          {renderRoutes(dashboardRoutes)}
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(DashboardLayout);
