import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import InputBox from "./InputBox";
import { streamWeatherReply } from "../utils/api";

const ChatBox = ({ chatId, messages, onChatUpdate }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = {
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };
    const agentMsg = {
      role: "agent",
      content: "",
      timestamp: new Date().toISOString(),
    };
    const newMessages = [...messages, userMsg, agentMsg];
    onChatUpdate(chatId, newMessages);
    setInput("");
    setLoading(true);
    let agentText = "";

    try {
      await streamWeatherReply(input, (chunk) => {
        agentText += chunk;
        const updatedMessages = newMessages.map((msg, i) =>
          i === newMessages.length - 1 ? { ...msg, content: agentText } : msg
        );
        onChatUpdate(chatId, updatedMessages);
      });
    } catch (err) {
      console.error("API error:", err);
      const failedMsg = {
        role: "agent",
        content: "⚠️ Failed to get weather. Try again.",
        timestamp: new Date().toISOString(),
      };
      onChatUpdate(chatId, [...messages, userMsg, failedMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex-1 h-screen bg-white">
      <div className="overflow-y-auto px-4 py-6 pb-28 h-full">
        <div className="max-w-[622px] mx-auto">
          {messages.map((msg, i) => (
            <div key={i}>
              <MessageBubble
                role={msg.role}
                message={msg.content}
                loading={loading && i === messages.length - 1}
              />
              <div className="text-xs text-gray-500 px-2 pb-2">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 lg:left-64 right-0 bg-white z-10">
        <InputBox
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onSend={handleSend}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default ChatBox;
