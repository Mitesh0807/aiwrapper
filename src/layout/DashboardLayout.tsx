// Component Imports
import SearchBar from "../components/SearchBar";

// Library Imports
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchResponse, getUserId } from "../store/slices/dataSlice";
import { SidebarWrapper } from "../components/Sidebar";
import NavBar from "../components/NavBar";
import PromptCard from "../components/PromptCard";
import ResponseCard from "../components/ResponseCard";
import { useEffect, useState } from "react";

const DashboardLayout = () => {
  useEffect(() => {
    if (user !== undefined) {
      dispatch(getUserId(user));
    }
  }, []);

  const responseData = useSelector(
    (state: RootState) => state?.data?.responseData
  );

  console.log(responseData);

  const { isAuthenticated, user } = useAuth0();

  const [userPrompt, setUserPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const dispatch = useDispatch();

  const handleSearch = (search: string) => {
    setUserPrompt(search);
    dispatch(fetchResponse(search))
      .unwrap()
      .then((data) => {
        setAiResponse(data?.response?.generated_text);
      });
  };

  return isAuthenticated ? (
    <>
      <div className="flex h-screen">
        <SidebarWrapper />
        <div className="flex flex-col w-full">
          <NavBar />
          <div className="flex-grow mt-10 p-4 overflow-y-auto">
            {userPrompt && <PromptCard prompt={userPrompt} />}
            {aiResponse && <ResponseCard response={aiResponse} />}
          </div>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
    </>
  ) : (
    <Navigate to={"/"} />
  );
};

export default DashboardLayout;
