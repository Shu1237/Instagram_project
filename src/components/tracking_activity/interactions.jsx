import Img from "../../assets/p15.jpg";
import Avatar from "../../assets/profilepic.png";
const Interactions = ({ navRightInteractions, isOpen, setIsOpen }) => {
  return (
    <div className="w-full md:w-2/3 bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
      {/* Tabs */}
      <div className="flex justify-around items-center py-3 border-b border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">
        {navRightInteractions.map((item) => (
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
      <div className="flex items-center justify-between p-4">
        <div className="flex flex-row items-center justify-center gap-3">
          <button className="font-medium">Newest to Oldest</button>
          <button className="border border-gray-300 dark:border-gray-700 rounded-md px-3 py-1 font-medium">
            Sort & Filter
          </button>
        </div>
        <button className="text-blue-500 font-medium">Select</button>
      </div>

      {/* Image Grid */}
      {isOpen === 1 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-4">
          {Array(8)
            .fill("")
            .map((_, index) => (
              <div key={index} className="w-full aspect-square">
                <img
                  className="w-full h-full object-cover rounded-md"
                  src="https://img.freepik.com/free-photo/hands-created-heart-shape_23-2150703756.jpg"
                  alt="activity"
                />
              </div>
            ))}
        </div>
      )}
      {isOpen === 2 && (
        <div className="flex flex-col gap-1">
          <div className="p-4 flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-3">
              <div className="w-10 h-10 rounded-full">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={Avatar}
                  alt=""
                />
              </div>
              <div className="w-[300px]">
                <p className="font-medium">sooyaaa__🖤</p>
                <p className="text-gray-400">
                  @MuseeLouvre for the first time with @Cartier ✨ #Cartier
                  #GrandDinerLouvre
                </p>
              </div>
            </div>

            <div className="w-14 h-14 ">
              <img className="w-full h-full object-cover " src={Img} alt="" />
            </div>
          </div>
          <div className="flex flex-row items-center gap-3 p-4 ml-7">
            <div className="  w-7 h-7 rounded-full ">
              <img
                className="w-full h-full object-cover rounded-full"
                src={Img}
                alt=""
              />
            </div>
            <p>
              {" "}
              <span className="font-medium">
                chi_123kaiz{" "}
              </span> beautifull😍😍{" "}
            </p>
          </div>
        </div>
      )}
      {isOpen === 3 && (
        <>
          <div className="flex flex-row items-center justify-between gap-3 p-4">
            <div className="flex flex-row items-center gap-3">
              <div className="  w-7 h-7 rounded-full ">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={Img}
                  alt=""
                />
              </div>
              <p>
                {" "}
                <span className="font-medium">chi_123kaiz</span> voted{" "}
                <span className="font-medium"> T1 Zeus</span>
              </p>
            </div>
            <div className="flex flex-row gap-2">
              <p>
                Poll from <span className="font-medium">lolesports</span>
              </p>
              <p className="text-gray-400">17 w</p>
            </div>
          </div>
        </>
      )}
      {isOpen === 4 && (
        <div className="flex flex-col items-center justify-center gap-2 p-4">
          <img
            className="w-20 h-20"
            src="https://via.placeholder.com/80x80/667eea/ffffff?text=SW"
            alt=""
          />
          <h1 className="text-2xl font-medium">No reviews activity</h1>
          <p className="text-gray-400">
            When you leave a review on a post, it will appear here
          </p>
        </div>
      )}
    </div>
  );
};

const TabItem = ({ label, onClick, isActive, icon: Icon }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-2 cursor-pointer px-4 py-2 transition ${
      isActive ? "text-blue-500 font-semibold" : "hover:text-blue-500"
    }`}
  >
    {Icon && <Icon />}
    <span className="text-sm">{label}</span>
  </div>
);
export default Interactions;
