import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuOutlined, SettingsOutlined, BrokenImageOutlined, BookmarkAddedOutlined, ReportGmailerrorredOutlined } from '@mui/icons-material';
import Darkmode from '../Darkmode/darkmode';

const Menu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center px-6 py-2 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 w-full max-xl:w-8 max-xl:px-0" ref={dropdownRef}>
      <button onClick={toggleMenu} className="flex items-center space-x-2">
        <MenuOutlined className="text-3xl" />
        <span className="max-xl:hidden font-medium">{isOpen ? "More" : "More"}</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 bottom-[40px] bg-white dark:bg-gray-800 shadow-lg rounded-lg w-60 z-50">
          <ul className="p-2 space-y-1">
            <MenuItem onClick={() => navigate('/dashboardPage')} icon={<SettingsOutlined />} label="Settings" />
            <MenuItem onClick={() => navigate('/tracking-activity')} icon={<BrokenImageOutlined />} label="Your activity" />
            <MenuItem icon={<BookmarkAddedOutlined />} label="Saved" />
            <Darkmode />
            <MenuItem icon={<ReportGmailerrorredOutlined />} label="Report a problem" />
            <hr className="border-t border-gray-300 dark:border-gray-600" />
            <MenuItem label="Switch accounts" />
            <MenuItem label="Log out" />
          </ul>
        </div>
      )}
    </div>
  );
};

const MenuItem = ({ icon, label, onClick }) => (
  <li onClick={onClick} className="flex items-center px-3 py-2 cursor-pointer rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition">
    {icon && <span className="mr-3">{icon}</span>}
    {label}
  </li>
);

export default Menu;
