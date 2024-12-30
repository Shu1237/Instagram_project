import React, { useState, useEffect, useRef } from "react";
import imageBeach from "../../../assets/img4.png";
import imagePost from "../../../assets/img2.png";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

function Post() {
    const [comment, setComment] = useState("");
    const clickOutsideRef = useRef(null);
    const [isPlaceholderVisible, setPlaceholderVisible] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [nofLike, setNofLike] = useState(123156);
    const [clickHeart, setClickHeart] = useState(<FavoriteBorderOutlinedIcon />);


    //up + 1
    const newNofLike = () => {
        setNofLike(n => n + 1);
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

    const handleHeartClick = () => {
        if (clickHeart.type === FavoriteBorderOutlinedIcon) {
            setClickHeart(<FavoriteOutlinedIcon />);
            newNofLike();  // +1
        } else {
            setClickHeart(<FavoriteBorderOutlinedIcon />);
            setNofLike(nofLike > 0 ? nofLike - 1 : 0);
        }
    };

    return (
        <div className="post">
            <div className="postInfo">
                <img className="postInfoImg" src={imageBeach} alt="" />
                <div className="postInfousername">Shu</div>
                <div className="timiInfo">.36 min</div>
            </div>

            <div className="postImg">
                <img className="postImage" src={imagePost} alt="" />
            </div>

            <div className="inconBlock">
                <div className="lefticon" style={{ fontSize: "30px" }}>
                    <div onClick={handleHeartClick}>
                        {clickHeart}
                    </div>
                    <ModeCommentOutlinedIcon sx={{ fontSize: "30px" }} />
                    <ShareOutlinedIcon sx={{ fontSize: "30px" }} />
                </div>
                <div className="righticon">
                    <BookmarkBorderOutlinedIcon sx={{ fontSize: "30px" }} />
                </div>
            </div>

            <div className="likeSection">
                <div className="imgesLike">
                    <img className="likeImg" src={imagePost} alt="" />
                    <img className="likeImg2" src={imagePost} alt="" />
                </div>
                <div className="notLike">{nofLike} likes</div>
            </div>

            <div className="postAbout">
                <div className="aboutName">Black pink</div>
                <div className="infoCommnet">I will rewrite the world</div>
            </div>

            <div className="noOFComment">View all 878 comments</div>

            <div className="addComment" ref={clickOutsideRef}>
                <input
                    value={comment}
                    onChange={handleCommentChange}
                    onClick={handleInputClick}
                    placeholder={isPlaceholderVisible ? "Add a comment..." : ""}
                />
                {isOpen && comment.trim() !== "" && (
                    <button className="post-button">Post</button>
                )}
            </div>
        </div>
    );
}

export default Post;
