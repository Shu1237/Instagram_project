import { useParams } from "react-router-dom";
import Avatar from "../../assets/profilepic.png";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import ICon from "../comment/iconPick";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  GET_ROOMCHATS_QUERY,
  GET_ONE_ROOMCHAT_QUERY,
} from "../../graphql/query/roomChat.query";
import { GET_CHAT_IN_ROOM_QUERY } from "../../graphql/query/chat.query";
import { SET_TYPING_STATUS } from "../../graphql/mutations/chat.mutation";
import { SEND_MESSAGE_MUTATION } from "../../graphql/mutations/chat.mutation";
import { TYPING_STATUS_SUBSCRIPTION } from "../../graphql/subscriptions/chat.subscription";
import { MESSAGE_ADDED_SUBSCRIPTION } from "../../graphql/subscriptions/chat.subscription";
import IncomingMessage from "./IncomingMess";
import OutgoingMessage from "./OutgoingMess";

const MiddleSideMess = ({ id, idfr }) => {
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");

  // Fetch initial messages
  const {
    loading: chatLoading,
    error: chatError,
    data: chatData,
  } = useQuery(GET_CHAT_IN_ROOM_QUERY, {
    variables: { roomChatId: idfr },
    onCompleted: (data) => {
      setMessages(data.chats);
      scrollToBottom();
    },
  });

  // Fetch room chat information
  const {
    loading: roomChatLoading,
    error: roomChatError,
    data: roomChatData,
  } = useQuery(GET_ONE_ROOMCHAT_QUERY, {
    variables: { roomChatId: idfr },
  });

  // Room chat information
  const myFriendInfo = roomChatData?.roomChat?.users.find(
    (user) => user.user_id !== id
  );

  // Typing indicator
  const [isTyping, setIsTyping] = useState(false);
  const [typingStatus, setTypingStatus] = useState(false);
  const [typingUser, setTypingUser] = useState(null);
  const [setTypingStatusMutation] = useMutation(SET_TYPING_STATUS);

  const handleTyping = (e) => {
    setMessageContent(e.target.value);
    if (e.target.value) {
      setIsTyping(true);
      setTypingStatusMutation({
        variables: { roomChatId: idfr, isTyping: true },
      });
    } else {
      setIsTyping(false);
      setTypingStatusMutation({
        variables: { roomChatId: idfr, isTyping: false },
      });
    }
  };

  // Send message mutation
  const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION, {
    onCompleted: () => {
      setMessageContent("");
      scrollToBottom();
    },
  });

  // Subscription for new messages
  useSubscription(MESSAGE_ADDED_SUBSCRIPTION, {
    variables: { roomChatId: idfr },
    onData: (x) => {
      console.log(x);
      const newMessage = x.data.data.messageAdded;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      scrollToBottom();
    },
  });
  // Debounce typing indicator
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsTyping(false);
      setTypingStatusMutation({
        variables: { roomChatId: idfr, isTyping: false },
      });
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [isTyping]);

  // Subscription for typing status
  useSubscription(TYPING_STATUS_SUBSCRIPTION, {
    variables: { roomChatId: idfr },
    onData: ({ data }) => {
      const typingStatus = data.data.typingStatus;
      setTypingUser(typingStatus.user);
      if (typingStatus.user.user_id !== id)
        setTypingStatus(typingStatus.isTyping);
    },
  });

  const handleSendMessage = async () => {
    if (messageContent.trim() === "") return;
    try {
      await sendMessage({
        variables: { input: { roomChatId: idfr, content: messageContent } },
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!myFriendInfo) {
    return (
      <div className="h-screen flex items-center justify-center p-2">
        <div className="flex flex-col items-center w-full max-w-sm text-center justify-center">
          <div>
            <svg
              aria-label=""
              className="x1lliihq x1n2onr6 x5n08af"
              fill="currentColor"
              height="96"
              role="img"
              viewBox="0 0 96 96"
              width="96"
            >
              <title></title>
              <path d="M48 0C21.532 0 0 21.533 0 48s21.532 48 48 48 48-21.532 48-48S74.468 0 48 0Zm0 94C22.636 94 2 73.364 2 48S22.636 2 48 2s46 20.636 46 46-20.636 46-46 46Zm12.227-53.284-7.257 5.507c-.49.37-1.166.375-1.661.005l-5.373-4.031a3.453 3.453 0 0 0-4.989.921l-6.756 10.718c-.653 1.027.615 2.189 1.582 1.453l7.257-5.507a1.382 1.382 0 0 1 1.661-.005l5.373 4.031a3.453 3.453 0 0 0 4.989-.92l6.756-10.719c.653-1.027-.615-2.189-1.582-1.453ZM48 25c-12.958 0-23 9.492-23 22.31 0 6.706 2.749 12.5 7.224 16.503.375.338.602.806.62 1.31l.125 4.091a1.845 1.845 0 0 0 2.582 1.629l4.563-2.013a1.844 1.844 0 0 1 1.227-.093c2.096.579 4.331.884 6.659.884 12.958 0 23-9.491 23-22.31S60.958 25 48 25Zm0 42.621c-2.114 0-4.175-.273-6.133-.813a3.834 3.834 0 0 0-2.56.192l-4.346 1.917-.118-3.867a3.833 3.833 0 0 0-1.286-2.727C29.33 58.54 27 53.209 27 47.31 27 35.73 36.028 27 48 27s21 8.73 21 20.31-9.028 20.31-21 20.31Z"></path>
            </svg>
          </div>
          <h1 className="text-lg font-semibold mt-2">Your messages</h1>
          <span className="text-gray-500">Send a message to start a chat.</span>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600 transition">
            Send message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-row justify-between items-center border-b border-gray-300 py-3">
        <div className="flex flex-row gap-4 items-center p-2">
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 rounded-full border-2 border-white ring-1 ring-gray-200 overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={myFriendInfo?.avatar}
                alt="User"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-800 truncate">
                {myFriendInfo?.full_name}
              </span>
            </div>
            <p className="text-xs text-gray-500 truncate">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1" />
              Active 7m ago
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-4 mr-2">
          {/* Icons for call, video, etc. */}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 mt-6">
          <img
            className="w-full h-full rounded-[50%]"
            src={myFriendInfo?.avatar}
            alt=""
          />
        </div>
        <h1 className="mt-2 text-lg font-medium">{myFriendInfo?.full_name}</h1>
        <p className="text-base text-gray-400">
          {myFriendInfo?.username} · Instagram
        </p>
        <div className="m-5">
          <button
            className="bg-gray-200 p-[5px_12px] rounded-md text-sm font-medium"
            onClick={() => navigate(`/profile/${myFriendInfo?.user_id}`)}
          >
            View Profile
          </button>
        </div>

        {/* Messages */}
        <div className="w-full p-4 overflow-y-auto">
          {messages?.map((message) =>
            message.user.user_id !== id ? (
              <IncomingMessage key={message.id} message={message} />
            ) : (
              <OutgoingMessage key={message.id} message={message} />
            )
          )}
        </div>

        {/* Typing indicator */}
        {typingStatus && typingUser?.user_id !== id && (
          <div className="text-gray-500 text-sm mt-2">
            {typingUser?.username} is typing...
          </div>
        )}
      </div>

      {/* Bottom section */}
      <div className="p-4 mt-auto flex flex-col">
        <div className="flex flex-row items-center bg-white border-2 border-gray-300 rounded-3xl hover:border-gray-400 focus-within:border-blue-500 transition-colors group">
          <div className="pl-3 text-gray-500">
            <ICon />
          </div>
          <div className="flex-1 px-2 py-2">
            <input
              className="w-full outline-none placeholder-gray-500 text-gray-700 bg-transparent"
              placeholder="Message..."
              value={messageContent}
              onChange={handleTyping}
              onKeyDown={handleKeyPress}
            />
          </div>
          <div className="flex items-center gap-3 pr-3 text-gray-600">
            {/* Icons for voice, photo, etc. */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiddleSideMess;
