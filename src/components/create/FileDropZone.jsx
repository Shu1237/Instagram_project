import React, { useState, useRef } from "react";
import { Upload, Image, Video, Plus } from "lucide-react";

const FileDropZone = ({
  onFilesSelected,
  maxFiles = 10,
  acceptedTypes = ["image/*", "video/*"],
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter((file) =>
      acceptedTypes.some(
        (type) =>
          type === "*/*" || file.type.startsWith(type.replace("/*", "/"))
      )
    );

    if (validFiles.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files at once.`);
      return;
    }

    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onFilesSelected(files);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = "";
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full h-full min-h-[400px] flex flex-col">
      <div
        className={`
          flex-1 border-2 border-dashed rounded-xl transition-all duration-300 cursor-pointer
          flex flex-col items-center justify-center space-y-4 p-8
          ${
            isDragOver
              ? "border-blue-500 bg-blue-50 border-solid"
              : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
          }
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openFileDialog}
      >
        <div
          className={`transition-all duration-300 ${
            isDragOver ? "scale-110" : "scale-100"
          }`}
        >
          <div className="relative">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full p-6 mb-4">
              <Upload className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
              <Plus className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold text-gray-800">
            {isDragOver
              ? "Drop your files here"
              : "Drag photos and videos here"}
          </h3>
          <p className="text-gray-600">Or click to select from your computer</p>
          <p className="text-sm text-gray-500">
            Supports up to {maxFiles} files • Images and Videos
          </p>
        </div>

        <div className="flex items-center space-x-4 text-gray-400">
          <div className="flex items-center space-x-2">
            <Image className="w-5 h-5" />
            <span className="text-sm">Photos</span>
          </div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="flex items-center space-x-2">
            <Video className="w-5 h-5" />
            <span className="text-sm">Videos</span>
          </div>
        </div>

        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
          Select Files
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedTypes.join(",")}
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default FileDropZone;
