import React from "react";
import { Redirect } from "react-router-dom";
import loadable from "./common/lazyLoad";

export const rootRoutes = [
  {
    path: "/login",
    component: loadable(() => import("./views/Login")),
  },
  {
    path: "/",
    component: loadable(() => import("./components/Layout")),
  },
  {
    path: "*",
    component: loadable(() => import("./components/Layout")),
  },
];
