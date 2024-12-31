import React, { useState } from "react";
import { Button, Modal } from "antd";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import "../css/modal.css";
import Image from "../../../assets/img2.png";
import Image2 from "../../../assets/img4.png";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Avatar from "../../../assets/img1.png";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import IconPicker from "../jsx/iconPick";
import { colors } from "@mui/material";

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
  ];

  const [isLiked, setIsLiked] = useState(arryTyms.map(() => false)); // save status
  const [open, setOpen] = useState(false);

  const handleHeartClick = (index) => {
    const newLiked = [...isLiked]; //copy
    newLiked[index] = !newLiked[index]; //=> true
    setIsLiked(newLiked); // save
  };

  const [nofLike, setNofLike] = useState(123156);
  const [clickHeart, setClickHeart] = useState(
    <FavoriteBorderOutlinedIcon sx={{ fontSize: "30px" }} />
  );

  //up + 1
  const newNofLike = () => {
    setNofLike((n) => n + 1);
  };
  const handleHeartClickBottom = () => {
    if (clickHeart.type === FavoriteBorderOutlinedIcon) {
      setClickHeart(<FavoriteOutlinedIcon />);
      newNofLike(); // +1
    } else {
      setClickHeart(<FavoriteBorderOutlinedIcon />);
      setNofLike(nofLike > 0 ? nofLike - 1 : 0);
    }
  };

  const [value, setValue] = useState("");
  const [post, setPost] = useState(false);
  const [isPlaceholderVisible, setPlaceholderVisible] = useState(true);
  const handleComment = (event) => {
    const value = event.target.value;
    setValue(value);

    if (value.trim !== "") {
      setPost(true);
    } else {
      setPost(false);
      setPlaceholderVisible(true);
    }
  };
  const handleInputClick = () => {
    if (value.trim() !== "") {
      setPost(true);
    }
    setPlaceholderVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        className="button-comment"
      >
        <ModeCommentOutlinedIcon />
      </Button>
      <Modal
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1180}
      >
        <div className="container">
          <div className="image">
            <img className="picture" src={Image} alt="" />
            <img className="picture" src={Image2} alt="" />
          </div>
          <div className="comment-container">
            <div className="header">
              <div className="left-corner">
                <div className="img-header">
                  <img className="avatar" src={Avatar} alt="" />
                </div>
                <div className="text">
                  <span className="username">Alalo</span>
                </div>
              </div>
              <div className="right-corner">
                <ListOutlinedIcon sx={{ fontSize: "30px" }} />
              </div>
            </div>

            {arryTyms.map((item, index) => (
              <div className="comment-container" key={index}>
                <div className="body">
                  <div className="img-bottom">
                    <img src={item.img} className="avatar" alt="" />
                  </div>
                  <div className="text">
                    <span className="username">{item.username}</span>
                    <p>Aloalo</p>
                    <div className="small">
                      <div>1m</div>
                      <div>See translation</div>
                    </div>
                  </div>
                  <div
                    className="icon-heart"
                    onClick={() => handleHeartClick(index)}
                  >
                    {isLiked[index] ? (
                      <FavoriteOutlinedIcon sx={{ fontSize: "30px" }} />
                    ) : (
                      <FavoriteBorderOutlinedIcon sx={{ fontSize: "30px" }} />
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="emotion">
              <div className="icon">
                <div className="icon-left">
                  <div className="heart" onClick={handleHeartClickBottom}>
                    {clickHeart}
                  </div>
                  <div className="comment">
                    <MapsUgcOutlinedIcon sx={{ fontSize: "30px" }} />
                  </div>
                  <div className="share">
                    <ShareRoundedIcon sx={{ fontSize: "30px" }} />
                  </div>
                </div>

                <div className="icon-right">
                  <BookmarkBorderOutlinedIcon />
                </div>
              </div>

              <div className="nof-like">{nofLike} Likes</div>
              <div className="date">
                <div>{`${new Date().toLocaleString("en-US", {
                  month: "long",
                })} ${new Date().getDate()}`}</div>
              </div>
            </div>

            <div className="add-comment">
              <div className="button">
                <div className="choose-icon">
                  <IconPicker />
                </div>
                <div style={{ width: "300px" }}>
                  <input
                    type="text"
                    value={value}
                    onChange={handleComment}
                    onClick={handleInputClick}
                    placeholder={isPlaceholderVisible ? "Add a comment" : ""}
                  />
                </div>
              </div>

              <div>
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
      </Modal>
    </>
  );
};

export default ModalPost;
