import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import Avatar from "../../assets/profilepic.png";
import story from "../../story.json"; 
import UserAvatar from '../../assets/p15.jpg'
import { useNavigate } from "react-router-dom";
const RightSideMess = () => {
    const stories = story.story;
    const navigate = useNavigate()
    return (
        <div className="border-r border-gray-300 px-6 py-4 w-[350px] h-screen flex flex-col">
            {/* Header */}
            <div className="flex-shrink-0">
                <div className="flex justify-between items-center max-md:hidden">
                    <span className="text-xl font-bold">chi_123kaiz</span>
                    <EditNoteOutlinedIcon sx={{ fontSize: 30 }} />
                </div>

                {/* Story Section */}
                <div className="mt-6 max-md:hidden">
                    <div className="flex flex-row gap-4 overflow-y-auto scrollbar-hide max-w-full">
                        {/* ... (giữ nguyên phần story section) */}
                        <div className="relative flex flex-col items-center">
                            <div className='absolute right-3 top-[-8px]'>
                                <input type="text" placeholder='Note...' className='w-10 rounded-lg h-atuo' />
                            </div>
                            <div className="w-[60px] h-[60px] rounded-full border border-gray-300 overflow-hidden">
                                <img className="w-full h-full object-cover" src={Avatar} alt="story" />
                            </div>
                            <span className="text-sm text-gray-500 mt-1">Your note</span>
                        </div>
                        {/* Other Stories */}
                        {stories.map((story, index) => (
                            <div key={index} className="flex flex-col items-center flex-shrink-0">
                                <div className="w-[60px] h-[60px] rounded-full border border-gray-300 overflow-hidden">
                                    <img className="w-full h-full object-cover" src={story.img} alt={story.name} />
                                </div>
                                <span className="text-sm text-gray-700 mt-1">{story.name}</span>
                            </div>
                        ))}

                    </div>
                </div>

                {/* Messages Header */}
                <div className="mt-6 max-md:hidden">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-semibold">Messages</span>
                        <span className="text-sm text-gray-500 cursor-pointer">Requests</span>
                    </div>
                </div>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
               
                    <div
                        onClick={()=>navigate(`/messages/${id}/${1}`)}
                        className="group flex items-center gap-3 p-2 transition-all duration-300 hover:bg-gray-100 rounded-lg cursor-pointer relative overflow-hidden"
                    >
                        {/* ... (giữ nguyên phần message item) */}
                        {/* Hover effect layer */}
                        <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                            <div className="w-12 h-12 rounded-full border-2 border-white ring-1 ring-gray-200 overflow-hidden">
                                <img
                                    className="w-full h-full object-cover"
                                    src={UserAvatar}
                                    alt="User"
                                />
                            </div>
                            {/* Online status indicator */}
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        </div>

                        {/* User info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-800 truncate">
                                    Minh Nghi Nguyen
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 truncate">
                                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1" />
                                Active 7m ago
                            </p>
                        </div>
                    </div>



                    <div
                        onClick={()=>navigate(`/messages/${id}/${2}`)}
                        className="group flex items-center gap-3 p-2 transition-all duration-300 hover:bg-gray-100 rounded-lg cursor-pointer relative overflow-hidden"
                    >
                        {/* ... (giữ nguyên phần message item) */}
                        {/* Hover effect layer */}
                        <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                            <div className="w-12 h-12 rounded-full border-2 border-white ring-1 ring-gray-200 overflow-hidden">
                                <img
                                    className="w-full h-full object-cover"
                                    src={UserAvatar}
                                    alt="User"
                                />
                            </div>
                            {/* Online status indicator */}
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        </div>

                        {/* User info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-800 truncate">
                                   Tran Tri
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 truncate">
                                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1" />
                                Active 7m ago
                            </p>
                        </div>
                    </div>
               
            </div>
        </div>
    );
};

export default RightSideMess;
