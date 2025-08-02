import React, { useState, useRef } from "react";
import ICon from "../comment/iconPick";
import { useDropzone } from "react-dropzone";
import { X, FileText, File, Image } from "lucide-react";

export default function BottomSection({
  setFiles,
  files,
  messageContent,
  handleTyping,
  handleKeyPress,
  handleEmojiChange,
}) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*,video/*,application/pdf,application/msword",
    onDrop: (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
    },
  });

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      {/* File previews */}
      {files.length > 0 && (
        <div className="mb-3 flex gap-3 overflow-x-auto pb-2">
          {files.map((file, index) => (
            <div key={index} className="relative flex-shrink-0">
              {file.type.startsWith("image/") && (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              )}
              {file.type.startsWith("video/") && (
                <video
                  src={URL.createObjectURL(file)}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              )}
              {file.type === "application/pdf" && (
                <div className="w-16 h-16 flex flex-col items-center justify-center bg-red-100 rounded-lg">
                  <FileText size={24} className="text-red-600" />
                </div>
              )}
              {!file.type.startsWith("image/") &&
                !file.type.startsWith("video/") &&
                file.type !== "application/pdf" && (
                  <div className="w-16 h-16 flex flex-col items-center justify-center bg-gray-100 rounded-lg">
                    <File size={24} className="text-gray-600" />
                  </div>
                )}
              <button
                onClick={() => removeFile(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Message input */}
      <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-3">
        <div className="text-gray-500">
          <ICon onEmojiChange={handleEmojiChange} />
        </div>
        <input
          className="flex-1 bg-transparent outline-none placeholder-gray-500 text-gray-900"
          placeholder="Message..."
          value={messageContent}
          onChange={handleTyping}
          onKeyDown={handleKeyPress}
        />
        <div className="flex items-center gap-2 text-gray-500">
          <div
            {...getRootProps()}
            className="cursor-pointer p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <input {...getInputProps()} />
            <Image size={20} />
          </div>
          <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 15.745a4 4 0 0 1-4-4V6a4 4 0 0 1 8 0v5.745a4 4 0 0 1-4 4Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M19.5 10.671v.897a7.5 7.5 0 0 1-15 0v-.897"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                x1="12"
                x2="12"
                y1="19.068"
                y2="22"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                x1="8.706"
                x2="15.104"
                y1="22"
                y2="22"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.28-.588 1.12-1.763a4.21 4.21 0 0 1 3.675-1.941Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
