
// import '../css/rightSideProfile.css'
import React, { useState } from 'react'
import Image from '../../../assets/img1.png'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import SwitchAccountOutlinedIcon from '@mui/icons-material/SwitchAccountOutlined';
export default function RightSideProfile() {
    const footers = ["Meta",
        "About",
        "Blog",
        "Jobs",
        "Help",
        "API",
        "Privacy",
        "Terms",
        "Locations",
        "Instagram Lite",
        "Threads",
        "Contact Uploading & Non-Users",
        "Meta Verified"]
    const [state, setState] = useState(1)
    const handeleClick = (number) => [
        setState(number)
    ]
    return (
        <div className='w-full max-w-[800px] mx-auto font-sans flex flex-col'>
            <div className="flex flex-col items-center justify-center gao-[10px] py-[20px] border-b border-gray-300">
                <div className="flex flex-row items-center gap-4 items-center justify-between w-full max-w-[800px] px-4">
                    <div className="flex flex-row items-center items-center justify-center w-[200px] h-[150px] box-shadow-2xl ">
                        <img className='w-full h-full object-cover rounded-full transition-transform duration-300 ease-in-out hover:scale-105' src={Image} alt="" />
                    </div>
                    <div className="flex flex-col w-full ">
                        <div className="flex  items-center justify-between pt-[10px]">
                            <div className="text-xl font-bold" style={{ marginTop: '20px' }}>chi_123kaiz</div>
                            <div className="mt-[20px] flex justify-center gao-[15px]">
                                <button className='font-mono px-5 py-2.5 text-lg font-semibold border-none rounded-md cursor-pointer hover:bg-gray-500/30'>Edit profile</button>
                                <button className='font-mono px-5 py-2.5 text-lg font-semibold border-none rounded-md cursor-pointer hover:bg-gray-500/30'>View Archive</button>
                            </div>
                            <div className="cursor-pointer" style={{ marginTop: '20px' }}><SettingsOutlinedIcon /></div>
                        </div>
                        <div className="flex justify-between py-[10px] text-base">
                            <p> 0 post</p>
                            <p>0 follow</p>
                            <p>0 following</p>

                        </div>
                        <div className="mt-[10px]">
                            <div className="text-lg font-bold">Tran Tri</div>
                        </div>
                    </div>
                </div>
                <div className="w-4/5 flex flex-col py-[20px] mt-[20px] ">

                    <div className="flex justify-center items-center w-[80px] h-[80px] cursor-pointer rounded-[50%] border-2 border-gray-300 p-1.5 bg-white">
                        <img className='w-[60px] h-[60px] rounded-full ' src="https://static.vecteezy.com/system/resources/previews/000/567/102/original/additional-plus-icon-vector.jpg" alt="" />

                    </div>
                    <div className="ml-[20px] font-bold text-lg">
                        New
                    </div>

                </div>

            </div>


            <div className="text-center p-[20px]" >
                <div className="flex justify-around mb-[20px]">
                    <div className="  cursor-pointer p-2.5 text-base text-gray-600 hover:bg-gray-200 hover:rounded-md" onClick={() => handeleClick(1)}>
                        <PostAddOutlinedIcon />
                    </div>
                    <div className=" cursor-pointer p-2.5 text-base text-gray-600 hover:bg-gray-200 hover:rounded-md" onClick={() => handeleClick(2)}>
                        <BookmarkBorderOutlinedIcon />
                    </div>
                    <div className=" cursor-pointer p-2.5 text-base text-gray-600 hover:bg-gray-200 hover:rounded-md" onClick={() => handeleClick(3)}>
                        <SwitchAccountOutlinedIcon />
                    </div>
                </div>
                {
                    state == 1 && <div className="p-5 bg-gray-100 rounded-lg shadow-md mt-5 h-72 flex flex-col justify-center">
                        <div className="post-input-profile-body">
                            <form action="">
                                <input type="file" 
                                className='p-2.5 border border-gray-300 rounded-md'/>
                            </form>
                        </div>
                        <div className="text-boy-profile">
                            <p className='mt-[10px] text-[#777]'>When you share photos, they will appear on your profile.</p>
                        </div>
                        <div className="link-post-picture-body">
                            <a href="#" className='inline-block mt-2 text-blue-600 hover:underline'>Share your first photo</a>
                        </div>

                    </div>
                }
                {
                    state == 2 && <div className="p-5 bg-gray-100 rounded-lg shadow-md mt-5 h-72 flex flex-col justify-center">
                        <div className="img text-center mb-4">
                            <img className='w-full h-auto rounded-lg' src="" alt="" />
                        </div>
                    </div>
                }
                {
                    state == 3 && <div className="taged-picture text-center p-5 bg-gray-100 rounded-lg text-gray-500">

                    </div>
                }




            </div>
            <div className="footer-profile text-center py-5 bg-white border-t border-gray-300 text-sm text-gray-600">

                <div className="links space-y-2 mb-2.5">
                    {footers.map((footer, index) => {
                        return (
                            <div key={index} className="footer-item inline-block mx-2.5">
                                <a href="#" className='text-gray-600 hover:underline'>{footer}</a>
                            </div>
                        );
                    })}
                </div>
                <div className="footer-bottom flex items-center gap-2 justify-center">
                    <div className="language-selector mt-2.5">
                        <label htmlFor="language">English</label>
                        <select id="language" className='p-1.5 border border-gray-300 rounded-md text-sm'>
                            <option value="en">English</option>
                            <option value="es">Español</option>
                            <option value="fr">Français</option>
                            <option value="de">Deutsch</option>
                        </select>
                    </div>
                    <div className="copyright mt-2.5">&copy; 2025 Instagram from Meta</div>

                </div>

            </div>
        </div>
    );
}