import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ICon from "./iconPick";
import PropTypes from "prop-types";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import formatTime from "../../utils/formatTime.util";
import { getCookie } from "../../utils/cookie.util";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "../../utils/localStorage.util";
import { useMutation, useLazyQuery, useSubscription } from "@apollo/client";
import { POST_COMMENT_MUTATION } from "../../graphql/mutations/comment.mutation";
import { GET_COMMENTS_QUERY } from "../../graphql/query/comment.query";
import { POSTING_COMMENT_SUBSCRIPTION } from "../../graphql/subscriptions/comment.subscription";

const ModalPost = ({ post }) => {
  const [arryTyms, setArryTyms] = useState([
    {
      img: post.user.avatar,
      username: post.user.full_name,
      comment: post.caption,
      created_at: formatTime(post.created_at),
      icon: <FavoriteBorderOutlinedIcon />,
    },
  ]);
  const [isLiked, setIsLiked] = useState(arryTyms.map(() => false));
  const [open, setOpen] = useState(false);
  // const [nofLike, setNofLike] = useState(0);
  const [clickHeart, setClickHeart] = useState(
    <FavoriteBorderOutlinedIcon sx={{ fontSize: "30px" }} />
  );
  const [value, setValue] = useState("");
  const [isPlaceholderVisible, setPlaceholderVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = getCookie("jwt-token");
    if (open && !jwtToken) {
      console.log(open);
      navigate("/login");
    }
  }, [navigate, open]);
  const user = getLocalStorage();

  const { data: commentPostedData } = useSubscription(
    POSTING_COMMENT_SUBSCRIPTION,
    {
      variables: {
        post_id: post.id,
        parent_id: null,
      },
      skip: !open,
    }
  );

  useEffect(() => {
    if (open && commentPostedData) {
      setArryTyms((prevArryTyms) => [
        ...prevArryTyms,
        {
          img: commentPostedData.commentPosted.user.avatar,
          username: commentPostedData.commentPosted.user.full_name,
          comment: commentPostedData.commentPosted.content,
          created_at: formatTime(commentPostedData.commentPosted.created_at),
          icon: <FavoriteBorderOutlinedIcon />,
        },
      ]);
    }
  }, [open, commentPostedData]);

  const [input, setInput] = useState({
    post_id: post.id,
    user_id: user?.user?.user_id,
    parent_id: null,
    content: "",
    media_urls: [], //media này không phải là ảnh của bài post mà là ảnh của người comment có thể là gif hay meme j đó.
  });
  const [postComment] = useMutation(POST_COMMENT_MUTATION);

  const [getComments, { data }] = useLazyQuery(GET_COMMENTS_QUERY, {
    fetchPolicy: "network-only",
  });
  useEffect(() => {
    if (!open) {
      return;
    }
    getComments({
      variables: {
        post_id: post.id,
      },
    });
  }, [open, getComments, post.id]);

  const prevCommentsRef = React.useRef([]);

  useEffect(() => {
    if (data && data?.getComments) {
      const updatedComments = data.getComments.map((comment) => ({
        img: comment?.user?.avatar,
        username: comment?.user?.full_name,
        comment: comment.content,
        created_at: formatTime(comment.created_at),
        icon: <FavoriteBorderOutlinedIcon />,
      }));
      if (
        JSON.stringify(prevCommentsRef.current) !==
        JSON.stringify(updatedComments)
      ) {
        setArryTyms((prevArryTyms) => [...prevArryTyms, ...updatedComments]);
        prevCommentsRef.current = updatedComments;
      }
    }
  }, [data]);

  const handleHeartClick = (index) => {
    const newLiked = [...isLiked];
    newLiked[index] = !newLiked[index];
    setIsLiked(newLiked);
  };

  // const newNofLike = () => {
  //   setNofLike((n) => n + 1);
  // };

  // const handleHeartClickBottom = () => {
  //   if (clickHeart.type === FavoriteBorderOutlinedIcon) {
  //     setClickHeart(
  //       <FavoriteOutlinedIcon sx={{ fontSize: "30px", color: "red" }} />
  //     );
  //     // newNofLike();
  //   } else {
  //     setClickHeart(<FavoriteBorderOutlinedIcon />);
  //     setNofLike(nofLike > 0 ? nofLike - 1 : 0);
  //   }
  // };

  const handleComment = (event) => {
    const value = event.target.value;
    setValue(value);

    if (value.trim() !== "") {
      setPlaceholderVisible(true);
    } else {
      setPlaceholderVisible(false);
    }
  };
  //Emoji

  const handleEmojiChange = (emoji) => {
    setValue((prevValue) => prevValue + emoji);
  };
  const handleInputClick = () => {
    setPlaceholderVisible(false);
  };

  const handlePostComment = async () => {
    try {
      const response = await postComment({
        variables: {
          input: {
            ...input,
            content: value,
          },
        },
      });
      if (response.data.postComment) {
        setValue("");
        setPlaceholderVisible(true);
      }
    } catch (error) {
      console.log("Post Comment Error:", error);
    }
  };

  const renderMedia = (url) => {
    const isVideo = url?.match(/\.(mp4|webm|ogg)$/i);
    return (
      <div className="mt-3 flex justify-center">
        {isVideo ? (
          <video
            controls
            className="rounded-lg w-full  h-full aspect-[4/5] object-cover shadow-md"
          >
            <source src={url} type="video/mp4" />
          </video>
        ) : (
          <div className="w-full  h-full rounded-lg object-cover overflow-hidden shadow-md mt-3 flex justify-center">
            <img
              className="w-full  h-full rounded-lg object-cover"
              src={url}
              alt=""
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        className="bg-transparent text-gray-500 shadow-none"
      >
        <ModeCommentOutlinedIcon />
      </Button>
      <Modal
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1300}
        footer={null}
      >
        <div className="flex p-4">
          <div className="flex-1 pr-5">
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
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                className="w-full max-w-md"
              >
                {post.media_urls.map((media, index) => (
                  <SwiperSlide key={index}>{renderMedia(media)}</SwiperSlide>
                ))}
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
              </Swiper>
            ) : (
              renderMedia(post.media_urls[0])
            )}
          </div>
          <div className="container-body-modal ">
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center" id={user?.user?.user_id}>
                <div className="mr-3">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={user?.user?.avatar}
                    alt=""
                  />
                </div>
                <div>
                  <span className="font-bold text-base">
                    {user?.user?.full_name}
                  </span>
                </div>
              </div>
              <div className="cursor-pointer">
                <ListOutlinedIcon sx={{ fontSize: "30px" }} />
              </div>
            </div>
            <div className="flex flex-col overflow-y-auto h-[300px]">
              {arryTyms.map((item, index) => (
                <div className="comment-container pt-[4px]" key={index}>
                  <div className="flex items-center mb-8">
                    <div className="mr-3">
                      <img
                        src={item.img}
                        className="w-8 h-8 rounded-full"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">{item?.username}</span>
                      <p className="text-sm break-words">{item.comment}</p>
                      <div className="flex gap-2.5 text-sm">
                        <div>{item.created_at}</div>
                        <div>See translation</div>
                      </div>
                    </div>
                    <div
                      className="ml-auto cursor-pointer mr-[15px]"
                      onClick={() => handleHeartClick(index)}
                    >
                      {isLiked[index] ? (
                        <FavoriteOutlinedIcon
                          sx={{ fontSize: "20px", color: "red" }}
                        />
                      ) : (
                        <FavoriteBorderOutlinedIcon sx={{ fontSize: "20px" }} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="body-post-comment">
              <div className="mt-4">
                <div className="flex justify-between mb-2">
                  <div className="flex gap-2.5">
                    <div
                      className="cursor-pointer mt-[2px]"
                      // onClick={handleHeartClickBottom}
                    >
                      {clickHeart}
                    </div>
                    <div className="cursor-pointer">
                      <MapsUgcOutlinedIcon sx={{ fontSize: "30px" }} />
                    </div>
                    <div className="cursor-pointer">
                      <ShareRoundedIcon sx={{ fontSize: "30px" }} />
                    </div>
                  </div>

                  <div className="flex gap-2.5">
                    <BookmarkBorderOutlinedIcon />
                  </div>
                </div>

                {/* <div className="font-bold mb-2">{nofLike} Likes</div> */}
                <div className="text-gray-500 text-base">
                  <div>{`${new Date().toLocaleString("en-US", {
                    month: "long",
                  })} ${new Date().getDate()}`}</div>
                </div>
              </div>

              <div className="flex justify-between mt-4 items-center">
                <div className="flex items-center gap-2.5">
                  <div className="choose-icon">
                    <ICon onEmojiChange={handleEmojiChange} />
                  </div>
                  <div style={{ width: "300px" }}>
                    <input
                      className="w-full h-10 border-none rounded-full bg-gray-100 p-3 focus:outline-none"
                      type="text"
                      value={value}
                      onChange={handleComment}
                      onClick={handleInputClick}
                      placeholder={isPlaceholderVisible ? "Add a comment" : ""}
                    />
                  </div>
                </div>

                <div className="ml-[15px]">
                  {value ? (
                    <button
                      style={{
                        color: "#1880af",
                        border: "none",
                        background: "rgba(35, 32, 32, 0)",
                      }}
                      onClick={handlePostComment}
                    >
                      Post
                    </button>
                  ) : (
                    <button
                      style={{
                        color: "#9595a2",
                        border: "none",
                        background: "#23202000",
                      }}
                      disabled
                    >
                      Post
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

ModalPost.propTypes = {
  post: PropTypes.object.isRequired,
};

export default ModalPost;
