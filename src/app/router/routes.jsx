import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../../layouts/RootLayout";
import { roleLoader } from "./roleLoader";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import Home from "../../pages/home/Home";
import DataInfo from "../../pages/data-info/DataInfo";
import Login from "../../pages/login/Login";
import NotFound from "../../pages/not-found/NotFound";
import AccountSettings from "../../pages/account-settings/AccountSettings";
import { menuItems } from "../../components/template/Sidebar/data";
import Communications from "../../pages/communications/Communications";
import Mastering from "../../pages/mastering/Mastering";
import Achievements from "@/pages/achievements/Achievements";

const getRolesByPath = (path) => {
  const item = menuItems.find((i) => i.path === path);
  return item?.roles || [];
};

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <RootLayout />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/",
            loader: roleLoader(getRolesByPath("/")),
            element: <Home />,
          },
          {
            path: "/data-info",
            loader: roleLoader(getRolesByPath("/data-info")),
            element: <DataInfo />,
          },
          {
            path: "/achievements",
            loader: roleLoader(getRolesByPath("/achievements")),
            element: <Achievements />,
          },
          {
            path: "/mastering",
            loader: roleLoader(getRolesByPath("/mastering")),
            element: <Mastering />,
          },
          {
            path: "/settings",
            loader: roleLoader(getRolesByPath("/settings")),
            element: <AccountSettings />,
          },
          {
            path: "/communications",
            loader: roleLoader(getRolesByPath("/communications")),
            element: <Communications />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
