import { useOutletContext } from "react-router-dom";
import ChatInput from "../components/ChatInput";
import PromptReplyCard from "../components/PromptReplyCard";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [data] = useOutletContext<any>();
  const dataArray = Object.values(data);

  useEffect(() => {
    const latestResponse = data[data.length - 1];

    // if (latestResponse) {
    //   console.log("Received new response:", latestResponse);
    // }
  }, [data]);

  // console.log("dataArray", dataArray);

  return (
    <>
      <div className="mt-8">
        {/* {data.map((v: { response: string; prompt: string }, index: number) => (
          <div key={index}>
            <ChatInput userInput={v?.prompt} />
            {v.response && <PromptReplyCard response={v?.response} />}

            <br />
          </div>
        ))} */}
        {/* <ChatInput userInput={data} />
        <PromptReplyCard response={data} /> */}
        <div className="mt-8">
          {dataArray.map((item: any, index: number) => (
            <div key={index}>
              <ChatInput userInput={item.prompt} />
              {item.response && <PromptReplyCard response={item.response} />}
              <br />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
