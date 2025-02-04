import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { RxDotFilled } from "react-icons/rx";
import Avatar from "../../assets/img1.png";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconPicker from "../comment/iconPick";
const ModalCreate = () => {
  const [open, setOpen] = useState(false);
  const [next, setNext] = useState(0);
  const [picture, setPicture] = useState([]);
  const [value, setValue] = useState("");
  const MAX_IMAGES = 20;
  const MAX_CAPTION_LENGTH = 2200;
  const [emoji, setEmoji] = useState(null);

  const handleEmojiSelect = (selectedEmoji) => {
    setEmoji(selectedEmoji); // save emoji

    setValue((v) => [...v, selectedEmoji]);
  };


  // bo chiu phan nay
  // const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //   // Cleanup object URLs to prevent memory leaks
  //   return () => {
  //     picture.forEach((url) => URL.revokeObjectURL(url));
  //   };
  // }, [picture]);

  // const prevSlide = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === 0 ? picture.length - 1 : prevIndex - 1
  //   );
  // };

  // const nextSlide = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === picture.length - 1 ? 0 : prevIndex + 1
  //   );
  // };

  // const goToSlide = (slideIndex) => {
  //   setCurrentIndex(slideIndex);
  // };

  const handleClose = () => {
    setOpen(false);
    setNext(0);
    setPicture([]);
    setValue("");
  };

  const handleValue = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= MAX_CAPTION_LENGTH) {
      setValue(inputValue);
    }
  };

  const handleSelectPicture = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
    );
    if (validFiles.length + picture.length <= MAX_IMAGES) {
      const newPictures = validFiles.map((file) => URL.createObjectURL(file));
      setPicture((prev) => [...prev, ...newPictures]);
    } else {
      alert(`You can only upload up to ${MAX_IMAGES} images or videos.`);
    }
  };

  const handleDeletePicture = (index) => {
    setPicture((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
    );
    if (validFiles.length + picture.length <= MAX_IMAGES) {
      const newPictures = validFiles.map((file) => URL.createObjectURL(file));
      setPicture((prev) => [...prev, ...newPictures]);
    } else {
      alert(`You can only upload up to ${MAX_IMAGES} images or videos.`);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <>
      {/* <div
        className="flex h-[40px] items-center px-[30px] rounded-[5px] cursor-pointer mb-[20px] hover:bg-[#ededed] w-full"
        onClick={() => setOpen(true)}
        aria-label="Open create modal"
      >
        <AddBoxOutlinedIcon sx={{ fontSize: "35px", margin: "0 20px 0 0" }} />
        <div className="font-normal text-[16px] text-lg">Create</div>
      </div> */}
      <div onClick={() => setOpen(true)} className="flex h-[40px] items-center px-[30px] rounded-[5px] cursor-pointer mb-[20px] hover:bg-[#ededed] w-full
      
      max-lg:w-[100px]
      
      ">
        <AddBoxOutlinedIcon sx={{ fontSize: "35px", margin: "0 20px 0 0" }} />
        <div className="font-normal text-[16px] text-lg max-lg:hidden">Create</div>
      </div>

      <Modal
        centered
        open={open}
        onOk={handleClose}
        onCancel={handleClose}
        width={800}
      >
        <div className="flex flex-col w-full max-w-[500px] mx-auto bg-white rounded-md p-6 shadow-sm text-center">
          <div className="text-lg font-semibold text-black mb-8 border-b pb-2 relative">
            {next === 0
              ? "Create New Post"
              : next === 1
                ? "Edit Caption"
                : "Share"}
            {picture.length > 0 && (
              <>
                {next < 2 && (
                  <button
                    className="absolute right-0 text-blue-500 font-semibold"
                    onClick={() => setNext(next + 1)}
                  >
                    {next === 0
                      ? `Next (${picture.length})`
                      : `Post (${picture.length})`}
                  </button>
                )}
                {next > 0 && (
                  <button
                    className="absolute left-0 text-blue-500 font-semibold"
                    onClick={() => setNext(next - 1)}
                  >
                    Back
                  </button>
                )}
                {

                  next === 2 && (
                    <button
                      className="absolute right-0 text-blue-500 font-semibold"
                    // onClick={}
                    >
                      Up
                    </button>

                  )
                }
              </>
            )}

            {picture.length === 0 && next === 1 && (
              <button
                className="absolute left-0 text-blue-500 font-semibold"
                onClick={() => setNext(next - 1)}
              >
                Back
              </button>
            )}
          </div>

          {next === 0 && (
            <div
              className="flex flex-col justify-center items-center gap-4 border-dashed border-2 border-gray-300 rounded-md p-6"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="text-gray-400 text-6xl">
                <CollectionsOutlinedIcon fontSize="inherit" />
              </div>
              <div className="text-gray-600 text-sm">
                Drag photos and videos here
              </div>
              <form>
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-blue-500 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Select from computer
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleSelectPicture}
                />
              </form>
            </div>
          )}

          {next === 1 &&
            (picture.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {picture.map((p, index) => (
                  <div key={index} className="relative w-24 h-24">
                    <img
                      src={p}
                      alt={`Uploaded ${index}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                    <button
                      className="absolute top-0 right-0   text-white  w-6 h-6 flex items-center justify-center"
                      onClick={() => handleDeletePicture(index)}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div>Your list picture is empty</div>
            ))}

          {next === 2 && (
            <div className="flex flex-row gap-6">
              {/* BỐ MÀY DELL LÀM ĐƯỢC PHẦN NÀyNÀy */}

              {/* 
              <div className="flex-[0.7] relative">

                <div className="  ve">



    
                  <img
                    src={picture[0]}
                    alt="Displayed"
                    className="w-full h-full object-cover"
                  />


                </div>

              </div> */}

              <div className="p-4 border rounded-lg shadow-md bg-white w-full max-w-md">
                <div className="flex items-center mb-4">
                  <img
                    src={Avatar}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="ml-2 font-semibold">chi_123kaiz</span>
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Enter caption..."
                    className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={value}
                    onChange={handleValue}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <IconPicker onEmojiChange={handleEmojiSelect} />
                    </div>

                    <div className="text-gray-400 text-sm text-right mt-1">
                      0/2,200
                    </div>
                  </div>
                  <div className="flex justify-between items-center hover:bg-[#ededed] p-3 rounded-lg">
                    <span className="text-gray-700">Add location</span>
                    <div className="text-gray-500">📍</div>
                  </div>

                  <div className="flex justify-between items-center hover:bg-[#ededed] p-2">
                    <span className="text-gray-700">Add collaborators</span>
                    <div className="text-gray-500">🤝</div>
                  </div>

                  <div className="flex justify-between items-center hover:bg-[#ededed] p-2">
                    <span className="text-gray-700">Accessibility</span>
                    <div className="text-gray-500">⬇️</div>
                  </div>

                  <div className="flex justify-between items-center hover:bg-[#ededed] p-2">
                    <span className="text-gray-700">Advanced settings</span>
                    <div className="text-gray-500">⬇️</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ModalCreate;
