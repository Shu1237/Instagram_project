import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const historyData = [
    {
        icon: <ShieldOutlinedIcon className="text-blue-500" />,
        title: "Privacy",
        description: "You made your account privacy.",
        date: "2y"
    },
    {
        icon: <PhoneEnabledOutlinedIcon className="text-green-500" />,
        title: "Phone",
        description: "You changed your phone number to +84909090909",
        date: "2y"
    },
    {
        icon: <ErrorOutlineIcon className="text-red-500" />,
        title: "Account Created",
        description: "You created your account on January 27, 2023",
        date: "2y"
    }
];

const HistoryAccount = () => {
    return (
        <div className="w-full md:w-2/3 bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
            {/* Header */}
            <div className="p-6 text-center border-b dark:border-gray-700">
                <h1 className="text-xl font-semibold">Account History</h1>
                <p className="text-gray-500">Review changes you've made to your account since you created it.</p>
            </div>

            {/* Filter Buttons */}
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                <button className="font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500">Newest to Oldest</button>
                <button className="border border-gray-300 dark:border-gray-700 rounded-md px-4 py-1 font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
                    Sort & Filter
                </button>
            </div>

            {/* History Items */}
            <div className="p-4 space-y-4">
                {historyData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition">
                        <div className="flex items-center gap-4">
                            {item.icon}
                            <div>
                                <h2 className="font-medium">{item.title}</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{item.description} <span className="font-medium">{item.date}</span></p>
                            </div>
                        </div>
                        <KeyboardArrowRightOutlinedIcon className="text-gray-400" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HistoryAccount;
