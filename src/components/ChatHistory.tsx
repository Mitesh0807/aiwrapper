import { useParams } from "react-router-dom";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import PromptCard from "../components/PromptCard";
import ResponseCard from "../components/ResponseCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  clearChatHistory,
  disabledNewChat,
  getChatHistoryById,
} from "../store/slices/dataSlice";

const ChatHistory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(disabledNewChat());
      dispatch(clearChatHistory());
    }
    dispatch(getChatHistoryById(id));
  }, [id]);

  const chatRef = useRef("");
  const responseData = useSelector(
    (state: RootState) => state?.data?.responseData
  );

  const isAnimate = useSelector((state: RootState) => state?.data?.isAnimate);
  console.log(isAnimate);

  console.log(responseData);

  const latestResponse = useMemo(
    () => responseData[responseData.length - 1]?.response,
    [responseData]
  );

  const animateResponse = useCallback(async (latestResponse) => {
    clearChat();
    const words = latestResponse.split(" ");
    for (let i = 0; i < words.length; i++) {
      chatRef.current += " " + words[i];
      await sleep(45);
      setChat(chatRef.current);
    }
  }, []);

  useEffect(() => {
    if (responseData.length > 0) {
      animateResponse(latestResponse);
    }
  }, [animateResponse, latestResponse, responseData]);

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const clearChat = () => {
    chatRef.current = "";
    setChat("");
  };

  const [chat, setChat] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  //! Pending Scroll To bottom

  return (
    <>
      {responseData?.map((data, index) => (
        <React.Fragment key={index}>
          <PromptCard prompt={data?.prompt} />
          {index === responseData.length - 1 && latestResponse && isAnimate ? (
            <>
              <ResponseCard response={chat} />
              <div ref={messagesEndRef}></div>
            </>
          ) : (
            <ResponseCard response={data?.response} />
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default ChatHistory;
