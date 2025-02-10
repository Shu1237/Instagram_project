import React, { useState, useEffect, useRef } from "react";
import imagePost from "../../assets/img2.png";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ModalPost from '../comment/modal'
import { useQuery } from "@apollo/client"
import { GET_POST_QUERY } from "../../graphql/query/post.query";
import "swiper/css";
import "./swiper.css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

function Post() {
  const [comment, setComment] = useState("");
  const clickOutsideRef = useRef(null);
  const [isPlaceholderVisible, setPlaceholderVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [nofLike, setNofLike] = useState(123156);
  const [clickHeart, setClickHeart] = useState(<FavoriteBorderOutlinedIcon sx={{ fontSize: "30px" }} />);
  const { data, loading, error } = useQuery(GET_POST_QUERY);
  //up + 1
  const newNofLike = () => {
    setNofLike(n => n + 1);
  };
  const handleHeartClick = () => {
    if (clickHeart.type === FavoriteBorderOutlinedIcon) {
      setClickHeart(<FavoriteOutlinedIcon sx={{ fontSize: "30px", color: "red" }} />);
      newNofLike();  // +1
    } else {
      setClickHeart(<FavoriteBorderOutlinedIcon sx={{ fontSize: "30px" }} />);
      setNofLike(nofLike > 0 ? nofLike - 1 : 0);
    }
  };


  // Change input
  const handleCommentChange = (event) => {
    const value = event.target.value;
    setComment(value);

    if (value.trim() !== "") {
      setIsOpen(true); // Open post
    } else {
      setIsOpen(false); // Hide post
      setPlaceholderVisible(true);
    }
  };

  // Click input
  const handleInputClick = () => {
    if (comment.trim() !== "") {
      setIsOpen(true);
    }
    setPlaceholderVisible(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (clickOutsideRef.current && !clickOutsideRef.current.contains(event.target)) {
        setPlaceholderVisible(true);
      }
    };

    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.getPosts.map((post) => {
        const postDate = new Date(parseInt(post.created_at));
        const now = new Date();
        const timeDiff = Math.abs(now - postDate);

        const secondsDiff = Math.floor(timeDiff / 1000);
        const minutesDiff = Math.floor(timeDiff / (1000 * 60));
        const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));

        let timeAgo;
        if (secondsDiff < 60) {
          timeAgo = `${secondsDiff} seconds ago`;
        } else if (minutesDiff < 60) {
          timeAgo = `${minutesDiff} minutes ago`;
        } else if (hoursDiff < 24) {
          timeAgo = `${hoursDiff} hours ago`;
        } else {
          timeAgo = postDate.toLocaleString(); // Hiển thị ngày tháng đầy đủ nếu > 24h
        }
        return (
          <div key={post.id} className="w-full mb-[40px] border-b pb-[20px]">
            <div className="w-full flex items-center gap-[10px]">
              <img className="w-[42px] h-[40px] rounded-full" src={post.user.avatar} alt="" />
              <div className="text-[12px] font-semibold">{post.user.full_name}</div>
              <div className="text-[#999999] text-[14px]">{timeAgo}</div>
            </div>

            {/* Swiper chỉnh sửa */}
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
                  <div className="mt-[10px]">
                    <img className="w-full" src={media} alt="" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="w-full py-[5px] flex justify-between items-center">
              <div className="flex gap-[15px] items-center">
                <div onClick={handleHeartClick} className="text-[30px] mb-[8px] cursor-pointer ease-in duration-300 transform hover:scale-110">
                  {clickHeart}
                </div>
                <ModalPost />
                <ShareOutlinedIcon sx={{ fontSize: "30px" }} />
              </div>
              <div className="text-[30px]">
                <BookmarkBorderOutlinedIcon />
              </div>
            </div>

            <div className="w-full">
              <div className="relative">
                <img className="w-[25px] h-[20px] rounded-full absolute" src={imagePost} alt="" />
                <img className="w-[25px] h-[20px] rounded-full absolute left-[3%]" src={imagePost} alt="" />
              </div>
              <div className="text-[15px] font-semibold absolute ml-[45px]">{nofLike} likes</div>
            </div>

            <div className="w-full mt-[30px] flex">
              <div className="text-[15px] font-semibold">{post.user.full_name}</div>
              <div className="text-[15px] text-[#999999] ml-[10px]">{post.caption}</div>
            </div>

            <div className="text-[#999999] mt-[5px] text-[15px]">View all 878 comments</div>

            <div className="flex justify-between mt-[5px] text-[#999999] text-[15px]" ref={clickOutsideRef}>
              <input
                value={comment}
                onChange={handleCommentChange}
                onClick={handleInputClick}
                placeholder={isPlaceholderVisible ? "Add a comment..." : ""}
                className="border-none outline-none w-full py-[8px] text-[14px]"
              />
              {isOpen && comment.trim() !== "" && (
                <button className="bg-[#0095f6] text-white p-[8px_12px] rounded-[4px] cursor-pointer text-[14px] hover:bg-[#0073e6]">
                  Post
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Post;
