import React, { memo, useState, useMemo } from "react";
import { Heart, MessageCircle, Play } from "lucide-react";
import { useQuery } from "@apollo/client";
import CommentModal from "../comment/CommentModal.jsx";
import formatTime from "../../utils/formatTime.util";
import { GET_COMMENT_COUNT_QUERY } from "../../graphql/query/comment.query";

const PostGrid = memo(({ posts, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4 p-4 max-lg:grid-cols-2 max-md:grid-cols-1">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="w-full h-[350px] bg-gray-300 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="flex justify-center p-20">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 rounded"></div>
          </div>
          <h1 className="font-bold text-3xl text-gray-900 dark:text-white">
            No Posts Yet
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            When you create posts, they will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-4 max-lg:grid-cols-2 max-md:grid-cols-1">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
});

const PostCard = memo(({ post }) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isVideo = post.media_urls && post.media_urls[0]?.includes(".mp4");

  // Calculate likes count from interaction array
  const likesCount = post.interaction ? post.interaction.length : 0;

  // Only fetch comment count when hovered for better performance
  const { data: commentData } = useQuery(GET_COMMENT_COUNT_QUERY, {
    variables: { post_id: post.id },
    skip: !post.id || !isHovered, // Only fetch when hovered
    fetchPolicy: "cache-first",
  });

  const commentsCount = commentData?.getComments?.length || 0;

  const handlePostClick = () => {
    setIsCommentModalOpen(true);
  };

  return (
    <>
      <div
        className="relative w-full h-[350px] rounded-lg shadow-lg cursor-pointer overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Media */}
        <img
          src={post?.media_urls[0]}
          alt="Post"
          className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-75"
          onClick={handlePostClick}
        />

        {/* Video indicator */}
        {isVideo && (
          <div className="absolute top-2 right-2">
            <Play className="h-5 w-5 text-white" fill="white" />
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30">
          <div className="flex items-center space-x-6 text-white">
            <div className="flex items-center space-x-2 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 ease-out">
              <Heart className="h-6 w-6" fill="white" />
              <span className="font-semibold">{likesCount}</span>
            </div>
            <div className="flex items-center space-x-2 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 ease-out delay-75">
              <MessageCircle className="h-6 w-6" fill="white" />
              <span className="font-semibold">{commentsCount}</span>
            </div>
          </div>
        </div>

        {/* Click overlay to open modal */}
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={handlePostClick}
        />
      </div>

      {/* Comment Modal */}
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        post={{
          ...post,
          content: post.caption,
          media: post.media_urls,
          createdAt: post.created_at,
          timeAgo: post.created_at ? formatTime(post.created_at) : "now",
          interaction: { length: likesCount }, // Format for CommentModal compatibility
        }}
      />
    </>
  );
});

PostCard.displayName = "PostCard";
PostGrid.displayName = "PostGrid";

export default PostGrid;
