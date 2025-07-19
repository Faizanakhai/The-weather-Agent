import { useEffect, useState } from "react";
import ChatBox from "./components/ChatBox";
import Sidebar from "./components/Sidebar";

const getInitialChats = () => {
  const stored = localStorage.getItem("weather-chats");
  return stored ? JSON.parse(stored) : {};
};

const App = () => {
  const [chats, setChats] = useState({});
  const [currentChatId, setCurrentChatId] = useState(null);

  useEffect(() => {
    const stored = getInitialChats();
    setChats(stored);
    if (Object.keys(stored).length === 0) {
      const newId = Date.now().toString();
      const newChat = {
        createdAt: Date.now(),
        messages: [
          {
            role: "agent",
            content: "Hi! Ask me about the weather anywhere.",
            timestamp: new Date().toISOString(),
          },
        ],
      };
      const updated = { [newId]: newChat };
      setChats(updated);
      setCurrentChatId(newId);
      localStorage.setItem("weather-chats", JSON.stringify(updated));
    } else {
      const lastId = Object.keys(stored).sort(
        (a, b) => stored[b].createdAt - stored[a].createdAt
      )[0];
      setCurrentChatId(lastId);
    }
  }, []);

  const handleNewChat = () => {
    const newId = Date.now().toString();
    const newChat = {
      createdAt: Date.now(),
      messages: [
        {
          role: "agent",
          content: "Hi! Ask me about the weather anywhere.",
          timestamp: new Date().toISOString(),
        },
      ],
    };
    const updated = { ...chats, [newId]: newChat };
    setChats(updated);
    setCurrentChatId(newId);
    localStorage.setItem("weather-chats", JSON.stringify(updated));
  };

  const handleSelectChat = (id) => {
    setCurrentChatId(id);
  };

  const handleChatUpdate = (id, updatedMessages) => {
    const updated = {
      ...chats,
      [id]: { ...chats[id], messages: updatedMessages },
    };
    setChats(updated);
    localStorage.setItem("weather-chats", JSON.stringify(updated));
  };

  return (
    <div className="flex bg-white text-black">
      <Sidebar
        chats={chats}
        currentChatId={currentChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
      />
      {currentChatId ? (
        <ChatBox
          chatId={currentChatId}
          messages={chats[currentChatId]?.messages || []}
          onChatUpdate={handleChatUpdate}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500 text-xl p-10">
          Select or create a chat to begin
        </div>
      )}
    </div>
  );
};

export default App;
