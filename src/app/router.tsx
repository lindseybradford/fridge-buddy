import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { MainErrorFallback } from "./errors/main";

import { paths } from "@src/configs/paths";

import {
  default as AppRoot
} from './routes/root';

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
    {
      path: paths.root.path,
      element: (<AppRoot />), // TODO: add protected route layout? => // element: (<ProtectedRoute><AppRoot /></ProtectedRoute>),
      ErrorBoundary: MainErrorFallback,
      hydrateFallbackElement: <>Loading</>,
      children: [
        ...[paths.root.path, paths.fridges.path].map(path => ({
          path,
          lazy: () => import("./routes/fridge-list").then(convert(queryClient)),
        })),
        {
          path: paths.fridge.path,
          lazy: () => import("./routes/fridge-detail").then(convert(queryClient)),
        },
        // TODO: add register and login paths?
        {
          path: "*",
          lazy: () => import("./routes/not-found").then(convert(queryClient)),
        },

      ]
    },
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), []);

  return <RouterProvider router={router} />;
};
