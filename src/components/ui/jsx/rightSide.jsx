import React, { useState } from "react"
import '../css/rightSide.css';
import ProfileRight from '../../../assets/profilepic.png'
import { Link } from 'react-router-dom';
import avatars from "../../../avatar.json"

function RightSide() {
    const hsr = 'instagram from Meta'
    const [followStates, setFollowStates] = useState(avatars.map(() => "Follow"));
    const handleChangeFollow = (index) => {


        // setCount(c=>c+1)
        // Similarly
        setFollowStates(prevStates => {
            //c1
            const newState = [...prevStates];
            if (newState[index] === "Follow") {
                newState[index] = "Followed"; 
            } else {
                newState[index] = "Follow";
            }
            return newState; 

           //   c2 newState[index]=newState[index]==="Follow"? "Followed" :"Follow"
        })
    }


    return (
        <div className="rightSideHome">
            <div className="topProfileRight">
                <div className="leftRightProfile">
                    <div className="imageDivRight">
                        <img className="imgeRightSideProfile" src={ProfileRight} alt="profileRight" />
                    </div>
                    <div className="userNameBlock">
                        <div className="userNameRightSide">Shu123</div>
                        <div className="userFullName">Tran Tri</div>
                    </div>
                </div>
                <div className="switchBtn">
              <Link className="linkSwitch" to="/"> Switch</Link>



                </div>
            </div>
            <div className="bottonRigtSide">
                <div className="suggestedBlock">  Suggested for you</div>
                <div className="seeAll">see All</div>
            </div>



            {
                avatars.map((avatar, index) => {
                    return (
                        <div key={index} className="inforFrineds">
                            <div className="infoFriend">
                                <div className="avatar">
                                    <img className="avatar-frined" src={avatar.img} alt="imgFriend" />
                                </div>
                                <div className="text">
                                    <div className="nickname">
                                        {avatar.nickname}
                                    </div>
                                    <div className="Follow">{avatar.followby}</div>
                                </div>

                            </div>
                            <div className="follow" onClick={() => handleChangeFollow(index)}>{followStates[index]}</div>
                        </div>
                    )
                })
            }



            <div className="support">
                <div className="before">
                    About
                    Help
                    Press
                    API
                    Jobs
                    Privacy
                    Terms
                    Locations
                    Language
                    Meta Verified
                </div>
                <div className="behind">

                    &copy;{new Date().getFullYear()} {hsr.toUpperCase()}
                </div>
            </div>
        </div>
    )
}

export default RightSide