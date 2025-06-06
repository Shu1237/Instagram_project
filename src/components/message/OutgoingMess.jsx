import React from "react";
import formatTime from "../../utils/formatTime.util";
import { FileText, Image, Video } from "lucide-react";

const OutgoingMessage = ({ message }) => {
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
    <div className="flex items-end justify-end mb-4">
      <div className="flex flex-col items-end">
        <div className="bg-blue-400 text-white p-2 px-4 rounded-3xl rounded-tr-sm max-w-xs text-sm shadow-sm">
          {renderContent()}
          <p>{message?.content}</p>
        </div>
        <span className="text-xs text-gray-400 mt-1">{timeAgo}</span>
      </div>
      <div className="w-8 h-8 rounded-full overflow-hidden ml-2">
        <img
          className="w-full h-full object-cover"
          src={message?.user.avatar}
          alt="User"
        />
      </div>
    </div>
  );
};

export default OutgoingMessage;
