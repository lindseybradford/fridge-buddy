import { Outlet } from "react-router";
import { MainLayout } from "@src/app/layouts";

const AppRoot = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default AppRoot;
