import { useOutletContext } from "react-router-dom";
import ChatInput from "../components/ChatInput";
import PromptReplyCard from "../components/PromptReplyCard";
import { useEffect } from "react";

const Dashboard = () => {
  const [data] = useOutletContext();

  useEffect(() => {
    const latestResponse = data[data.length - 1];

    if (latestResponse) {
      console.log("Received new response:", latestResponse);
    }
  }, [data]);

  return (
    <>
      <div className="mt-8">
        {data.map((v, index) => (
          <div key={index}>
            <ChatInput userInput={v.prompt} />
            {v.response && <PromptReplyCard response={v.response} />}
            {/* <PromptReplyCard response={v.response} /> */}
            <br />
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
