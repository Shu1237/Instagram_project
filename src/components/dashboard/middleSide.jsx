import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function MiddileSide() {
  const location = useLocation();
  return (
    <div className="cursor-pointer h-auto overflow-hidden scrollbar-hide scroll-smooth">
      <h1 className="font-bold text-2xl mb-4">Setting</h1>

      <div className="flex flex-col">
        <h1 className="mb-4">How you use SocialWave</h1>
        <Link to="/dashboardPage">
          <div
            className={`flex flex-row gap-4 h-14 p-4 rounded-xl hover:bg-[#EFEFEF] transition-all duration-300  ${
              location.pathname === "/dashboardPage"
                ? "bg-[#EFEFEF] shadow-lg"
                : "bg-white"
            }`}
          >
            <svg
              aria-label=""
              className="x1lliihq x1n2onr6 x5n08af"
              fill="currentColor"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <title></title>
              <circle
                cx="12.004"
                cy="12.004"
                fill="none"
                r="10.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="2"
              ></circle>
              <path
                d="M18.793 20.014a6.08 6.08 0 0 0-1.778-2.447 3.991 3.991 0 0 0-2.386-.791H9.38a3.994 3.994 0 0 0-2.386.791 6.09 6.09 0 0 0-1.779 2.447"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="2"
              ></path>
              <circle
                cx="12.006"
                cy="9.718"
                fill="none"
                r="4.109"
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="2"
              ></circle>
            </svg>

            <p className="text-lg">Edit Profile</p>
          </div>
        </Link>
        <Link to="/password-security">
          <div
            className={`flex flex-row gap-4 h-14 p-4 rounded-xl hover:bg-[#EFEFEF] transition-all duration-300 ${
              location.pathname === "/password-security"
                ? "bg-[#EFEFEF] shadow-lg"
                : "bg-white"
            }`}
          >
            <svg
              aria-label=""
              className="x1lliihq x1n2onr6 x5n08af"
              fill="currentColor"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <title></title>
              <path d="m21.306 14.019-.484-.852A6.358 6.358 0 0 1 20 9.997a7.953 7.953 0 0 0-4.745-7.302 3.971 3.971 0 0 0-6.51.002 7.95 7.95 0 0 0-4.74 7.323 6.337 6.337 0 0 1-.83 3.175l-.468.823a4.001 4.001 0 0 0 3.476 5.983h1.96a3.98 3.98 0 0 0 7.716 0h1.964a4.004 4.004 0 0 0 3.482-5.982Zm-9.304 6.983a1.993 1.993 0 0 1-1.722-1.001h3.444a1.993 1.993 0 0 1-1.722 1.001Zm7.554-3.997a1.986 1.986 0 0 1-1.732.996H6.184a2.002 2.002 0 0 1-1.74-2.993l.47-.822a8.337 8.337 0 0 0 1.093-4.174 5.962 5.962 0 0 1 3.781-5.584.996.996 0 0 0 .494-.426 1.976 1.976 0 0 1 3.439 0 1 1 0 0 0 .494.425 5.989 5.989 0 0 1 3.786 5.634 8.303 8.303 0 0 0 1.082 4.094l.483.852a1.984 1.984 0 0 1-.01 1.998Z"></path>
            </svg>

            <p className="text-lg">Two Factor Authentication</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
