import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-md w-full text-center">
        <img
          src="https://via.placeholder.com/400x300?text=404+Not+Found"
          alt="404 Not Found"
          className="mx-auto mb-8"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Sorry, the page you are looking for does not exist. You can go back to
          the homepage.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
