import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { createSocketConnection } from "../utils/socket";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text, createdAt } = msg;
        return {
          firstname: senderId?.firstname,
          lastname: senderId?.lastname,
          text,
          createdAt,
        };
      });
      setMessages(chatMessages);
    } catch (err) {
      console.error("Failed to fetch chat messages:", err);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();

    socket.emit("joinChat", {
      firstname: user.firstname,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstname, lastname, text, createdAt }) => {
      setMessages((messages) => [
        ...messages,
        { firstname, lastname, text, createdAt },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstname: user.firstname,
      lastname: user.lastname,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <>
    <div className="absolute inset-0 z-0 rounded-3xl bg-gradient-to-tr from-pink-700 via-purple-800 to-indigo-800 opacity-30 blur-3xl"></div>
    <div className="w-3/4 mx-auto my-10 rounded-3xl border border-white/20 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white shadow-[0_15px_30px_rgba(0,0,0,0.9)] overflow-hidden relative h-[75vh] flex flex-col">
       <div className="absolute top-10 left-24 w-72 h-72 bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse z-0"></div>
      <div className="absolute bottom-16 right-24 w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-3xl animate-pulse z-0"></div>
      {/* Blurred background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-pink-700 via-purple-800 to-indigo-800 opacity-30 blur-3xl"></div>

      {/* Header */}
      <div className="z-10 p-5 border-b border-white/20 text-xl font-semibold bg-white/5 backdrop-blur">
        Chat 
      </div>

      {/* Chat Messages */}
      <div className="z-10 flex-1 overflow-y-auto p-5 space-y-4 backdrop-blur">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat ${
              user.firstname === msg.firstname ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-header text-sm font-semibold text-white/80">
              {msg.firstname} {msg.lastname} •{" "}
              <span className="text-xs opacity-60">
                {msg.createdAt
                  ? formatDistanceToNow(new Date(msg.createdAt), {
                      addSuffix: true,
                    })
                  : "Just now"}
              </span>
            </div>
            <div className="chat-bubble bg-white/20 backdrop-blur rounded-xl px-4 py-2 text-white">
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input Section */}
      <div className="z-10 p-5 border-t border-white/20 flex items-center gap-3 bg-white/5 backdrop-blur">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 bg-white/10 text-white border border-white/30 rounded-xl px-4 py-2 outline-none placeholder:text-white/60"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-green-500 to-teal-400 text-white font-semibold hover:scale-105 transition duration-300"
        >
          Send
        </button>
      </div>
    </div>
    </>
  );
};

export default Chat;
