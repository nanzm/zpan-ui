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

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const menuRoutes = [
  {
    name: "全部文件",
    icon: <CopyOutlined />,
    key: "all",
    link: "/dashboard/all",
  },
  {
    name: "文档",
    icon: <BarChartOutlined />,
    link: "/dashboard/document",
  },
  {
    name: "图片",
    icon: <PieChartOutlined />,
    link: "/dashboard/picture",
  },
  {
    name: "音频",
    icon: <AndroidOutlined />,
    link: "/dashboard/audio",
  },
  {
    name: "视频",
    icon: <WeiboSquareOutlined />,
    link: "/dashboard/video",
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
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={SelectedKeys}
        style={{ height: "100%", borderRight: 0 }}
        onClick={menuClick}
      >
        {menuRoutes.map((menu) => {
          return (
            <Menu.Item key={menu.link} icon={menu.icon}>
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
