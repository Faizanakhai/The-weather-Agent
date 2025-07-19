/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

const Sidebar = ({ chats, currentChatId, onNewChat, onSelectChat }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* Toggle Button (visible only on small screens) */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="text-black bg-white p-2 border rounded shadow"
        >
          {isOpen ? <IoMdClose size={20} /> : <FiMenu size={20} />}
        </button>
      </div>{" "}
      {/* Sidebar */}
      <div
        className={`fixed md:relative top-0 left-0 h-full z-40 transition-all duration-300 ease-in-out 
    ${isOpen ? "translate-x-0" : "-translate-x-full"} 
    md:translate-x-0 w-64 border-r border-gray-200 bg-white p-4 overflow-y-auto`}
      >
        <button
          className="bg-black text-white px-4 py-2 rounded w-full mb-4"
          onClick={onNewChat}
        >
          + New Chat
        </button>
        <div>
          {Object.entries(chats)
            .sort((a, b) => b[1].createdAt - a[1].createdAt)
            .map(([id, chat]) => (
              <div
                key={id}
                onClick={() => {
                  onSelectChat(id);
                  if (window.innerWidth < 768) setIsOpen(false); // auto-close on small screen
                }}
                className={`cursor-pointer px-2 py-1 rounded ${
                  currentChatId === id ? "bg-gray-200 font-semibold" : ""
                }`}
              >
                Chat {id.slice(-4)} –{" "}
                {new Date(chat.createdAt).toLocaleString()}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
