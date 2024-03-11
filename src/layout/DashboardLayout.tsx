// Component Imports
import SearchBar from "../components/SearchBar";

// Library Imports
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  disabledNewChat,
  enableAnimation,
  fetchResponse,
  getChatHistory,
  getChatHistoryById,
  getUserId,
} from "../store/slices/dataSlice";
import { SidebarWrapper } from "../components/Sidebar";
import NavBar from "../components/NavBar";
import PromptCard from "../components/PromptCard";
import ResponseCard from "../components/ResponseCard";
import { useEffect, useRef, useState } from "react";
import { RootState } from "../store/store";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const isNewChat = useSelector((state: RootState) => state?.data?.isNewChat);
  console.log(isNewChat);

  useEffect(() => {
    console.log(user);
    dispatch(getChatHistory());
    if (user !== undefined) {
      dispatch(getUserId(user));
    }
  }, []);

  const { isAuthenticated, user } = useAuth0();

  const [userPrompt, setUserPrompt] = useState("");

  const [isError, setIsError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSearch = (search: string) => {
    console.log("okk");
    setUserPrompt(search);
    setIsLoading(true);
    setIsError(false);
    dispatch(fetchResponse(search))
      .unwrap()
      .then((data) => {
        dispatch(enableAnimation());
        console.log(data);
        setIsLoading(false);
        setUserPrompt("");
        if (data.chatType == true) {
          if (data?.chatId) {
            localStorage.setItem("chatId", data?.chatId);
            dispatch(disabledNewChat());
            dispatch(getChatHistoryById(data?.chatId));
          }
          navigate(`/dashboard/${data?.chatId}`);
        }
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  };

  useEffect(() => {
    scrollToBottom();
  }, [userPrompt]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <div className="flex h-screen">
        <SidebarWrapper />
        <div className="flex flex-col w-full">
          <NavBar />
          <div className="flex-grow mt-10 p-4 overflow-y-auto">
            <Outlet />

            {userPrompt && userPrompt !== "" && (
              <PromptCard prompt={userPrompt} />
            )}

            {isLoading && (
              <ResponseCard isLoading={isLoading} isError={false} />
            )}

            {isError && <ResponseCard isError={isError} isLoading={false} />}

            <div ref={messagesEndRef}></div>
          </div>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
    </>
  );

  //  TODO: resolve navigate

  // return isAuthenticated ? (
  //   <>
  //     <div className="flex h-screen">
  //       <SidebarWrapper />
  //       <div className="flex flex-col w-full">
  //         <NavBar />
  //         <div className="flex-grow mt-10 p-4 overflow-y-auto">
  //           <Outlet />

  //           {userPrompt && userPrompt !== "" && (
  //             <PromptCard prompt={userPrompt} />
  //           )}

  //           {isLoading && (
  //             <ResponseCard isLoading={isLoading} isError={false} />
  //           )}

  //           {isError && <ResponseCard isError={isError} isLoading={false} />}

  //           <div ref={messagesEndRef}></div>
  //         </div>
  //         <SearchBar onSearch={handleSearch} />
  //       </div>
  //     </div>
  //   </>
  // )
  // : (
  //   <Navigate to={"/"} />
  // );
};

export default DashboardLayout;
