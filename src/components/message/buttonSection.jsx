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
  // Xử lý kéo-thả file
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*,video/*,application/pdf,application/msword",
    onDrop: (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
    },
  });
  //remove files
  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };
  return (
    <div className="p-4 mt-auto flex flex-col">
      <div className="flex flex-row items-center bg-white border-2 border-gray-300 rounded-3xl hover:border-gray-400 focus-within:border-blue-500 transition-colors group">
        <div className="pl-3 text-gray-500">
          <ICon onEmojiChange={handleEmojiChange} />
        </div>
        <div className="flex-1 px-2 py-2">
          {/* Display selected files */}
          {files.length > 0 && (
            <div className="flex gap-3 overflow-x-auto py-2">
              {files.map((file, index) => (
                <div key={index} className="relative">
                  {/* Display file by type */}
                  {file.type.startsWith("image/") && (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  )}

                  {file.type.startsWith("video/") && (
                    <video
                      src={URL.createObjectURL(file)}
                      controls
                      className="w-20 h-20 rounded-lg"
                    />
                  )}
                  {file.type === "application/pdf" && (
                    <div className="w-20 h-20 flex flex-col items-center justify-center bg-gray-200 rounded-lg">
                      <FileText size={32} className="text-red-600" />
                      <span
                        className="text-xs text-gray-700 mt-1 truncate w-full"
                        title={file.name}
                      >
                        {file.name}
                      </span>
                    </div>
                  )}

                  {file.type ===
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && (
                    <div className="w-20 h-20 flex flex-col items-center justify-center bg-gray-200 rounded-lg">
                      <FileText size={32} className="text-blue-600" />
                      <span
                        className="text-xs text-gray-700 mt-1 truncate w-full"
                        title={file.name}
                      >
                        {file.name}
                      </span>
                    </div>
                  )}

                  {!file.type.startsWith("image/") &&
                    !file.type.startsWith("video/") &&
                    file.type !== "application/pdf" &&
                    file.type !==
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && (
                      <div className="w-20 h-20 flex flex-col items-center justify-center bg-gray-200 rounded-lg">
                        <File size={32} className="text-gray-600" />
                        <span
                          className="text-xs text-gray-700 mt-1 truncate w-full"
                          title={file.name}
                        >
                          {file.name}
                        </span>
                      </div>
                    )}

                  {/* Delete button */}
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
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
          <button className="p-1 hover:text-blue-500 transition-colors">
            <svg
              aria-label="Voice Clip"
              className="x1lliihq x1n2onr6 x5n08af"
              fill="currentColor"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <title>Voice Clip</title>
              <path
                d="M19.5 10.671v.897a7.5 7.5 0 0 1-15 0v-.897"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="12"
                x2="12"
                y1="19.068"
                y2="22"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="8.706"
                x2="15.104"
                y1="22"
                y2="22"
              ></line>
              <path
                d="M12 15.745a4 4 0 0 1-4-4V6a4 4 0 0 1 8 0v5.745a4 4 0 0 1-4 4Z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
          </button>
          {/* Kéo-thả file */}
          <div
            {...getRootProps()}
            className="cursor-pointer p-2 rounded-full hover:bg-gray-200"
          >
            <input {...getInputProps()} />
            <Image className="minhnghidaoday" />
          </div>

          <button className="p-1 hover:text-blue-500 transition-colors">
            <svg
              aria-label="Choose a GIF or sticker"
              className="x1lliihq x1n2onr6 x5n08af"
              fill="currentColor"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <title>Choose a GIF or sticker</title>
              <path
                d="M13.11 22H7.416A5.417 5.417 0 0 1 2 16.583V7.417A5.417 5.417 0 0 1 7.417 2h9.166A5.417 5.417 0 0 1 22 7.417v5.836a2.083 2.083 0 0 1-.626 1.488l-6.808 6.664A2.083 2.083 0 0 1 13.11 22Z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
              <circle cx="8.238" cy="9.943" r="1.335"></circle>
              <circle cx="15.762" cy="9.943" r="1.335"></circle>
              <path
                d="M15.174 15.23a4.887 4.887 0 0 1-6.937-.301"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
              <path
                d="M22 10.833v1.629a1.25 1.25 0 0 1-1.25 1.25h-1.79a5.417 5.417 0 0 0-5.417 5.417v1.62a1.25 1.25 0 0 1-1.25 1.25H9.897"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
          </button>
          <button className="p-1 hover:text-blue-500 transition-colors">
            <svg
              aria-label="Like"
              className="x1lliihq x1n2onr6 x5n08af"
              fill="currentColor"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <title>Like</title>
              <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
