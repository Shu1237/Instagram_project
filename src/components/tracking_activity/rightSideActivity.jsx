import ShuffleOutlinedIcon from '@mui/icons-material/ShuffleOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Interactions from '../tracking_activity/interactions'
import Following from '../tracking_activity/following'
import HistoryAccount from '../tracking_activity/history_account'
import AdActivity from '../tracking_activity/ad_activity'

const RightSideActivity = ({ status }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(1); // Track selected tab
    const [isFollowing, setIsFollowing] = useState(1); // Track selected tab
    const navLeft = [
        { id: 1, label: "Interactions", status: 'interactions', statusLeft: '/tracking-activity/interactions' },
        { id: 2, label: "Following", status: 'following', statusLeft: '/tracking-activity/following' },
        { id: 3, label: "Account history", status: 'account-history', statusLeft: '/tracking-activity/account-history' },
        { id: 4, label: "Ad activity", status: 'ad-activity', statusLeft: '/tracking-activity/ad-activity' }
    ]

    const navRightInteractions = [
        { id: 1, label: "Like", icon: FavoriteBorderOutlinedIcon },
        { id: 2, label: "Comments", icon: FavoriteBorderOutlinedIcon },
        { id: 3, label: "Sotry Replies", icon: FavoriteBorderOutlinedIcon, },
        { id: 4, label: "Reviews", icon: FavoriteBorderOutlinedIcon }
    ];
    const navRightFollowing = [
        { id: 1, label: "All", icon: FavoriteBorderOutlinedIcon },
        { id: 2, label: "Friends", icon: FavoriteBorderOutlinedIcon },
        { id: 3, label: "Followers", icon: FavoriteBorderOutlinedIcon, },
    ]




    return (
        <div className="flex flex-col md:flex-row items-start justify-center max-w-[1260px] mx-auto gap-6 p-4">
            {/* Left Section */}
            <button onClick={() => navigate('/')} className='bg-blue-500 text-white px-4 py-2 rounded-md'>Back</button>
            <div className="sticky top-0 w-full md:w-1/3 bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden max-lg:relative">
                <div className="p-4 border-b border-gray-300 dark:border-gray-700">
                    <h1 className="text-xl font-semibold">Your Activity</h1>
                </div>
                <div>
                    {navLeft.map((item) => (
                        <MenuItem
                            key={item.id}
                            label={item.label}
                            isActive={status === item.status}
                            onClick={() => navigate(item.statusLeft)}
                        />
                    ))}
                </div>
            </div>

            {/* Right Section */}
            {status === 'interactions' && <Interactions setIsOpen={setIsOpen} isOpen={isOpen} navRightInteractions={navRightInteractions} />}
            {status === 'following' && <Following navRightFollowing={navRightFollowing} isOpen={isFollowing} setIsOpen={setIsFollowing} />}
            {status === 'account-history' && <HistoryAccount />}
            {status === 'ad-activity' && <AdActivity />}
        </div>
    );
};

// Menu Item Component
const MenuItem = ({ label, isActive, onClick }) => (
    <div
        onClick={onClick}
        className={`flex items-center gap-3 p-3 cursor-pointer transition ${isActive ? "bg-blue-100 dark:bg-gray-800 font-semibold" : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
    >
        <ShuffleOutlinedIcon />
        <div>
            <span className="font-medium">{label}</span>
            <p className="text-sm text-gray-500 dark:text-gray-400">Review and manage your {label.toLowerCase()}</p>
        </div>
    </div>
);

export default RightSideActivity;
