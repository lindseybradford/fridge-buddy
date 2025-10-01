import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { FridgeDetail } from "./routes/fridge-detail";
import { FridgeList } from "./routes/fridge-list";

import { paths } from "@src/configs/paths";

interface LazyRouteModule {
  clientLoader?: (queryClient: QueryClient) => any;
  clientAction?: (queryClient: QueryClient) => any;
  default: React.ComponentType<any>;
  [key: string]: any;
}

const convert = (queryClient: QueryClient) => (m: LazyRouteModule) => {
  const { clientLoader, clientAction, default: Component, ...rest } = m;
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component,
  };
};

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    // {
    //   path: paths.register.path,
    //   lazy: () => import('./routes/register').then(convert(queryClient)),
    // },
    // {
    //   path: paths.login.path,
    //   lazy: () => import('./routes/login').then(convert(queryClient)),
    // },
    ...[paths.home.path, paths.fridges.path].map(path => ({
      path,
      element: <FridgeList />,
      lazy: () => import("./routes/fridge-list").then(convert(queryClient)),
    })),
    {
      path: paths.fridge.path,
      element: <FridgeDetail />, // TODO: element: <ProtectedRoute><FridgeDetail /></ProtectedRoute>,
      lazy: () => import("./routes/fridge-detail").then(convert(queryClient)),
    },
    {
      path: "*",
      lazy: () => import("./routes/not-found").then(convert(queryClient)),
    },
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), []);

  return <RouterProvider router={router} />;
};
