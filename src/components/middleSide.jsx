import React from "react";
import './middleSide.css';
import story from '../story.json'
import Post from '../components/Post/post.jsx'
function MiddleSide() {
    const storys = story.story;
    return (
        <div className="middleHomeSide">
            <div className="storyBlock">
                {storys.map((story, index) => {
                    return (
                        <div key={index} className="storyParticular">
                            <div className="imageDIV">
                                <img className="statusImg" src={story.img} alt="story" />
                            </div>
                            <div className="profileName">
                                {story.name}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="postSection">
               <Post/>
               <Post/>
               <Post/>
               <Post/>
            </div>
        </div >




    )
}
export default MiddleSide