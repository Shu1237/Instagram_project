import React, { useState, useRef, useEffect } from "react";

const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const modalRef = useRef();
  const inputRef = useRef();

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
      className="fixed left-0 top-0 h-screen w-72 md:w-80 lg:w-70 bg-white z-50 shadow-lg transition-all"
      ref={modalRef}
    >
      {/* Search Bar */}
      <div className="p-4 border-b flex items-center">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full outline-none text-lg p-2 bg-gray-100 rounded-md"
        />
      </div>

      {/* Search Results */}
      <div className="flex-1 p-4 overflow-y-auto">
        {searchTerm ? (
          <p className="text-gray-500 text-sm">No results found</p>
        ) : (
          <p className="text-gray-500 text-sm">Start typing to search...</p>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
