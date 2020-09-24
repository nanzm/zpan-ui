import React, { useEffect } from "react";
import { Spin } from "antd";
import { connect } from "react-redux";
import { renderRoutes } from "react-router-config";
import style from "./style/layout.module.css";

const Layout = (props) => {
  const { dispatch } = props;

  useEffect(() => {}, []);

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
    <div className={style.dashboard}>
      <div className={style.dashboard_head}>
        <h1> header</h1>
      </div>
      <div className={style.dashboard_body}>
        {/*<div className="dashboard-content">{renderRoutes(routes)}</div>*/}
        <h1>body</h1>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Layout);
