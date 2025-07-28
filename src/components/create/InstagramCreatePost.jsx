import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import {
  Plus,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Users,
  Settings,
  Smile,
} from "lucide-react";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useMutation } from "@apollo/client";
import { CREATE_POST_MUTATION } from "../../graphql/mutations/post.mutation";
import { getCookies } from "../../utils/cookie.util";
import { uploadMultipleFilesWithProgress } from "../../utils/uploadWithProgress.util";
import * as localStorageFunctions from "../../utils/localStorage.util.js";

// Import new components
import FileDropZone from "./FileDropZone";
import MediaPreview from "./MediaPreview";
import UploadProgressNotification from "./UploadProgressNotification";
import PostSuccessNotification from "./PostSuccessNotification";
import IconPicker from "../comment/iconPick";

const InstagramCreatePost = () => {
  const userInfo = localStorageFunctions.getLocalStorage()?.user;
  const navigate = useNavigate();

  // Modal states
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 0: select, 1: edit, 2: share

  // Media states
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [mediaPreview, setMediaPreview] = useState([]);

  // Post content states
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [accessibility, setAccessibility] = useState("");

  // Upload states
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("idle"); // 'idle', 'uploading', 'success', 'error'
  const [currentUploadFile, setCurrentUploadFile] = useState(1);

  // Notification states
  const [showUploadNotification, setShowUploadNotification] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  // GraphQL mutation
  const [createPost, { loading: postLoading }] = useMutation(
    CREATE_POST_MUTATION,
    {
      onError: (error) => {
        console.error("Post creation error:", error);
        setUploadStatus("error");
      },
      onCompleted: (data) => {
        setUploadStatus("success");
        setShowUploadNotification(false);
        setShowSuccessNotification(true);
      },
    }
  );

  const MAX_CAPTION_LENGTH = 2200;
  const MAX_FILES = 10;

  // Handle file selection
  const handleFilesSelected = useCallback(
    (files) => {
      if (files.length + selectedFiles.length > MAX_FILES) {
        alert(`You can only upload up to ${MAX_FILES} files.`);
        return;
      }

      const validFiles = files.filter(
        (file) =>
          file.type.startsWith("image/") || file.type.startsWith("video/")
      );

      if (validFiles.length === 0) {
        alert("Please select valid image or video files.");
        return;
      }

      // Create preview URLs
      const newPreviews = validFiles.map((file) => ({
        file,
        url: URL.createObjectURL(file),
        type: file.type,
        name: file.name,
        size: file.size,
      }));

      setSelectedFiles((prev) => [...prev, ...validFiles]);
      setMediaPreview((prev) => [...prev, ...newPreviews]);

      // Auto advance to next step if files are selected
      if (currentStep === 0) {
        setCurrentStep(1);
      }
    },
    [selectedFiles.length, currentStep]
  );

  // Handle media removal
  const handleRemoveMedia = useCallback(
    (index) => {
      // Revoke object URL to prevent memory leaks
      URL.revokeObjectURL(mediaPreview[index].url);

      setMediaPreview((prev) => prev.filter((_, i) => i !== index));
      setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    },
    [mediaPreview]
  );

  // Handle caption change
  const handleCaptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_CAPTION_LENGTH) {
      setCaption(value);
    }
  };

  // Handle emoji selection
  const handleEmojiSelect = (emoji) => {
    setCaption((prev) => prev + emoji);
  };

  // Handle post submission
  const handleSubmitPost = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select at least one image or video.");
      return;
    }

    setIsUploading(true);
    setShowUploadNotification(true);
    setUploadStatus("uploading");
    setUploadProgress(0);

    try {
      // Upload files with progress tracking
      const uploadResults = await uploadMultipleFilesWithProgress(
        selectedFiles,
        (overallProgress, fileIndex, fileProgress) => {
          setUploadProgress(overallProgress);
          setCurrentUploadFile(fileIndex + 1);
        },
        (fileIndex, result) => {
          console.log(`File ${fileIndex + 1} upload completed:`, result);
        }
      );

      // Check if all uploads were successful
      const successfulUploads = uploadResults.filter(
        (result) => result.success
      );

      if (successfulUploads.length === 0) {
        throw new Error("All file uploads failed");
      }

      if (successfulUploads.length < uploadResults.length) {
        console.warn("Some files failed to upload");
      }

      // Extract URLs from successful uploads
      const mediaUrls = successfulUploads.map((result) => result.url);

      // Create post
      const postInput = {
        user_id: getCookies("user_id"),
        caption: caption.trim(),
        media_urls: mediaUrls,
        status: "public",
      };

      await createPost({
        variables: { input: postInput },
      });
    } catch (error) {
      console.error("Error creating post:", error);
      setUploadStatus("error");
      setShowUploadNotification(true);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    // Clean up object URLs
    mediaPreview.forEach((media) => URL.revokeObjectURL(media.url));

    setIsOpen(false);
    setCurrentStep(0);
    setSelectedFiles([]);
    setMediaPreview([]);
    setCaption("");
    setLocation("");
    setAccessibility("");
    setUploadProgress(0);
    setUploadStatus("idle");
    setShowUploadNotification(false);
    setShowSuccessNotification(false);
  };

  // Navigation functions
  const goToNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Get step title
  const getStepTitle = () => {
    switch (currentStep) {
      case 0:
        return "Create new post";
      case 1:
        return "Edit";
      case 2:
        return "Share";
      default:
        return "Create new post";
    }
  };

  // Handle success notification actions
  const handleViewPost = () => {
    navigate("/");
    handleCloseModal();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mediaPreview.forEach((media) => URL.revokeObjectURL(media.url));
    };
  }, [mediaPreview]);

  return (
    <>
      {/* Trigger Button */}
      <div
        onClick={() => setIsOpen(true)}
        className="flex h-[40px] items-center px-[30px] rounded-[5px] cursor-pointer mb-[20px] hover:bg-[#ededed] w-full max-xl:w-8 max-xl:px-0"
      >
        <AddBoxOutlinedIcon sx={{ fontSize: "35px", margin: "0 20px 0 0" }} />
        <div className="font-normal text-[16px] text-lg max-xl:hidden">
          Create
        </div>
      </div>

      {/* Main Modal */}
      <Modal
        centered
        open={isOpen}
        onCancel={handleCloseModal}
        footer={null}
        width={currentStep === 2 ? 900 : 600}
        className="instagram-create-modal"
      >
        <div className="bg-white rounded-lg overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            {currentStep > 0 && (
              <button
                onClick={goToPreviousStep}
                className="text-gray-600 hover:text-gray-800 transition-colors"
                disabled={isUploading}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}

            <h2 className="text-lg font-semibold text-gray-800 flex-1 text-center">
              {getStepTitle()}
            </h2>

            {currentStep < 2 && mediaPreview.length > 0 && (
              <button
                onClick={goToNextStep}
                className="text-blue-500 hover:text-blue-600 font-semibold transition-colors"
                disabled={isUploading}
              >
                {currentStep === 1 ? "Share" : "Next"}
              </button>
            )}

            {currentStep === 2 && (
              <button
                onClick={handleSubmitPost}
                className="text-blue-500 hover:text-blue-600 font-semibold transition-colors disabled:opacity-50"
                disabled={isUploading || selectedFiles.length === 0}
              >
                {isUploading ? "Sharing..." : "Share"}
              </button>
            )}
          </div>

          {/* Content */}
          <div className="p-0">
            {/* Step 0: File Selection */}
            {currentStep === 0 && (
              <div className="h-[500px] p-6">
                <FileDropZone
                  onFilesSelected={handleFilesSelected}
                  maxFiles={MAX_FILES}
                />
              </div>
            )}

            {/* Step 1: Edit Media */}
            {currentStep === 1 && (
              <div className="h-[500px] p-6">
                <MediaPreview
                  media={mediaPreview}
                  onRemove={handleRemoveMedia}
                  className="w-full h-full"
                />
              </div>
            )}

            {/* Step 2: Add Caption and Share */}
            {currentStep === 2 && (
              <div className="flex h-[500px]">
                {/* Media Preview */}
                <div className="flex-1 bg-black">
                  <MediaPreview
                    media={mediaPreview}
                    className="w-full h-full"
                  />
                </div>

                {/* Post Details */}
                <div className="w-80 border-l border-gray-200 flex flex-col">
                  {/* User Info */}
                  <div className="flex items-center p-4 border-b border-gray-200">
                    <img
                      src={userInfo?.avatar}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="ml-3 font-semibold text-sm">
                      {userInfo?.username}
                    </span>
                  </div>

                  {/* Caption Input */}
                  <div className="flex-1 p-4">
                    <textarea
                      placeholder="Write a caption..."
                      value={caption}
                      onChange={handleCaptionChange}
                      className="w-full h-32 border-none outline-none resize-none text-sm placeholder-gray-500"
                      maxLength={MAX_CAPTION_LENGTH}
                    />

                    <div className="flex items-center justify-between mt-2">
                      <IconPicker onEmojiChange={handleEmojiSelect} />
                      <span className="text-xs text-gray-400">
                        {caption.length}/{MAX_CAPTION_LENGTH}
                      </span>
                    </div>
                  </div>

                  {/* Additional Options */}
                  <div className="border-t border-gray-200">
                    {/* Location */}
                    <div className="flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                      <MapPin className="w-5 h-5 text-gray-600 mr-3" />
                      <input
                        type="text"
                        placeholder="Add location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="flex-1 outline-none bg-transparent text-sm"
                      />
                    </div>

                    {/* Collaborators */}
                    <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-gray-600 mr-3" />
                        <span className="text-sm">Tag people</span>
                      </div>
                    </div>

                    {/* Accessibility */}
                    <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                      <div className="flex items-center">
                        <Settings className="w-5 h-5 text-gray-600 mr-3" />
                        <span className="text-sm">Accessibility</span>
                      </div>
                    </div>

                    {/* Advanced Settings */}
                    <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center">
                        <Settings className="w-5 h-5 text-gray-600 mr-3" />
                        <span className="text-sm">Advanced settings</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* Upload Progress Notification */}
      <UploadProgressNotification
        isVisible={showUploadNotification}
        progress={uploadProgress}
        status={uploadStatus}
        fileName={selectedFiles[currentUploadFile - 1]?.name}
        onClose={() => setShowUploadNotification(false)}
        totalFiles={selectedFiles.length}
        currentFile={currentUploadFile}
      />

      {/* Success Notification */}
      <PostSuccessNotification
        isVisible={showSuccessNotification}
        onClose={() => setShowSuccessNotification(false)}
        postData={{
          caption,
          mediaPreview: mediaPreview[0]?.url,
        }}
        onViewPost={handleViewPost}
      />
    </>
  );
};

export default InstagramCreatePost;
