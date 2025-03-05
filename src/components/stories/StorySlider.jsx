import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import storyData from "../../story.json";
import StoryModal from "./StoryModal";

export default function StorySlider() {
  const [selectedStory, setSelectedStory] = useState(null);

  const openStory = (story) => setSelectedStory(story);
  const closeStory = () => setSelectedStory(null);

  return (
    <div className="relative w-full flex items-center py-4 overflow-hidden">
      <Swiper
        slidesPerView="auto"
        spaceBetween={6} // Khoảng cách nhỏ hơn để gần giống Instagram
        navigation={true}
        modules={[Navigation]}
        className="w-full max-w-[800px] px-4"
        breakpoints={{
          320: { slidesPerView: 5 }, // Mobile
          640: { slidesPerView: 6 }, // Tablet
          1024: { slidesPerView: 7 }, // Desktop
        }}
      >
        {storyData.story.map((story, index) => (
          <SwiperSlide
            key={index}
            className="flex flex-col items-center cursor-pointer w-auto"
          >
            <div
              className="relative w-[70px] h-[70px] flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105"
              onClick={() => openStory(story)}
            >
              {/* Viền gradient Instagram */}
              <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500">
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                  <img
                    className="w-[66px] h-[66px] rounded-full object-cover border-[2px] border-black"
                    src={story.img}
                    alt={story.name}
                  />
                </div>
              </div>
            </div>
            <div className="text-xs text-center mt-1 text-black  w-[70px] truncate">
              {story.name}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <StoryModal story={selectedStory} onClose={closeStory} />
    </div>
  );
}
