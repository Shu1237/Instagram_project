import React from "react";
import '../ui/css/middleSide.css';
import story from '../../story.json'

import Post from '../post/post'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

export default function MiddleSide() {

    const storys = story.story;

    const sliderLeft = () => {
        let slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 500

    }
    const slideRight = () => {
        let slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 500

    }

    return (
        <div className="  w-full border-l border-gray-400 px-12 box-border flex flex-col items-center justify-center" >
            <div className="relative flex items-center ">
                <MdChevronLeft onClick={sliderLeft} size={40} className='mb-[45px] opacity-50 cursor-pointer hover:opacity-100 '/>
                <div id="slider" className=" max-lg:w-[600px]  w-[800px] h-[120px] flex gap-[35px] justify-center items-center overflow-x-auto mt-[13px] mb-[40px] scrollbar-hide scroll-smooth ">

                    {storys.map((story, index) => {
                        return (
                            <div key={index} className="w-[66px] h-[66px] flex flex-col items-center justify-center p-[5px] ">
                                <div className="w-[66px] h-[66px] rounded-full border-1 border-purple-500 ">
                                    <img className="w-[66px] h-[66px]  rounded-full object-cover " src={story.img} alt="story" />
                                </div>
                                <div className="text-base">
                                    {story.name}
                                </div>
                            </div>
                        );
                    })}

                </div>
                <MdChevronRight onClick={slideRight} size={40} className=' mb-[45px] opacity-50 cursor-pointer hover:opacity-100 ' />
            </div>

            <div className="w-3/5">
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </div >




    )
}
