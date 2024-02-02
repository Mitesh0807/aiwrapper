const PromptReplyCard = ({ response }: { response: string }) => {
  console.log("response", response);
  return (
    <>
      <div className="w-full p-10 mx-5 bg-slate-900 text-slate-200  rounded-2xl mt-5 text-l leading-relaxed ">
        <h1 className="text-lg tracking-widest leading-8">
          {response?.generated_text}
        </h1>
      </div>
    </>
  );
};

export default PromptReplyCard;
