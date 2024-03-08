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
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const ChatHistory = () => {
  const { id } = useParams();
  const chatRef = useRef("");
  const responseData = useSelector(
    (state: RootState) => state?.data?.responseData
  );

  const latestResponse = useMemo(
    () => responseData[responseData.length - 1]?.response?.response,
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

  return (
    <>
      {responseData?.map((data, index) => (
        <React.Fragment key={index}>
          <PromptCard prompt={data?.prompt} />
          {index === responseData.length - 1 && latestResponse ? (
            <ResponseCard response={chat} />
          ) : (
            <ResponseCard response={data?.response?.response} />
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default ChatHistory;
