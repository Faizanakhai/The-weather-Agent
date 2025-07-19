const MessageBubble = ({ message, role, loading = false }) => {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} my-2`}>
      <div
        className={`px-4 py-2 rounded-lg max-w-md text-sm md:text-base whitespace-pre-wrap shadow ${
          isUser ? "bg-black text-white" : "bg-gray-200 text-black"
        }`}
      >
        {loading && role === "agent" ? (
          <span className="animate-pulse text-gray-500">
            ⏳ Agent is typing...
          </span>
        ) : (
          message
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
