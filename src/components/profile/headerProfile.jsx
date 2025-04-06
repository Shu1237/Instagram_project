import { Link } from "react-router-dom";
const HeaderProfile = ({ data, meData }) => {
  return (
    <div className="flex items-start py-8  gap-4">
      {/* Avatar Section */}
      <div className="flex-shrink-0 mr-8">
        <div className="w-[150px] h-[150px] rounded-full border border-gray-200 overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={data?.user?.avatar}
            alt={data?.user?.username}
          />
        </div>
      </div>

      {/* Profile Info */}
      <div className="flex-grow">
        <div className="flex items-center mb-4 space-x-4">
          <h2 className="text-xl font-light">{data?.user?.username}</h2>
          <Link to={`/dashboardPage`}>
            <div className="text-back cursor-pointer p-2  ">
              <svg
                aria-label="Options"
                className="x1lliihq x1n2onr6 x5n08af"
                fill="currentColor"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <title>Options</title>
                <circle
                  cx="12"
                  cy="12"
                  fill="none"
                  r="8.635"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <path
                  d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096"
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </Link>

          {parseInt(meData.user_id) !== parseInt(data?.user?.user_id) && (
            <button className="px-4 py-1.5 bg-blue-500  font-semibold rounded">
              Follow
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="flex flex-row gap-10 font-sans text-gray-600">
          <span>
            <strong>{data?.user?.posts?.length}</strong> posts
          </span>
          <span>
            <strong>{data?.user?.followers?.length}</strong> followers
          </span>
          <span>
            <strong>{data?.user?.following?.length}</strong> following
          </span>
        </div>

        <div className="font-semibold  mt-7">{data?.user?.full_name}</div>
      </div>
    </div>
  );
};
export default HeaderProfile;
