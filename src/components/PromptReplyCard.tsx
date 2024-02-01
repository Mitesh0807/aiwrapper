const PromptReplyCard = ({ response }) => {
  return (
    <>
      <div className="w-full p-10 mx-5 bg-slate-900 text-slate-200  rounded-2xl mt-32 text-l leading-relaxed">
        <h1>{response}</h1>
      </div>
    </>
  );
};

export default PromptReplyCard;
