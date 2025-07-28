import React from "react";
import { CheckCircle, X, Upload, AlertCircle } from "lucide-react";

const UploadProgressNotification = ({
  isVisible,
  progress,
  status, // 'uploading', 'success', 'error'
  fileName,
  onClose,
  totalFiles = 1,
  currentFile = 1,
}) => {
  if (!isVisible) return null;

  const getStatusIcon = () => {
    switch (status) {
      case "uploading":
        return <Upload className="w-5 h-5 text-blue-500 animate-pulse" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Upload className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "uploading":
        return totalFiles > 1
          ? `Uploading ${currentFile}/${totalFiles} files...`
          : "Uploading...";
      case "success":
        return "Upload complete!";
      case "error":
        return "Upload failed";
      default:
        return "Preparing upload...";
    }
  };

  const getProgressColor = () => {
    switch (status) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="fixed top-4 right-4 bg-white text-black px-6 py-4 rounded-lg shadow-xl z-50 border border-gray-200 min-w-[320px] max-w-[400px]">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3 flex-1">
          {getStatusIcon()}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-sm text-gray-800">
                {getStatusText()}
              </p>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {fileName && (
              <p className="text-xs text-gray-600 mb-2 truncate">{fileName}</p>
            )}

            {status === "uploading" && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor()}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {status === "uploading" && (
              <p className="text-xs text-gray-500 mt-1">{progress}% complete</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadProgressNotification;
