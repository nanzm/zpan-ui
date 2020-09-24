import React from "react";
import { Redirect } from "react-router-dom";
import lazyLoad from "src/common/lazyLoad";

export const rootRoutes = [
  {
    path: "/login",
    exact: true,
    component: lazyLoad(() => import("src/views/Login")),
  },
  {
    path: "/",
    component: lazyLoad(() => import("src/components/DashboardLayout")),
  },
  {
    path: "*",
    component: lazyLoad(() => import("src/components/NotFound")),
  },
];

export const dashboardRoutes = [
  {
    path: "/",
    exact: true,
    render: () => <Redirect to={"/dashboard/main"} />,
  },
  {
    path: "/dashboard/main",
    exact: true,
    component: lazyLoad(() => import("src/views/Dashboard/Main/index")),
  },
  {
    path: "*",
    component: lazyLoad(() => import("src/components/NotFound")),
  },
];
