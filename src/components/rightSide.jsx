import React from "react"
import './rightSide.css';
import ProfileRight from '../assets/profilepic.png'
import imgFriend from '../assets/img1.png'

function RightSide() {
    const hsr= 'instagram from Meta'
   
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
                    Switch
                </div>
            </div>
            <div className="bottonRigtSide">
                <div className="suggestedBlock">  Suggested for you</div>
                <div className="seeAll">see All</div>
            </div>
            <div className="inforFrineds">
                <div className="infoFriend">
                    <div className="avatar">
                        <img className="avatar-frined" src={imgFriend} alt="imgFriend" />
                    </div>
                    <div className="text">
                        <div className="nickname">
                            pphng606x
                        </div>
                        <div className="Follow">Followed by _khanghuynh</div>
                    </div>

                </div>
                <div className="follow">Follow</div>
            </div>
            <div className="inforFrineds">
                <div className="infoFriend">
                    <div className="avatar">
                        <img className="avatar-frined" src={imgFriend} alt="imgFriend" />
                    </div>
                    <div className="text">
                        <div className="nickname">
                            pphng606x
                        </div>
                        <div className="Follow">Followed by _khanghuynh</div>
                    </div>

                </div>
                <div className="follow">Follow</div>
            </div>
            <div className="inforFrineds">
                <div className="infoFriend">
                    <div className="avatar">
                        <img className="avatar-frined" src={imgFriend} alt="imgFriend" />
                    </div>
                    <div className="text">
                        <div className="nickname">
                            pphng606x
                        </div>
                        <div className="Follow">Followed by _khanghuynh</div>
                    </div>

                </div>
                <div className="follow">Follow</div>
            </div>
            <div className="inforFrineds">
                <div className="infoFriend">
                    <div className="avatar">
                        <img className="avatar-frined" src={imgFriend} alt="imgFriend" />
                    </div>
                    <div className="text">
                        <div className="nickname">
                            pphng606x
                        </div>
                        <div className="Follow">Followed by _khanghuynh</div>
                    </div>

                </div>
                <div className="follow">Follow</div>
            </div>

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
                    
                &copy;{new Date().getFullYear()} { hsr.toUpperCase()}
                </div>
            </div>
        </div>
    )
}

export default RightSide