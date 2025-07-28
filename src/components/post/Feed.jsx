import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_POST_QUERY } from "../../graphql/query/post.query";
import { LIKE_POST_MUTATION } from "../../graphql/mutations/post.mutation";
import { getLocalStorage } from "../../utils/localStorage.util";
import formatTime from "../../utils/formatTime.util";
import PostCard from "./PostCard";
import { Spinner } from "../ui/spinner";

// Virtual scrolling hook for performance
const useVirtualScrolling = (items, containerHeight = 600) => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [scrollTop, setScrollTop] = useState(0);

  const itemHeight = 400; // Approximate height per post
  const overscan = 2; // Number of items to render outside viewport

  useEffect(() => {
    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / itemHeight) - overscan
    );
    const endIndex = Math.min(
      items.length,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );

    setVisibleItems(
      items.slice(startIndex, endIndex).map((item, index) => ({
        ...item,
        index: startIndex + index,
      }))
    );
  }, [items, scrollTop, containerHeight]);

  return { visibleItems, setScrollTop };
};

// Intersection Observer hook for infinite scroll
const useIntersectionObserver = (callback, options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [callback, options]);

  return ref;
};

const Feed = () => {
  const navigate = useNavigate();

  // Stable reference for userInfo to prevent infinite re-renders
  const [userInfo, setUserInfo] = useState(() => getLocalStorage()?.user);
  const userInfoRef = useRef(userInfo);

  // Update refs when userInfo changes
  useEffect(() => {
    userInfoRef.current = userInfo;
  }, [userInfo]);

  // Update userInfo when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const newUserInfo = getLocalStorage()?.user;
      setUserInfo(newUserInfo);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // State management
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [interactionCounts, setInteractionCounts] = useState({});

  // GraphQL
  const { data, loading, error, fetchMore } = useQuery(GET_POST_QUERY, {
    variables: { page: 1 },
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  const [likePost] = useMutation(LIKE_POST_MUTATION);

  // Update posts when data changes
  useEffect(() => {
    if (data?.getPosts) {
      // Directly use the posts from GraphQL instead of merging
      setPosts(data.getPosts);

      // Initialize liked posts based on user interactions
      const userLikes = new Set();
      const newCounts = {};

      data.getPosts.forEach((post) => {
        newCounts[post.id] = post.interaction?.length || 0;
        // Check if current user has liked this post
        if (userInfo?.user_id && post.interaction?.includes(userInfo.user_id)) {
          userLikes.add(post.id);
        }
      });

      setLikedPosts(userLikes);
      setInteractionCounts(newCounts);
    }
  }, [data, userInfo?.user_id]); // Stable dependency

  // Infinite scroll callback
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      const result = await fetchMore({
        variables: { page: page + 1 },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult || fetchMoreResult.getPosts.length === 0) {
            setHasMore(false);
            return prev;
          }

          setPage((p) => p + 1);
          return {
            getPosts: [...prev.getPosts, ...fetchMoreResult.getPosts],
          };
        },
      });
    } catch (error) {
      console.error("Error loading more posts:", error);
    }
  }, [fetchMore, loading, hasMore, page]);

  // Intersection observer for infinite scroll
  const lastPostRef = useIntersectionObserver(loadMore, {
    threshold: 0.1,
  });

  // Like post handler with debouncing
  const handleLikePost = useCallback(
    async (postId) => {
      const currentUserInfo = userInfoRef.current;
      if (!currentUserInfo?.user_id) {
        navigate("/login");
        return;
      }

      // Optimistic update
      const isLiked = likedPosts.has(postId);
      setLikedPosts((prev) => {
        const newSet = new Set(prev);
        if (isLiked) {
          newSet.delete(postId);
        } else {
          newSet.add(postId);
        }
        return newSet;
      });

      setInteractionCounts((prev) => ({
        ...prev,
        [postId]: prev[postId] + (isLiked ? -1 : 1),
      }));

      try {
        await likePost({
          variables: {
            likePostId: postId,
            userId: currentUserInfo.user_id,
          },
        });
      } catch (error) {
        // Revert optimistic update on error
        setLikedPosts((prev) => {
          const newSet = new Set(prev);
          if (isLiked) {
            newSet.add(postId);
          } else {
            newSet.delete(postId);
          }
          return newSet;
        });

        setInteractionCounts((prev) => ({
          ...prev,
          [postId]: prev[postId] + (isLiked ? 1 : -1),
        }));

        console.error("Error liking post:", error);
      }
    },
    [likePost, likedPosts, navigate]
  );

  // Error handling
  if (error && !posts.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Something went wrong. Please try again.</p>
      </div>
    );
  }

  // Loading state for initial load
  if (loading && !posts.length) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-white rounded-xl shadow-sm border">
              {/* Header skeleton */}
              <div className="flex items-center p-3 space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full" />
                <div className="flex-1">
                  <div className="w-24 h-3 bg-gray-200 rounded mb-1" />
                  <div className="w-16 h-2 bg-gray-200 rounded" />
                </div>
              </div>

              {/* Image skeleton */}
              <div className="aspect-square bg-gray-200" />

              {/* Actions skeleton */}
              <div className="p-3 space-y-2">
                <div className="flex space-x-4">
                  <div className="w-6 h-6 bg-gray-200 rounded" />
                  <div className="w-6 h-6 bg-gray-200 rounded" />
                  <div className="w-6 h-6 bg-gray-200 rounded" />
                </div>
                <div className="w-20 h-3 bg-gray-200 rounded" />
                <div className="w-full h-3 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6">
      {posts.map((post, index) => {
        const isLiked = likedPosts.has(post.id);
        const likesCount = interactionCounts[post.id] || 0;
        const timeAgo = post.created_at ? formatTime(post.created_at) : "now";

        return (
          <div
            key={post.id}
            ref={index === posts.length - 1 ? lastPostRef : null}
          >
            <PostCard
              post={{
                ...post,
                content: post.caption,
                media: post.media_urls,
                createdAt: post.created_at,
                timeAgo,
                interaction: { length: likesCount },
              }}
              isLiked={isLiked}
              onLike={() => handleLikePost(post.id)}
            />
          </div>
        );
      })}

      {/* Loading indicator for infinite scroll */}
      {loading && posts.length > 0 && (
        <div className="flex justify-center py-4">
          <Spinner className="w-6 h-6" />
        </div>
      )}

      {/* End of feed message */}
      {!hasMore && posts.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">You&apos;re all caught up!</p>
        </div>
      )}
    </div>
  );
};

export default Feed;
