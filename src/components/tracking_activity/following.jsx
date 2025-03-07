const Following = ({ navRightFollowing, isOpen, setIsOpen }) => {
 
    return (
        <div className="w-full md:w-2/3 bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
            {/* Tabs */}
            <div className="flex justify-around items-center py-3 border-b border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                {navRightFollowing.map((item) => (
                    <TabItem
                        key={item.id}
                        label={item.label}
                        onClick={() => setIsOpen(item.id)}
                        isActive={isOpen === item.id}
                        icon={item.icon}
                    />
                ))}
            </div>

            {/* Sorting & Select */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div className='flex flex-row items-center justify-center gap-3'>
                    <button className="font-medium hover:text-blue-500 transition-colors">Newest to Oldest</button>
                    <button className="border border-gray-300 dark:border-gray-700 rounded-md px-3 py-1 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Sort & Filter</button>
                </div>
                <button className="text-blue-500 font-medium hover:text-blue-600 transition-colors">Select</button>
            </div>

            {/* All Friends and Followers Section */}
            {isOpen === 1 && (
                <div className='flex flex-col gap-4 p-4'>
                    <div className='flex flex-row items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4'>
                        <h1 className="text-2xl font-medium">All Connections</h1>
                        <p className="text-gray-500">200 total connections</p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {[...Array(15)].map((_, index) => (
                            <ConnectionCard
                                key={index}
                                image="https://img.freepik.com/free-photo/hands-created-heart-shape_23-2150703756.jpg"
                                name={`User ${index + 1}`}
                                followers={100}
                                type={index % 2 === 0 ? 'Friend' : 'Follower'}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Friends Section */}
            {isOpen === 2 && (
                <div className='flex flex-col gap-4 p-4'>
                    <div className='flex flex-row items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4'>
                        <h1 className="text-2xl font-medium">Friends</h1>
                        <p className="text-gray-500">100 friends</p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {[...Array(4)].map((_, index) => (
                            <ConnectionCard
                                key={index}
                                image="https://img.freepik.com/free-photo/hands-created-heart-shape_23-2150703756.jpg"
                                name={`Friend ${index + 1}`}
                                followers={100}
                                type="Friend"
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Followers Section */}
            {isOpen === 3 && (
                <div className='flex flex-col gap-4 p-4'>
                    <div className='flex flex-row items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4'>
                        <h1 className="text-2xl font-medium">Followers</h1>
                        <p className="text-gray-500">100 followers</p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {[...Array(4)].map((_, index) => (
                            <ConnectionCard
                                key={index}
                                image="https://img.freepik.com/free-photo/hands-created-heart-shape_23-2150703756.jpg"
                                name={`Follower ${index + 1}`}
                                followers={100}
                                type="Follower"
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

// Tab Item Component
const TabItem = ({ label, onClick, isActive, icon: Icon }) => (
    <div
        onClick={onClick}
        className={`flex items-center gap-2 cursor-pointer px-4 py-2 transition rounded-md
            ${isActive 
                ? "text-blue-500 font-semibold bg-blue-50 dark:bg-gray-800" 
                : "hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
    >
        {Icon && <Icon />}
        <span className="text-sm">{label}</span>
    </div>
);

// Connection Card Component
const ConnectionCard = ({ image, name, followers, type }) => (
    <div className='flex flex-row items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow'>
        <div className='flex flex-row items-center gap-4'>
            <div className='w-16 h-16 rounded-full overflow-hidden'>
                <img 
                    className='w-full h-full object-cover' 
                    src={image} 
                    alt={name} 
                />
            </div>
            <div className='flex flex-col'>
                <span className='font-medium text-lg'>{name}</span>
                <span className='text-gray-500'>{followers} followers</span>
                <span className='text-sm text-blue-500'>{type}</span>
            </div>
        </div>
        <button className='px-4 py-2 text-blue-500 font-medium border border-blue-500 rounded-md hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors'>
            {type === 'Friend' ? 'Message' : 'Follow Back'}
        </button>
    </div>
);

export default Following;

