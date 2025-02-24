import React, { useState, useRef, useEffect, useCallback } from "react";
import { SEARCH_USERS_QUERY_QUERY } from "../../../graphql/query/search.query";
import { useQuery } from "@apollo/client";
import debounce from "lodash/debounce";
import { Link } from "react-router-dom";
const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const modalRef = useRef();
  const inputRef = useRef();
  const { loading, error, data, refetch } = useQuery(SEARCH_USERS_QUERY_QUERY, {
    variables: { searchTerm },
    skip: !searchTerm,
  });
  const debouncedSearch = useCallback(
    debounce((value) => {
      refetch({ searchTerm: value });
    }, 300),
    []
  );

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
    // console.log(data);
  };
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed left-0 top-0 h-screen w-72 md:w-80 lg:w-96 bg-white z-50 shadow-lg transition-all"
      ref={modalRef}
    >
      {/* Search Bar */}
      <div className="p-4 border-b flex items-center">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full outline-none text-lg p-2 bg-gray-100 rounded-md"
        />
      </div>

      {/* Search Results */}
      <div className="flex-1 p-4 overflow-y-auto">
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        {data?.searchUsers.map((user) => (
          <Link to={`/profile/${user?.user_id}`} key={user.id}>
            <div
              key={user.id}
              className="flex items-center space-x-3 p-2 hover:bg-gray-100 cursor-pointer rounded-lg"
            >
              <img
                src={user.avatar}
                alt={user.username}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <p className="text-sm font-semibold">{user.username}</p>
                <p className="text-xs text-gray-500">{user.full_name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchModal;
