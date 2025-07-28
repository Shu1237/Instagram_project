import { gql } from "@apollo/client";

export const UPLOAD_PROGRESS_SUBSCRIPTION = gql`
  subscription UploadProgress($userId: ID!) {
    uploadProgress(userId: $userId) {
      userId
      progress
      status
      fileName
      totalFiles
      currentFile
    }
  }
`;

export const POST_UPLOAD_STATUS_SUBSCRIPTION = gql`
  subscription PostUploadStatus($userId: ID!) {
    postUploadStatus(userId: $userId) {
      userId
      status
      postId
      message
    }
  }
`;

export const NOTIFICATION_SUBSCRIPTION = gql`
  subscription NotificationAdded($receiver_id: ID!) {
    notificationAdded(receiver_id: $receiver_id) {
      id
      type
      sender_id
      receiver_id
      post_id
      message
      sender {
        user_id
        username
        avatar
      }
      create_at
    }
  }
`;
