import { Outlet } from "react-router";

import { MainLayout } from "@src/app/layouts";

export const ErrorBoundary = () => {
  return <div>Something went wrong!</div>;
};

const AppRoot = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default AppRoot;
