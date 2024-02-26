// Component Imports
import SearchBar from "../components/SearchBar";

// Library Imports
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchResponse, getUserId } from "../store/slices/dataSlice";
import { SidebarWrapper } from "../components/Sidebar";
import NavBar from "../components/NavBar";
import PromptCard from "../components/PromptCard";
import ResponseCard from "../components/ResponseCard";
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
    <>
      <div className="flex h-screen">
        <SidebarWrapper />
        <div className="flex flex-col w-full">
          <NavBar />
          <div className="flex-grow mt-10 p-4 overflow-y-auto">
            <PromptCard />
            <ResponseCard />
          </div>
          <SearchBar />
        </div>
      </div>
    </>
  ) : (
    <Navigate to={"/"} />
  );
};

export default DashboardLayout;
