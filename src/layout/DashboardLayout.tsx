// Component Imports
import SearchBar from "../components/SearchBar";

// Library Imports
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchResponse,
  getChatHistory,
  getUserId,
} from "../store/slices/dataSlice";
import { SidebarWrapper } from "../components/Sidebar";
import NavBar from "../components/NavBar";
import PromptCard from "../components/PromptCard";
import ResponseCard from "../components/ResponseCard";
import { useEffect, useRef, useState } from "react";
import React from "react";

const DashboardLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== undefined) {
      dispatch(getUserId(user));
      dispatch(getChatHistory());
    }
  }, []);

  const { isAuthenticated, user } = useAuth0();

  const [userPrompt, setUserPrompt] = useState("");

  const [isError, setIsError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSearch = (search: string) => {
    setUserPrompt(search);
    setIsLoading(true);
    setIsError(false);
    dispatch(fetchResponse(search))
      .unwrap()
      .then((data) => {
        setIsLoading(false);
        setUserPrompt("");
        navigate("/dashboard/65e8375877f458805b0fb03e");
      })
      .catch((err) => {
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

  return isAuthenticated ? (
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
  ) : (
    <Navigate to={"/"} />
  );
};

export default DashboardLayout;
