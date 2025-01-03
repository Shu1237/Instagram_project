import React from "react";
// import '../css//middleSide.css';
import story from '../../../story.json'

import Post from '../jsx/post'

export default function MiddleSide() {
    const storys = story.story;
    return (
        <div className="w-full border-l border-gray-400 px-12 box-border flex flex-col items-center justify-center" >
            <div className="w-[725px] h-[120px] flex gap-8 justify-center items-center overflow-x-auto mt-[13px] mb-[40px]">
                {storys.map((story, index) => {
                    return (
                        <div key={index} className="w-[66px] h-[66px] flex flex-col items-center justify-center "> 
                            <div className="w-[56px] h-[56px] rounded-full border-1 border-purple-500 ">
                                <img className="w-[56px] h-[56px]  rounded-full " src={story.img} alt="story" />
                            </div>
                            <div className="text-base">
                                {story.name}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="w-3/5">
               <Post/>
               <Post/>
               <Post/>
               <Post/>
            </div>
        </div >




    )
}
 