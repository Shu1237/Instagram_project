import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import TransgenderOutlinedIcon from "@mui/icons-material/TransgenderOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useState, useEffect } from "react";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import * as localStorage from "../../utils/localStorage.util";
export default function RightSide() {
  const [isEditing, setIsEditing] = useState(false);
  // Get user information from localStorage
  const userInfo = localStorage.getLocalStorage()?.user;
  // Set user information to profile state
  const [profile, setProfile] = useState({
    username: userInfo?.username,
    name: userInfo?.full_name,
    email: userInfo?.email,
    phone: userInfo?.phone,
    avatar: userInfo?.avatar,
    gender: "Male",
    location: "Ho Chi Minh City, Vietnam",
    status: "Active",
    createAt: "20/1/2018",
  });

  //Lay anh
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);

  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      setAvatar(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call would go here
    setIsEditing(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Edit Profile</h1>
      </div>

      {/* Profile Header */}
      <div className="bg-[#EFEFEF] p-6 rounded-2xl shadow-sm mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="relative ">
              {avatar?.preview ? (
                <img
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  src={avatar.preview}
                  alt="User Profile Picture"
                />
              ) : (
                <img
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  src={profile?.avatar} // Update with your default image path
                  alt={profile?.name}
                />
              )}

              <div className="absolute w-4 h-4 rounded-2xl bg-green-400 right-1 bottom-1 "></div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {profile?.username}
              </h2>
              <div className="flex flex-row items-center gap-2">
                <p className="text-gray-500">{profile?.name}</p>
                <p
                  className={`${
                    profile.status === "Active"
                      ? "text-green-500 font-semibold"
                      : "text-gray-500"
                  } p-2 `}
                >
                  {profile.status === "Active" ? "Active" : "Inactive"}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => document.getElementById("avatarInput").click()}
            className="flex items-center gap-2 px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
          >
            Change Photo
          </button>
          <input
            type="file"
            id="avatarInput"
            className="hidden"
            onChange={handlePreviewAvatar}
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
            Basic Information
          </h2>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 text-gray-600 hover:bg-gray-50 rounded-lg border transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <DriveFileRenameOutlineOutlinedIcon className="text-gray-500" />
                <div>
                  <p className="text-md text-gray-500">Full Name</p>
                  <p className="font-medium">{profile.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <EmailOutlinedIcon className="text-gray-500" />
                <div>
                  <p className="text-md text-gray-500">Email</p>
                  <p className="font-medium">{profile.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <LocationOnOutlinedIcon className="text-gray-500" />
                <div>
                  <p className="text-md text-gray-500">Location</p>
                  <p className="font-medium">{profile.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <DateRangeOutlinedIcon className="text-gray-500" />
                <div>
                  <p className="text-md text-gray-500">Create At </p>
                  <p className="font-medium">{profile.createAt}</p>
                </div>
              </div>
            </div>

            <div className="text-end">
              <button
                onClick={() => setIsEditing(true)}
                className="w-full md:w-auto px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors  "
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
