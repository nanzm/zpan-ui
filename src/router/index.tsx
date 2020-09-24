import React from "react";
import { Redirect } from "react-router-dom";
import loadable from "src/common/lazyLoad";

export const rootRoutes = [
  {
    path: "/login",
    component: loadable(() => import("src/views/Login")),
  },
  {
    path: "/",
    component: loadable(() => import("src/components/Layout")),
  },
  {
    path: "*",
    component: loadable(() => import("src/components/Layout")),
  },
];
