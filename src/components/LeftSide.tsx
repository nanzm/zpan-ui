import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Spin, Layout, Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  CopyOutlined,
  BarChartOutlined,
  PieChartOutlined,
  AndroidOutlined,
  WeiboSquareOutlined,
  AlignCenterOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import style from "./style/layout.module.css";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const menuRoutes = [
  {
    name: "全部文件",
    icon: <CopyOutlined />,
    key: "all",
    link: "/dashboard/disk/all",
  },
  {
    name: "文档",
    icon: <BarChartOutlined />,
    link: "/dashboard/disk/doc",
    sub: true,
  },
  {
    name: "图片",
    icon: <PieChartOutlined />,
    link: "/dashboard/disk/image",
    sub: true,
  },
  {
    name: "音频",
    icon: <AndroidOutlined />,
    link: "/dashboard/disk/audio",
    sub: true,
  },
  {
    name: "视频",
    icon: <WeiboSquareOutlined />,
    link: "/dashboard/disk/video",
    sub: true,
  },
  {
    name: "我的分享",
    icon: <AlignCenterOutlined />,
    link: "/dashboard/share",
  },
  {
    name: "我的图床",
    icon: <OrderedListOutlined />,
    link: "/dashboard/picture-host",
  },
];

const LeftSide = (props) => {
  const { router } = props;
  const { pathname } = router.location;

  useEffect(() => {}, []);

  const menuClick = (e) => {
    const { key } = e;
    if (key) props.history.push(key);
  };

  const SelectedKeys = menuRoutes.reduce((acc, cur) => {
    if (cur.link === pathname) acc.push(cur.link);
    return acc;
  }, []);

  return (
    <Sider width={200} className={style.dashboard_aside}>
      <Menu
        mode="inline"
        selectedKeys={SelectedKeys}
        className={style.dashboard_aside_menu}
        onClick={menuClick}
      >
        {menuRoutes.map((menu) => {
          // const sty = menu.sub ? { paddingLeft: "20px" } : {};
          return (
            <Menu.Item
              key={menu.link}
              icon={menu.icon}
              className={menu.sub ? "sub" : ""}
            >
              {menu.name}
            </Menu.Item>
          );
        })}
      </Menu>
    </Sider>
  );
};

const mapStateToProps = (state) => {
  return {
    router: state.router,
  };
};

export default connect(mapStateToProps)(withRouter(LeftSide));
