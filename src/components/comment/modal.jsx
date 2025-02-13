import React, { useState } from "react";
import { Button, Modal } from "antd";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import Avatar from "../../assets/img1.png";
import Image from "../../assets/img2.png";
import ICon from "./iconPick";

const ModalPost = () => {
  const arryTyms = [
    {
      img: Avatar,
      username: "Alo",
      small: "aloalaolao",
      icon: <FavoriteBorderOutlinedIcon />,
    },
    {
      img: Avatar,
      username: "Alo",
      small: "aloalaolao",
      icon: <FavoriteBorderOutlinedIcon />,
    },
    {
      img: Avatar,
      username: "Alo",
      small: "aloalaolao",
      icon: <FavoriteBorderOutlinedIcon />,
    },
    {
      img: Avatar,
      username: "Alo",
      small: "aloalaolao",
      icon: <FavoriteBorderOutlinedIcon />,
    },
    {
      img: Avatar,
      username: "Alo",
      small: "aloalaolao",
      icon: <FavoriteBorderOutlinedIcon />,
    },
    {
      img: Avatar,
      username: "Alo",
      small: "aloalaolao",
      icon: <FavoriteBorderOutlinedIcon />,
    },
    {
      img: Avatar,
      username: "Alo",
      small: "aloalaolao",
      icon: <FavoriteBorderOutlinedIcon />,
    },
    {
      img: Avatar,
      username: "Alo",
      small: "aloalaolao",
      icon: <FavoriteBorderOutlinedIcon />,
    },
  ];

  const [isLiked, setIsLiked] = useState(arryTyms.map(() => false));
  const [open, setOpen] = useState(false);
  const [nofLike, setNofLike] = useState(123156);
  const [clickHeart, setClickHeart] = useState(
    <FavoriteBorderOutlinedIcon sx={{ fontSize: "30px" }} />
  );
  const [value, setValue] = useState("");
  const [isPlaceholderVisible, setPlaceholderVisible] = useState(true);

  const handleHeartClick = (index) => {
    const newLiked = [...isLiked];
    newLiked[index] = !newLiked[index];
    setIsLiked(newLiked);
  };

  const newNofLike = () => {
    setNofLike((n) => n + 1);
  };

  const handleHeartClickBottom = () => {
    if (clickHeart.type === FavoriteBorderOutlinedIcon) {
      setClickHeart(
        <FavoriteOutlinedIcon sx={{ fontSize: "30px", color: "red" }} />
      );
      newNofLike();
    } else {
      setClickHeart(<FavoriteBorderOutlinedIcon />);
      setNofLike(nofLike > 0 ? nofLike - 1 : 0);
    }
  };

  const handleComment = (event) => {
    const value = event.target.value;
    setValue(value);

    if (value.trim !== "") {
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
      >
        <div className="flex p-4">
          <div className="flex-1 pr-5">
            <img
              className="w-full  h-full rounded-lg object-cover"
              src={Image}
              alt=""
            />
          </div>
          <div className="container-body-modal ">
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center">
                <div className="mr-3">
                  <img className="w-12 h-12 rounded-full" src={Avatar} alt="" />
                </div>
                <div>
                  <span className="font-bold text-base">Alalo</span>
                </div>
              </div>
              <div className="cursor-pointer">
                <ListOutlinedIcon sx={{ fontSize: "30px" }} />
              </div>
            </div>
            <div className=" flex  flex-col overflow-y-auto h-[300px]  ">
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
                      <span className="font-bold">{item.username}</span>
                      <p className="text-sm">{item.small}</p>
                      <div className="flex gap-2.5 text-sm">
                        <div>1m</div>
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
            <div className=" body-post-comment">
              <div className="mt-4">
                <div className="flex justify-between mb-2">
                  <div className="flex gap-2.5">
                    <div
                      className="cursor-pointer mt-[2px]"
                      onClick={handleHeartClickBottom}
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

                <div className="font-bold mb-2">{nofLike} Likes</div>
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

export default ModalPost;
