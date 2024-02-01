import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import { useState } from "react";

const DashboardLayout = () => {
  const { isAuthenticated } = useAuth0();

  const [data, setData] = useState([]);

  const [responseData, setResponseData] = useState([]);

  const handleSearch = (search) => {
    //make api call for response data
    const newResponse = Math.random().toString();

    setResponseData((prevData) => [...prevData, newResponse]);

    setData((prevData) => [...prevData, { prompt: search, response: "" }]);

    setTimeout(() => {
      setData((prevData) => [
        ...prevData,
        { prompt: search, response: newResponse },
      ]);
    }, 5000);
  };

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
        className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:pl-[15rem] flex-col h-[100vh]"
        style={{ flexGrow: 1 }}
      >
        <Header />
        <main>
          <Outlet context={[data, responseData]} />
        </main>
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>
  ) : (
    <Navigate to={"/"} />
  );
};

export default DashboardLayout;
