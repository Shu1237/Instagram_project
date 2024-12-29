import React, { useState, useRef, useEffect } from 'react';
import '../dropdown/menu.css';
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
    <div className='navLink' onClick={toggleMenu} ref={dropdownRef}>
      <div className="dropdown" >
        <MenuOutlinedIcon sx={{ fontSize: "30px", margin: "0 20px 0 0" }} />
        <div style={{ fontWeight: isOpen ? "700" : "400" }}> More</div>
        {isOpen && (
          <div className="dropdown-menu">
            <ul>
              <li>
                <span role="img" aria-label="settings"><SettingsOutlinedIcon/></span> Settings
              </li>
              <li>
                <span role="img" aria-label="activity"><BrokenImageOutlinedIcon/></span> Your activity
              </li>
              <li>
                <span role="img" aria-label="saved"><BookmarkAddedOutlinedIcon/></span> Saved
              </li>
              <li>
                <span role="img" aria-label="switch appearance"><LightModeOutlinedIcon/></span> Switch appearance
              </li>
              <li>
                <span role="img" aria-label="report"><ReportGmailerrorredOutlinedIcon/></span> Report a problem
              </li>
              <hr />
              <li>Switch accounts</li>
              <li>Log out</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
