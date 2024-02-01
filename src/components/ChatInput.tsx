const ChatInput = ({ userInput }) => {
  return (
    <>
      <div className="w-full border-white-500 border-[2px] bg-slate-800 text-slate-100 leading-loose text-md p-3 rounded-lg ml-4 mb-3">
        <h1>{userInput}</h1>
      </div>
    </>
  );
};

export default ChatInput;
