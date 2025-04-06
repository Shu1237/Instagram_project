import React, { useState, useEffect, useRef } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ModalPost from "../comment/modal";
import { useQuery, useMutation } from "@apollo/client";
import { GET_POST_QUERY } from "../../graphql/query/post.query";
import { LIKE_POST_MUTATION } from "../../graphql/mutations/post.mutation";
import { getLocalStorage } from "../../utils/localStorage.util";
import "swiper/css";
import "./swiper.css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import formatTime from "../../utils/formatTime.util";
import loadingEffect from "../ui/jsx/loading-effect";
import { Navigate, useNavigate } from "react-router-dom";
function Post() {
  const [comment, setComment] = useState("");
  const clickOutsideRef = useRef(null);
  const [isPlaceholderVisible, setPlaceholderVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [likedMap, setLikedMap] = useState({});
  const [interactionCountMap, setInteractionCountMap] = useState({});
  const [page, setPage] = useState(1);
  const observerRef = useRef(null);
  const isFetching = useRef(false);
  const navigate = useNavigate();
  const { data, loading, error, fetchMore } = useQuery(GET_POST_QUERY, {
    variables: { page },
    fetchPolicy: "network-only",
  });
  useEffect(() => {
    if (data?.getPosts) {
      const newCounts = {};
      data.getPosts.forEach((post) => {
        newCounts[post.id] = post.interaction.length;
      });
      setInteractionCountMap((prev) => ({ ...prev, ...newCounts }));
    }
  }, [data]);

  // Xử lý khi bấm vào nút tim
  const [likePost] = useMutation(LIKE_POST_MUTATION);
  const likeTimeout = useRef({}); // chứa timeout cho từng post

  const handleHeartClick = (postId, userId) => {
    console.log(userId);
    if (!userId) {
      navigate("/login");
      return;
    }
    // Toggle liked UI ngay
    setLikedMap((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));

    setInteractionCountMap((prev) => ({
      ...prev,
      [postId]: prev[postId] + (likedMap[postId] ? -1 : 1),
    }));

    // Nếu đã có timeout trước đó => xóa
    if (likeTimeout.current[postId]) {
      clearTimeout(likeTimeout.current[postId]);
    }

    // Debounce 500ms
    likeTimeout.current[postId] = setTimeout(async () => {
      try {
        await likePost({
          variables: {
            likePostId: postId,
            userId: userId,
          },
        });
      } catch (err) {
        console.error("Lỗi like bài viết:", err);
      }
    }, 500);
  };

  const user = getLocalStorage();
  // console.log(user_id);
  // Xử lý khi thay đổi comment
  const handleCommentChange = (event) => {
    const value = event.target.value;
    setComment(value);
    setIsOpen(value.trim() !== "");
  };

  // Xử lý khi click vào ô input
  const handleInputClick = () => {
    setPlaceholderVisible(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        clickOutsideRef.current &&
        !clickOutsideRef.current.contains(event.target)
      ) {
        setPlaceholderVisible(true);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      // console.log(
      //   "Intersection Observer đã được khởi tạo!",
      //   observerRef.current
      // );
      if (isFetching.current) return; // Nếu đang fetch thì không làm gì cả
      if (!observerRef.current) return;
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            // console.log("Intersection Observer kích hoạt!");
            isFetching.current = true;
            fetchMore({
              variables: { page: page + 1 },
              updateQuery: (prev, { fetchMoreResult }) => {
                // console.log("Previous posts:", prev);
                if (!fetchMoreResult) return prev;
                console.log("FetchMoreResult posts:", fetchMoreResult);
                return {
                  getPosts: [...fetchMoreResult.getPosts],
                };
              },
            }).finally(() => {
              isFetching.current = false;
              setPage((prevPage) => prevPage + 1);
            });
          }
        },
        {
          rootMargin: "100px",
          threshold: 1.0,
        }
      );
      observer.observe(observerRef.current);
      return () => {
        observer.unobserve(observerRef.current);
      };
    }, 1000);
  }, [page, fetchMore]);

  if (loading) return <p>Loading...</p>;

  // if (error) return <p>Error: {error.message}</p>;
  const renderMedia = (url) => {
    const isVideo = url?.match(/\.(mp4|webm|ogg)$/i);
    return (
      <div className="mt-3 flex justify-center">
        {isVideo ? (
          <video
            controls
            className="rounded-lg w-[90%] max-w-[500px] aspect-[4/5] object-cover shadow-md"
          >
            <source src={url} type="video/mp4" />
          </video>
        ) : (
          <div className="w-[90%] max-w-[500px] overflow-hidden rounded-lg shadow-md">
            <img
              className="w-full aspect-[4/5] object-cover"
              src={url}
              alt=""
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {data?.getPosts?.length > 0 ? (
        <>
          {data.getPosts.map((post) => {
            const isLiked = post.interaction.some(
              (inter) => inter == user?.user?.user_id
            );
            let timeAgo;
            timeAgo = formatTime(post?.created_at);
            return (
              <div
                key={post.id}
                className="w-full mb-[40px] border-b pb-[20px]"
              >
                <div className="w-full flex items-center gap-[10px]">
                  <img
                    className="w-[42px] h-[40px] rounded-full"
                    src={post.user.avatar}
                    alt=""
                  />
                  <div className="text-[12px] font-semibold">
                    {post.user.full_name}
                  </div>
                  <div className="text-[#999999] text-[14px]">{timeAgo}</div>
                </div>

                {post.media_urls.length > 0 ? (
                  <Swiper
                    effect="coverflow"
                    centeredSlides={true}
                    coverflowEffect={{
                      rotate: 0,
                      stretch: 0,
                      depth: 100,
                      modifier: 2.5,
                      slideShadows: false,
                    }}
                    pagination={{ clickable: true }}
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    navigation={true}
                    className="w-full max-w-md"
                  >
                    {post.media_urls.map((media, index) => (
                      <SwiperSlide key={index}>
                        {renderMedia(media)}
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  renderMedia(post.media_urls[0])
                )}

                <div className="w-full py-[5px] flex justify-between items-center">
                  <div className="flex gap-[15px] items-center">
                    <div
                      onClick={() => {
                        handleHeartClick(post.id, user?.user?.user_id);
                      }}
                      className="text-[30px] mb-[8px] cursor-pointer ease-in duration-300 transform hover:scale-110"
                    >
                      {likedMap[post.id] ?? isLiked ? (
                        <FavoriteOutlinedIcon
                          sx={{ fontSize: "30px", color: "red" }}
                        />
                      ) : (
                        <FavoriteBorderOutlinedIcon sx={{ fontSize: "30px" }} />
                      )}
                    </div>
                    <ModalPost post={post} />
                    <ShareOutlinedIcon sx={{ fontSize: "30px" }} />
                  </div>
                  <div className="text-[30px]">
                    <BookmarkBorderOutlinedIcon />
                  </div>
                </div>
                <div className="w-full text-[15px] font-semibold">
                  {post?.caption}
                </div>
                <div className="w-full text-[15px] font-semibold">
                  {interactionCountMap[post.id] || 0} likes
                </div>

                <div
                  className="flex mt-[5px] text-[#999999] text-[15px]"
                  ref={clickOutsideRef}
                >
                  <input
                    value={comment}
                    onChange={handleCommentChange}
                    onClick={handleInputClick}
                    placeholder={isPlaceholderVisible ? "Add a comment..." : ""}
                    className="border-none outline-none w-full py-[8px] text-[14px]"
                  />
                  {isOpen && (
                    <button className="bg-[#0095f6] text-white p-[8px_12px] rounded-[4px] cursor-pointer text-[14px] hover:bg-[#0073e6]">
                      Post
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          <div key={page} ref={observerRef} className="h-10" />
        </>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}

export default Post;
