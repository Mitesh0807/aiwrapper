import ReactMarkdown from "react-markdown";

interface Response {
  generated_text: string;
}

interface PromptReplyCardProps {
  response: Response;
}

const PromptReplyCard: React.FC<PromptReplyCardProps> = ({ response }) => {
  return (
    <>
      <div className="w-full p-10 mx-5 bg-slate-900 text-slate-200  rounded-2xl mt-5 text-l leading-relaxed ">
        <h1 className="text-lg tracking-widest leading-8">
          <ReactMarkdown children={response.generated_text}></ReactMarkdown>
        </h1>
      </div>
    </>
  );
};

export default PromptReplyCard;
