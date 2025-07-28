import React, { useEffect, useState } from "react";
import { useSubscription } from "@apollo/client";
import {
  UPLOAD_PROGRESS_SUBSCRIPTION,
  POST_UPLOAD_STATUS_SUBSCRIPTION,
  NOTIFICATION_SUBSCRIPTION,
} from "../../graphql/subscriptions/upload.subscription";
import { getCookies } from "../../utils/cookie.util";
import SmallNotification from "../notification/smallNotification";
import UploadProgressNotification from "../create/UploadProgressNotification";
import PostSuccessNotification from "../create/PostSuccessNotification";

const NotificationManager = () => {
  const userId = getCookies("user_id");
  const [notifications, setNotifications] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [postStatus, setPostStatus] = useState(null);

  // Subscribe to general notifications
  const { data: notificationData } = useSubscription(
    NOTIFICATION_SUBSCRIPTION,
    {
      variables: { receiver_id: userId },
      skip: !userId,
    }
  );

  // Subscribe to upload progress
  const { data: uploadProgressData } = useSubscription(
    UPLOAD_PROGRESS_SUBSCRIPTION,
    {
      variables: { userId },
      skip: !userId,
    }
  );

  // Subscribe to post upload status
  const { data: postStatusData } = useSubscription(
    POST_UPLOAD_STATUS_SUBSCRIPTION,
    {
      variables: { userId },
      skip: !userId,
    }
  );

  // Handle new notifications
  useEffect(() => {
    if (notificationData?.notificationAdded) {
      const newNotification = {
        ...notificationData.notificationAdded,
        id: Date.now() + Math.random(), // Ensure unique ID for UI
      };

      setNotifications((prev) => [newNotification, ...prev.slice(0, 4)]); // Keep only 5 most recent

      // Auto remove after 5 seconds
      setTimeout(() => {
        setNotifications((prev) =>
          prev.filter((notif) => notif.id !== newNotification.id)
        );
      }, 5000);
    }
  }, [notificationData]);

  // Handle upload progress updates
  useEffect(() => {
    if (uploadProgressData?.uploadProgress) {
      setUploadProgress(uploadProgressData.uploadProgress);

      // Auto hide when upload completes
      if (uploadProgressData.uploadProgress.status === "completed") {
        setTimeout(() => {
          setUploadProgress(null);
        }, 2000);
      }
    }
  }, [uploadProgressData]);

  // Handle post status updates
  useEffect(() => {
    if (postStatusData?.postUploadStatus) {
      setPostStatus(postStatusData.postUploadStatus);

      // Auto hide success status after 5 seconds
      if (postStatusData.postUploadStatus.status === "success") {
        setTimeout(() => {
          setPostStatus(null);
        }, 5000);
      }
    }
  }, [postStatusData]);

  const handleCloseNotification = (notificationId) => {
    setNotifications((prev) =>
      prev.filter((notif) => notif.id !== notificationId)
    );
  };

  const handleCloseUploadProgress = () => {
    setUploadProgress(null);
  };

  const handleClosePostStatus = () => {
    setPostStatus(null);
  };

  const handleViewPost = () => {
    if (postStatus?.postId) {
      // Navigate to the specific post
      window.location.href = `/post/${postStatus.postId}`;
    } else {
      // Navigate to home feed
      window.location.href = "/";
    }
    setPostStatus(null);
  };

  return (
    <div className="fixed top-0 right-0 z-50 pointer-events-none">
      {/* Upload Progress Notification */}
      {uploadProgress && (
        <div className="pointer-events-auto mb-4">
          <UploadProgressNotification
            isVisible={true}
            progress={uploadProgress.progress}
            status={uploadProgress.status}
            fileName={uploadProgress.fileName}
            onClose={handleCloseUploadProgress}
            totalFiles={uploadProgress.totalFiles}
            currentFile={uploadProgress.currentFile}
          />
        </div>
      )}

      {/* Post Upload Success Notification */}
      {postStatus && postStatus.status === "success" && (
        <div className="pointer-events-auto mb-4">
          <PostSuccessNotification
            isVisible={true}
            onClose={handleClosePostStatus}
            postData={{
              caption: "Your post has been shared!",
              mediaPreview: null, // Could be enhanced to include actual media preview
            }}
            onViewPost={handleViewPost}
          />
        </div>
      )}

      {/* General Notifications */}
      <div className="space-y-2">
        {notifications.map((notification) => (
          <div key={notification.id} className="pointer-events-auto">
            <SmallNotification
              notification={notification}
              onClose={() => handleCloseNotification(notification.id)}
            />
          </div>
        ))}
      </div>

      {/* Error Notifications */}
      {postStatus && postStatus.status === "error" && (
        <div className="pointer-events-auto mb-4">
          <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-xl z-50 border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Upload Failed</h3>
                <p className="text-sm text-red-100">{postStatus.message}</p>
              </div>
              <button
                onClick={handleClosePostStatus}
                className="text-red-100 hover:text-white ml-4"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationManager;
