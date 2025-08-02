import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useSubscription } from "@apollo/client";

import { GET_ONE_ROOMCHAT_QUERY } from "../../graphql/query/roomChat.query";
import { GET_CHAT_IN_ROOM_QUERY } from "../../graphql/query/chat.query";
import {
  SET_TYPING_STATUS,
  SEND_MESSAGE_MUTATION,
} from "../../graphql/mutations/chat.mutation";
import {
  TYPING_STATUS_SUBSCRIPTION,
  MESSAGE_ADDED_SUBSCRIPTION,
} from "../../graphql/subscriptions/chat.subscription";
import BottomSection from "./buttonSectionNew";
import HeaderSection from "./headerSection";
import BodySection from "./bodySection";
import { uploadFile } from "../../utils/upload.util.js";
const RightSideMess = ({ id, idfr }) => {
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  // Fetch initial messages
  const {
    loading: chatLoading,
    error: chatError,
    data: chatData,
    refetch,
  } = useQuery(GET_CHAT_IN_ROOM_QUERY, {
    variables: { roomChatId: idfr },
    onCompleted: (data) => {
      setMessages(data.chats);
      scrollToBottom();
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5000);

    return () => clearInterval(interval);
  }, [refetch]);

  // Fetch room chat information
  const {
    loading: roomChatLoading,
    error: roomChatError,
    data: roomChatData,
  } = useQuery(GET_ONE_ROOMCHAT_QUERY, {
    variables: { roomChatId: idfr },
  });
  //handle error
  if (roomChatError) {
    console.warn(roomChatError);
    navigate("/not-found");
  }

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
      setFiles([]);
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
  }, [isTyping, idfr, setTypingStatusMutation]);

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
    if (messageContent.trim() === "" && !files.length) return;
    try {
      const urls =
        (await Promise.all(files.map((file) => uploadFile(file)))) || [];
      await sendMessage({
        variables: {
          input: { roomChatId: idfr, content: messageContent, images: urls },
        },
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
  const handleEmojiChange = (emoji) => {
    // console.log(emoji);
    setMessageContent((prevContent) => prevContent + emoji);
  };

  // handle sending files
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files).map((file) => {
      return file.name;
    });

    setFiles([...files, ...selectedFiles]);
    setMessageContent((prevContent) => prevContent + files.join("\n"));
  };

  if (!myFriendInfo) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center text-center p-8">
          <div className="w-24 h-24 mb-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="currentColor"
              viewBox="0 0 96 96"
            >
              <path d="M48 0C21.532 0 0 21.533 0 48s21.532 48 48 48 48-21.532 48-48S74.468 0 48 0Zm0 94C22.636 94 2 73.364 2 48S22.636 2 48 2s46 20.636 46 46-20.636 46-46 46Zm12.227-53.284-7.257 5.507c-.49.37-1.166.375-1.661.005l-5.373-4.031a3.453 3.453 0 0 0-4.989.921l-6.756 10.718c-.653 1.027.615 2.189 1.582 1.453l7.257-5.507a1.382 1.382 0 0 1 1.661-.005l5.373 4.031a3.453 3.453 0 0 0 4.989-.92l6.756-10.719c.653-1.027-.615-2.189-1.582-1.453ZM48 25c-12.958 0-23 9.492-23 22.31 0 6.706 2.749 12.5 7.224 16.503.375.338.602.806.62 1.31l.125 4.091a1.845 1.845 0 0 0 2.582 1.629l4.563-2.013a1.844 1.844 0 0 1 1.227-.093c2.096.579 4.331.884 6.659.884 12.958 0 23-9.491 23-22.31S60.958 25 48 25Zm0 42.621c-2.114 0-4.175-.273-6.133-.813a3.834 3.834 0 0 0-2.56.192l-4.346 1.917-.118-3.867a3.833 3.833 0 0 0-1.286-2.727C29.33 58.54 27 53.209 27 47.31 27 35.73 36.028 27 48 27s21 8.73 21 20.31-9.028 20.31-21 20.31Z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Your messages
          </h2>
          <p className="text-gray-600 mb-6">Send a message to start a chat.</p>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
            Send message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      <HeaderSection myFriendInfo={myFriendInfo} />
      <BodySection
        id={id}
        messages={messages}
        myFriendInfo={myFriendInfo}
        messagesEndRef={messagesEndRef}
        typingStatus={typingStatus}
      />
      <BottomSection
        id={id}
        idfr={idfr}
        handleEmojiChange={handleEmojiChange}
        handleKeyPress={handleKeyPress}
        handleTyping={handleTyping}
        files={files}
        setFiles={setFiles}
        messageContent={messageContent}
      />
    </div>
  );
};

export default RightSideMess;
