import { useOutletContext } from "react-router-dom";
import { useEffect, useRef } from "react";
import ChatInput from "../components/ChatInput";
import PromptReplyCard from "../components/PromptReplyCard";

interface ResponseItem {
  prompt: string;
  response: {
    generated_text: string;
  };
}

const Dashboard = () => {
  const [data] = useOutletContext<ResponseItem[]>();
  const dataArray = Object.values(data);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollToBottom();
  }, [dataArray]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div
        className="mt-8"
        style={{
          overflowX: "hidden",
          overflowY: "visible",
          maxHeight: "700px",
          paddingRight: "20px",
        }}
      >
        {dataArray.map((item: ResponseItem, index: number) => (
          <div key={index}>
            <ChatInput userInput={item.prompt} />
            {item.response && <PromptReplyCard response={item.response} />}
            <br />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </>
  );
};

export default Dashboard;
