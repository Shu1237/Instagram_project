import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { X, Heart, MoreHorizontal, Smile, Send } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { useMutation, useQuery } from "@apollo/client";
import { POST_COMMENT_MUTATION } from "../../graphql/mutations/comment.mutation";
import { GET_COMMENTS_QUERY } from "../../graphql/query/comment.query";
import { getLocalStorage } from "../../utils/localStorage.util";
import formatTime from "../../utils/formatTime.util";
import { useAuth } from "../../hooks/useAuth";

// Memoized Comment Item Component
const CommentItem = React.memo(({ comment, userInfo }) => {
  const [liked, setLiked] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="flex space-x-3 py-3 group">
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarImage
          src={comment.user?.avatar}
          alt={comment.user?.full_name || comment.user?.username}
        />
        <AvatarFallback className="text-xs bg-gray-200">
          {(comment.user?.full_name ||
            comment.user?.username)?.[0]?.toUpperCase() || "U"}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-semibold text-sm text-gray-900">
                {comment.user?.full_name ||
                  comment.user?.username ||
                  "Unknown User"}
              </span>
              <span className="text-xs text-gray-500">
                {formatTime(comment.created_at || comment.createdAt)}
              </span>
            </div>

            <p className="text-sm text-gray-900 break-words leading-relaxed">
              {comment.content || "No content"}
            </p>

            <div className="flex items-center space-x-4 mt-2">
              <button className="text-xs text-gray-500 font-medium hover:text-gray-700 transition-colors">
                Reply
              </button>
              <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                Like
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLiked(!liked)}
              className={cn(
                "h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity",
                liked && "opacity-100"
              )}
            >
              <Heart
                className={cn("h-3 w-3", liked && "fill-red-500 text-red-500")}
              />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});
CommentItem.displayName = "CommentItem";

const CommentModal = ({ isOpen, onClose, post }) => {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const commentInputRef = useRef(null);
  const commentsScrollRef = useRef(null);

  // Stable user reference
  const userInfo = useMemo(() => getLocalStorage()?.user, []);
  const { isAuthenticated } = useAuth();

  // GraphQL mutations and queries with optimizations
  const [createComment] = useMutation(POST_COMMENT_MUTATION, {
    onCompleted: () => {
      setComment("");
      setIsSubmitting(false);
      // Scroll to bottom to show new comment
      if (commentsScrollRef.current) {
        commentsScrollRef.current.scrollTop =
          commentsScrollRef.current.scrollHeight;
      }
    },
    onError: (error) => {
      setIsSubmitting(false);
      console.error("Error posting comment:", error);
    },
    // Optimistic response for immediate UI update
    optimisticResponse: {
      postComment: {
        __typename: "Comment",
        id: Date.now().toString(),
        post_id: post?.id,
        content: comment.trim(),
        created_at: new Date().toISOString(),
        user: {
          __typename: "User",
          user_id: userInfo?.user_id,
          full_name: userInfo?.full_name || userInfo?.username,
          avatar: userInfo?.avatar,
        },
        parent_id: null,
        media_urls: [],
        updated_at: new Date().toISOString(),
      },
    },
    // Update cache immediately
    update: (cache, { data: { postComment } }) => {
      try {
        const existingComments = cache.readQuery({
          query: GET_COMMENTS_QUERY,
          variables: { post_id: post?.id },
        });

        if (existingComments) {
          cache.writeQuery({
            query: GET_COMMENTS_QUERY,
            variables: { post_id: post?.id },
            data: {
              getComments: [...existingComments.getComments, postComment],
            },
          });
        }
      } catch (error) {
        console.error("Error updating cache:", error);
      }
    },
  });

  const {
    data: commentsData,
    loading,
    error,
    refetch,
  } = useQuery(GET_COMMENTS_QUERY, {
    variables: { post_id: post?.id },
    skip: !isOpen || !post?.id,
    fetchPolicy: "cache-first", // Use cache first for faster loading
    nextFetchPolicy: "cache-and-network", // Then update from network
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all", // Show partial data even if there's an error
  });

  // Memoized comments list with proper field mapping and performance optimization
  const comments = useMemo(() => {
    if (!commentsData?.getComments) return [];

    return commentsData.getComments.map((comment) => ({
      ...comment,
      // Map GraphQL fields to component expectations
      username: comment.user?.full_name || comment.user?.username,
      createdAt: comment.created_at,
    }));
  }, [commentsData?.getComments]);

  // Memoized comment components for better performance
  const commentComponents = useMemo(() => {
    return comments.map((commentItem) => (
      <CommentItem
        key={commentItem.id}
        comment={commentItem}
        userInfo={userInfo}
      />
    ));
  }, [comments, userInfo]);

  // Auto-focus on comment input when modal opens
  useEffect(() => {
    if (isOpen && commentInputRef.current) {
      setTimeout(() => {
        commentInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  const handleSubmitComment = useCallback(
    async (e) => {
      e.preventDefault();
      if (!comment.trim() || isSubmitting) return;

      if (!isAuthenticated) {
        alert("Please login to comment");
        onClose();
        window.location.href = "/login";
        return;
      }

      if (!userInfo?.user_id) {
        console.error("User ID not found");
        alert("Please login again");
        return;
      }

      setIsSubmitting(true);

      try {
        await createComment({
          variables: {
            input: {
              post_id: post.id,
              user_id: userInfo.user_id,
              content: comment.trim(),
            },
          },
        });
      } catch (error) {
        console.error("Error creating comment:", error);
        setIsSubmitting(false);
        alert("Failed to post comment. Please try again.");
      }
    },
    [
      comment,
      isSubmitting,
      isAuthenticated,
      createComment,
      post?.id,
      onClose,
      userInfo?.user_id,
    ]
  );

  const handleInputChange = useCallback((e) => {
    setComment(e.target.value);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Left side - Image */}
        <div className="flex-1 bg-black flex items-center justify-center min-h-[500px]">
          {post?.media?.[0] ? (
            <img
              src={post.media[0]}
              alt="Post"
              className="max-w-full max-h-full object-contain"
              loading="eager"
            />
          ) : (
            <div className="text-white/60 text-center">
              <div className="text-lg mb-2">No image available</div>
            </div>
          )}
        </div>

        {/* Right side - Comments */}
        <div className="w-96 flex flex-col border-l border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={post?.user?.avatar}
                  alt={post?.user?.username}
                />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs">
                  {post?.user?.username?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <span className="font-semibold text-sm">
                {post?.user?.full_name}
              </span>

              <span className="text-xs text-gray-500">
                {post?.timeAgo || formatTime(post?.createdAt)}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Comments */}
          <div
            ref={commentsScrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0"
          >
            {/* Post caption
            {post?.content && (
              <div className="flex space-x-3 pb-2">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage
                    src={post?.user?.avatar}
                    alt={post?.user?.username}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs">
                    {post?.user?.full_name?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-sm">
                      {post?.user?.username}
                    </span>
                    <span className="text-xs text-gray-500">
                      {post?.timeAgo || formatTime(post?.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-900 dark:text-gray-100 break-words leading-relaxed">
                    {post.content}
                  </p>
                </div>
              </div>
            )} */}

            {/* Comments list */}
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-500"></div>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm mb-2">Failed to load comments</p>
                <p className="text-xs text-gray-400 mb-3">
                  {error.message || "Something went wrong"}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => refetch()}
                  className="mt-2 text-blue-500 hover:text-blue-600"
                >
                  Try again
                </Button>
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">No comments yet.</p>
                <p className="text-xs mt-1">Be the first to comment!</p>
              </div>
            ) : (
              commentComponents
            )}
          </div>

          {/* Comment input */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
            <form
              onSubmit={handleSubmitComment}
              className="flex items-center space-x-3"
            >
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={userInfo?.avatar} alt={userInfo?.username} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs">
                  {userInfo?.username?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 relative">
                <input
                  ref={commentInputRef}
                  type="text"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full bg-transparent border-none outline-none placeholder-gray-500 text-sm py-2 pr-10 resize-none"
                  autoComplete="off"
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  disabled={!comment.trim() || isSubmitting}
                  className={cn(
                    "absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 transition-colors",
                    comment.trim() && !isSubmitting
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-400 cursor-not-allowed"
                  )}
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-500" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
