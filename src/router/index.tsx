import React from "react";
import { Redirect } from "react-router-dom";
import lazyLoad from "src/common/lazyLoad";

const NotFound = lazyLoad(
  () => import(/* webpackChunkName: "NotFound" */ "src/components/NotFound")
);

export const rootRoutes = [
  {
    path: "/login",
    exact: true,
    component: lazyLoad(
      () => import(/* webpackChunkName: "login" */ "src/views/Login")
    ),
  },
  {
    path: "/",
    component: lazyLoad(
      () =>
        import(
          /* webpackChunkName: "dashboardLayout" */ "src/components/DashboardLayout"
        )
    ),
  },
  {
    path: "*",
    component: NotFound,
  },
];

export const dashboardRoutes = [
  {
    path: "/",
    exact: true,
    render: () => <Redirect to={"/dashboard/main"} />,
  },
  {
    path: "/dashboard/all",
    exact: true,
    component: lazyLoad(() => import("src/views/Dashboard/All/index")),
  },
  {
    path: "/dashboard/document",
    exact: true,
    component: lazyLoad(() => import("src/views/Dashboard/Document/index")),
  },
  {
    path: "/dashboard/picture",
    exact: true,
    component: lazyLoad(() => import("src/views/Dashboard/Picture/index")),
  },
  {
    path: "/dashboard/audio",
    exact: true,
    component: lazyLoad(() => import("src/views/Dashboard/Audio/index")),
  },
  {
    path: "/dashboard/video",
    exact: true,
    component: lazyLoad(() => import("src/views/Dashboard/Video/index")),
  },
  {
    path: "/dashboard/share",
    exact: true,
    component: lazyLoad(() => import("src/views/Dashboard/Share/index")),
  },
  {
    path: "/dashboard/picture-host",
    exact: true,
    component: lazyLoad(() => import("src/views/Dashboard/PictureHost/index")),
  },
  {
    path: "*",
    component: NotFound,
  },
];
