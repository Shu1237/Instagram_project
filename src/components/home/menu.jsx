import React, { useState, useRef, useEffect } from 'react';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className=' max-lg:w-[100px] flex h-[40px] items-center px-[30px] rounded-[5px] cursor-pointer mb-[20px] hover:bg-[#ededed] w-full' ref={dropdownRef} >
      <div className="bg-green relative flex items-center rounded-[5px] " onClick={toggleMenu} >
        <MenuOutlinedIcon sx={{ fontSize: "35px", margin: "0 20px 0 0" }} />
        <div style={{ fontSize: '1.125rem', fontWeight: isOpen ? 700 : 400 }} className='max-lg:hidden'>More</div>
        {isOpen && (
          <div className="absolute left-0 bottom-[40px] bg-white shadow-lg rounded-[10px] w-[250px] z-[1000]">
            <ul className='list-none p-[10px] m-[0]'>
              <MenuItem icon={<SettingsOutlinedIcon />} label="Setting" />
              <MenuItem icon={<BrokenImageOutlinedIcon />} label="Your activity" />
              <MenuItem icon={<BookmarkAddedOutlinedIcon />} label="Saved" />
              <MenuItem icon={<LightModeOutlinedIcon />} label="Switch appearance" />
              <MenuItem icon={<ReportGmailerrorredOutlinedIcon />} label="Report a problem" />
              <hr className='my-[10px] border-0 border-t-[1px] border-[#e0e0e0]' />
              <li className='py-[20px] px-[10px] cursor-pointer flex items-center justify-start rounded-[15px] hover:bg-[#ededed]'>
                Switch accounts
              </li>
              <li className='py-[20px] px-[10px] cursor-pointer flex items-center justify-start rounded-[15px] hover:bg-[#ededed]'>
                Log out
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>


  );
};

const MenuItem = ({ icon, label }) => {
  return (
    <li className='py-[20px] px-[10px] cursor-pointer flex items-center justify-start rounded-[15px] hover:bg-[#ededed]'>
      <span className='mr-[15px]' role="img" aria-label={label}>{icon}</span> {label}
    </li>
  );
};

export default Menu;
