import Layout from "@/layout/layout";
import LoginPage from "@/pages/login";
import UserList from "@/pages/userlist";
import React from "react";
import { useRoutes } from "react-router-dom";

export default function Router(): React.ReactNode {
  const routes = useRoutes([
    {
      path: "/login",
      element: <LoginPage />,
      index: true
    },
    {
      path: "/dashboard",
      element: <Layout />,
      children: [
        { path: 'index', element: <UserList /> }
      ]
    }
  ])

  return routes;
}