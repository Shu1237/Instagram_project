import React from 'react';
import image from '../../../image.json';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';


export default function ScrollHorizontally() {

    const images = image.image;
    const sliderLeft = () => {
        let slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 500

    }
    const slideRight = () => {
        let slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 500

    }


    return (
        <>
            <img
                className="w-full h-[440px] object-cover"
                src="https://th.bing.com/th/id/R.727ae4bb0e6f61205d7bdbc533126bc7?rik=9SIuTSzoBoLxdA&pid=ImgRaw&r=0"
                alt="Background"
            />
            <div className="relative flex items-center">
                <MdChevronLeft onClick={sliderLeft} size={40} className='opacity-50 cursor-pointer hover:opacity-100' />
                <div id='slider' className='w-full h-full overflow-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
                    {images.map((item, index) => (
                        <img
                            key={index}
                            src={item.img}
                            alt={`Image ${index + 1}`}
                            className="w-[220px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300" // Optional styling for the images
                        />
                    ))}
                </div>
                <MdChevronRight onClick={slideRight} size={40} className='opacity-50 cursor-pointer hover:opacity-100' />
            </div>
        </>
    );
}
