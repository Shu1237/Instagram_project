import React from "react";
import imageBeach from '../../../assets/img4.png';
import imagePost from '../../../assets/img2.png';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
function Post() {
    return (
        <div className="post">
            <div className="postInfo">
                <img className="postInfoImg" src={imageBeach} alt="" />
                <div className="postInfousername"> Shu</div>
                <div className="timiInfo"> .36 min</div>
            </div>
            <div className="postImg">
                <img className="postImage" src={imagePost} alt="" />
            </div>
            <div className="inconBlock">
                <div className="lefticon">
                    <FavoriteBorderOutlinedIcon sx={{ fontSize: "30px" }} />
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
                <div className="notLike">
                    123,156 likes
                </div>
            </div>
            <div className="postAbout">
                <div className="aboutName">
                    Black pink
                </div>
                <div className="infoCommnet">I will rewrite the world</div>
            </div>
            <div className="noOFComment">View all 878 comments</div>

            <div className="addComment">Add a comment...</div>

        </div>
    )
}


export default Post