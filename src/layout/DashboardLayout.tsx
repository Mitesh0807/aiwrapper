// Component Imports
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";

// Library Imports
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchResponse, getUserId } from "../store/slices/dataSlice";
import { useEffect } from "react";

const DashboardLayout = () => {
  const { isAuthenticated, user } = useAuth0();

  const dispatch = useDispatch();

  const handleSearch = (search: string) => {
    dispatch(fetchResponse(search));
  };

  useEffect(() => {
    if (user !== undefined) {
      dispatch(getUserId(user));
    }
  }, []);

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
      <div
        className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:pl-[15rem] flex-col h-[100vh] flex"
        style={{ flexGrow: 1 }}
      >
        <Header />
        <main className="flex"></main>
        <Outlet />
        <div className="fixed bottom-0">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={"/"} />
  );
};

export default DashboardLayout;
