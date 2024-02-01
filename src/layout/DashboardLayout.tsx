import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";

const DashboardLayout = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <div style={{ display: "flex" }}>
      <div
        style={{
          marginRight: "20px",
          height: "100%",
        }}
      >
        <Sidebar />
      </div>
      <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:pl-[15rem]">
        <Header />
        <main>
          <Outlet />
        </main>
        <SearchBar />
      </div>
    </div>
  ) : (
    <Navigate to={"/"} />
  );
};

export default DashboardLayout;
