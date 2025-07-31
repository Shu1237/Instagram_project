import React, { useState, useEffect } from "react";
import InstagramCreatePost from "./InstagramCreatePost";

const CreatePostTrigger = ({ children, onModalOpen, onModalClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTriggerClick = () => {
    setIsModalOpen(true);
    if (onModalOpen) onModalOpen();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (onModalClose) onModalClose();
  };

  // Render the trigger element and conditionally render the modal
  return (
    <>
      <div onClick={handleTriggerClick}>{children}</div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50">
          <InstagramCreatePostModal onClose={handleModalClose} />
        </div>
      )}
    </>
  );
};

// Wrapper for InstagramCreatePost without its own trigger
const InstagramCreatePostModal = ({ onClose }) => {
  // We'll need to modify InstagramCreatePost to accept external control
  // For now, let's create a simpler solution
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4">
        <h2>Create Post Modal</h2>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
        >
          Close
        </button>
        {/* We would need to integrate the actual InstagramCreatePost content here */}
      </div>
    </div>
  );
};

export default CreatePostTrigger;
