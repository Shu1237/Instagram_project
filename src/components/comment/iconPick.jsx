import React, { useState, useEffect, useRef, useCallback } from "react";
import EmojiPicker from "emoji-picker-react";
import "../ui/css/emotion.css";
import { useNavigate } from "react-router-dom";
import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";

const EmojiPickerComponent = ({ onEmojiChange }) => {
  // const [chosenEmoji, setChosenEmoji] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef(null);

  const onEmojiClick = () => {
    setIsOpen(!isOpen);
  };
  const handleEmojiClick = (event, emojiObject) => {
    // console.log(event.emoji);
    onEmojiChange(event.emoji);
    setIsOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className="container">
      <div className="emoji-button">
        <InsertEmoticonOutlinedIcon
          sx={{ fontSize: "25px" }}
          onClick={onEmojiClick}
        />
        {isOpen && (
          <div className="emoji-picker">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EmojiPickerComponent;
