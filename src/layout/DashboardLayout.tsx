import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <main>
      <Outlet />
    </main>
  ) : (
    <Navigate to={"/"} />
  );
};

export default DashboardLayout;
