import React, { useState,useEffect,useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import '../css/emotion.css'

import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';

const EmojiPickerComponent = () => {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef(null);

  const onEmojiClick = () => {
   
    setIsOpen(!isOpen); 
  };

  useEffect(() => {
    
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false); 
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <div className='container'>
      <div className="emoji-button"  >
        <InsertEmoticonOutlinedIcon sx={{ fontSize: "40px" }} onClick={onEmojiClick}/>
        {isOpen && (
        <div className="emoji-picker">
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
      </div>

      
    </div>
  );
};

export default EmojiPickerComponent;
