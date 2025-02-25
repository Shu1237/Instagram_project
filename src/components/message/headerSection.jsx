import { FiVideo, FiPhone } from "react-icons/fi";
import { BsThreeDotsVertical} from "react-icons/bs";
export default function HeaderSection({myFriendInfo}) {
    return (<div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
            <div className="relative">
                <img
                    src={myFriendInfo?.avatar}
                    alt="User avatar"
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
                <h2 className="text-lg font-semibold">{myFriendInfo?.full_name}</h2>
                <p className="text-sm text-gray-500">Online</p>
            </div>
        </div>
        <div className="flex items-center space-x-6">
            <FiPhone className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-500" />
            <FiVideo className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-500" />
            <BsThreeDotsVertical className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-500" />
        </div>
    </div>)
}