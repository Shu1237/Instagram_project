import React, { useState, useCallback, memo } from "react";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import CommentModal from "../comment/CommentModal";
import { useAuth } from "../../hooks/useAuth";

// Memoized PostHeader component
const PostHeader = memo(({ user, onOptionsClick }) => (
  <div className="flex items-center justify-between p-3">
    <div className="flex items-center space-x-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={user?.avatar} alt={user?.username} />
        <AvatarFallback>{user?.username?.[0]?.toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-900">
          {user?.username}
        </span>
        <span className="text-xs text-gray-500">{user?.location}</span>
      </div>
    </div>
    <Button
      variant="ghost"
      size="icon"
      onClick={onOptionsClick}
      className="h-8 w-8"
    >
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  </div>
));
PostHeader.displayName = "PostHeader";

// Memoized PostActions component
const PostActions = memo(
  ({ isLiked, onLike, onComment, onShare, onBookmark, isBookmarked }) => (
    <div className="flex items-center justify-between p-3">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onLike}
          className={cn(
            "h-8 w-8 transition-colors",
            isLiked
              ? "text-red-500 hover:text-red-600"
              : "text-gray-700 hover:text-gray-900"
          )}
        >
          <Heart className={cn("h-6 w-6", isLiked && "fill-current")} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onComment}
          className="h-8 w-8 text-gray-700 hover:text-gray-900"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onShare}
          className="h-8 w-8 text-gray-700 hover:text-gray-900"
        >
          <Send className="h-6 w-6" />
        </Button>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onBookmark}
        className={cn(
          "h-8 w-8 transition-colors",
          isBookmarked ? "text-gray-900" : "text-gray-700 hover:text-gray-900"
        )}
      >
        <Bookmark className={cn("h-6 w-6", isBookmarked && "fill-current")} />
      </Button>
    </div>
  )
);
PostActions.displayName = "PostActions";

// Memoized PostContent component
const PostContent = memo(({ content, likesCount, timeAgo }) => (
  <div className="px-3 pb-3">
    <div className="mb-2">
      <span className="text-sm font-semibold text-gray-900">
        {likesCount.toLocaleString()} likes
      </span>
    </div>
    {content && (
      <div className="mb-2">
        <span className="text-sm text-gray-900">{content}</span>
      </div>
    )}
    <div className="text-xs text-gray-500 uppercase tracking-wide">
      {timeAgo}
    </div>
  </div>
));
PostContent.displayName = "PostContent";

// Optimized image component with lazy loading
const PostImage = memo(({ images, alt }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative aspect-square bg-gray-100">
      {/* Loading skeleton */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      <img
        src={images[currentImageIndex]}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          imageLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setImageLoaded(true)}
        loading="lazy"
      />

      {/* Image indicators for multiple images */}
      {images.length > 1 && (
        <>
          <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            {currentImageIndex + 1}/{images.length}
          </div>

          {/* Navigation dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
});
PostImage.displayName = "PostImage";

// Main Post component
const PostCard = memo(({ post, isLiked, onLike }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [likesCount, setLikesCount] = useState(post?.interaction?.length || 0);
  const { isAuthenticated, requireAuth } = useAuth();

  const handleComment = useCallback(() => {
    requireAuth(() => {
      setIsCommentModalOpen(true);
    })();
  }, [requireAuth]);

  const handleShare = useCallback(() => {
    requireAuth(() => {
      // Add your share logic here
      console.log("Share clicked for post:", post?.id);
    })();
  }, [post?.id, requireAuth]);

  const handleBookmark = useCallback(() => {
    requireAuth(() => {
      setIsBookmarked((prev) => !prev);
      // Add your bookmark logic here
    })();
  }, [requireAuth]);

  const handleLike = useCallback(() => {
    requireAuth(() => {
      if (onLike) {
        onLike(post?.id);
      }
      setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    })();
  }, [onLike, post?.id, isLiked, requireAuth]);

  const handleOptions = useCallback(() => {
    // Add your options logic here
    console.log("Options clicked for post:", post?.id);
  }, [post?.id]);

  return (
    <>
      <Card className="w-full max-w-lg mx-auto mb-6 border-0 shadow-sm">
        <PostHeader user={post?.user} onOptionsClick={handleOptions} />

        <PostImage
          images={post?.media || post?.images || []}
          alt={`Post by ${post?.user?.username}`}
        />

        <PostActions
          isLiked={isLiked}
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleShare}
          onBookmark={handleBookmark}
          isBookmarked={isBookmarked}
        />

        <PostContent
          content={post?.content}
          likesCount={likesCount}
          timeAgo={post?.timeAgo || "1h"}
        />
      </Card>

      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        post={post}
      />
    </>
  );
});

PostCard.displayName = "PostCard";

export default PostCard;
