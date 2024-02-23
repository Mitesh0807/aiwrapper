// Component Imports
import SearchBar from "../components/SearchBar";

// Library Imports
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchResponse } from "../store/slices/dataSlice";
import { SidebarWrapper } from "../components/Sidebar";
import NavBar from "../components/NavBar";
import ApiModal from "../components/ApiModal";
import PromptCard from "../components/PromptCard";
import ResponseCard from "../components/ResponseCard";
import ApiDataTable3 from "../components/ApiDataTable3";

const DashboardLayout = () => {
  const { isAuthenticated } = useAuth0();

  const dispatch = useDispatch();

  const handleSearch = (search: string) => {
    dispatch(fetchResponse(search));
  };

  return isAuthenticated ? (
    <>
      <div className="flex h-screen">
        <SidebarWrapper />
        <div className="flex flex-col w-full">
          <NavBar />
          <div className="flex-grow mt-10 p-4 overflow-y-auto">
            {/* body  */}
            {/* <ApiDataTable />
            <ApiDataTable2 /> */}
            <ApiDataTable3 />
            <ApiModal />
            <PromptCard />
            <ResponseCard />
          </div>
          <SearchBar />
        </div>
      </div>
    </>
  ) : (
    // <div style={{ display: "flex" }}>
    //   <div
    //     style={{
    //       marginRight: "20px",
    //       height: "100%",
    //     }}
    //   >
    //     <Sidebar />
    //   </div>
    //   <div
    //     className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:pl-[15rem] flex-col h-[100vh] flex"
    //     style={{ flexGrow: 1 }}
    //   >
    //     <Header />
    //     <main className="flex"></main>
    //     <Outlet />
    //     <div className="fixed bottom-0">
    //       <SearchBar onSearch={handleSearch} />
    //     </div>
    //   </div>
    // </div>
    <Navigate to={"/"} />
  );
};

export default DashboardLayout;
