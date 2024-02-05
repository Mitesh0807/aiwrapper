import Markdown from "react-markdown";

const PromptReplyCard = ({
  response,
}: {
  response: { generated_text: string };
}) => {
  // ! List
  //   const markdown = `\`\`\`
  // ${response.generated_text}
  // \`\`\``;
  return (
    <>
      <div className="w-full p-10 mx-5 bg-slate-900 text-slate-200  rounded-2xl mt-5 text-l leading-relaxed ">
        <Markdown>{response.generated_text}</Markdown>
      </div>
    </>
  );
};

export default PromptReplyCard;
