import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import axios from "axios";

interface DataItem {
  prompt: string;
  response: string;
}
const DashboardLayout = () => {
  const { isAuthenticated } = useAuth0();

  const [data, setData] = useState<DataItem[]>([]);
  const [response, setResponse] = useState<DataItem[]>([]);
  const [responseData, setResponseData] = useState<string[]>([""]);

  const handleSearch = (search: string) => {
    // const newResponse = Math.random().toString();

    // setResponseData((prevData) => [...prevData, response]);

    // setData((prevData) => [
    //   ...prevData,
    //   { prompt: search, response: response },
    // ]);

    // setTimeout(() => {
    //   setData((prevData) => [
    //     ...prevData.filter((item) => item.prompt !== search),
    //     { prompt: search, response: response },
    //   ]);
    // }, 5000);

    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:3500/generate", {
          search: search,
        });
        setResponse(response.data);
        setResponseData((prevData) => [...prevData, response.data]);

        setData((prevData) => [
          ...prevData,
          { prompt: search, response: response.data },
        ]);

        setTimeout(() => {
          setData((prevData) => [
            ...prevData.filter((item) => item.prompt !== search),
            { prompt: search, response: response.data },
          ]);
        }, 5000);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
        className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:pl-[15rem] flex-col h-[100vh] flex"
        style={{ flexGrow: 1 }}
      >
        <Header />
        <main className="flex"></main>
        <Outlet context={[data, responseData]} />
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>
  ) : (
    <Navigate to={"/"} />
  );
};

export default DashboardLayout;
