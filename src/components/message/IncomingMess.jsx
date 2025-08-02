import React from "react";
import formatTime from "../../utils/formatTime.util";
import { FileText, Image, Video } from "lucide-react";

const IncomingMessage = ({ message }) => {
  const timeAgo = formatTime(message?.createdAt);

  const renderContent = () => {
    if (message?.images?.length > 0) {
      return message.images.map((file, index) => {
        const fileExtension = file?.split(".").pop().toLowerCase();
        if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
          return (
            <>
              <img
                key={index}
                src={file}
                alt={`attachment-${index}`}
                className="w-full h-auto rounded-lg mb-2"
              />
            </>
          );
        } else if (["mp4", "webm", "ogg"].includes(fileExtension)) {
          return (
            <>
              <video
                key={index}
                src={file}
                controls
                className="w-full h-auto rounded-lg mb-2"
              />
            </>
          );
        } else if (fileExtension === "pdf") {
          return (
            <>
              <div key={index} className="flex items-center mb-2">
                <FileText size={24} className="text-gray-600 mr-2" />
                <a
                  href={file}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="text-blue-600 underline"
                >
                  {`PDF Document ${index + 1}`}
                </a>
              </div>
            </>
          );
        } else {
          return (
            <>
              <div key={index} className="flex items-center mb-2">
                <FileText size={24} className="text-gray-600 mr-2" />
                <a
                  href={file}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="text-blue-600 underline"
                >
                  {`File ${index + 1}`}
                </a>
              </div>
            </>
          );
        }
      });
    }
  };

  return (
    <div className="flex items-start mb-6 max-w-[70%]">
      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
        <img
          className="w-full h-full object-cover"
          src={message?.user?.avatar}
          alt="User"
        />
      </div>
      <div className="ml-3 flex-1">
        <div className="bg-gray-200 p-3 rounded-2xl rounded-tl-md shadow-sm">
          {renderContent()}
          {message?.content && (
            <p className="text-gray-800 leading-relaxed">{message?.content}</p>
          )}
        </div>
        <div className="flex items-center mt-1 ml-1">
          <span className="text-xs text-gray-500 font-medium">
            {message?.user?.username}
          </span>
          <span className="text-xs text-gray-400 ml-2">{timeAgo}</span>
        </div>
      </div>
    </div>
  );
};

export default IncomingMessage;
