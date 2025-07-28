import { gql } from "@apollo/client";

export const PUBLISH_UPLOAD_PROGRESS_MUTATION = gql`
  mutation PublishUploadProgress(
    $userId: ID!
    $progress: Int!
    $status: String!
    $fileName: String
    $totalFiles: Int
    $currentFile: Int
  ) {
    publishUploadProgress(
      userId: $userId
      progress: $progress
      status: $status
      fileName: $fileName
      totalFiles: $totalFiles
      currentFile: $currentFile
    )
  }
`;

export const PUBLISH_POST_UPLOAD_STATUS_MUTATION = gql`
  mutation PublishPostUploadStatus(
    $userId: ID!
    $status: String!
    $postId: String
    $message: String
  ) {
    publishPostUploadStatus(
      userId: $userId
      status: $status
      postId: $postId
      message: $message
    )
  }
`;
