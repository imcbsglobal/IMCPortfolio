import React from 'react';
import { FaTimes, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ImageView = ({ urls = [], currentIndex = 0, onClose }) => {
  const [currentIdx, setCurrentIdx] = React.useState(currentIndex);

  React.useEffect(() => {
    setCurrentIdx(currentIndex);
  }, [currentIndex]);

  const isVideo = (url) => {
    return url.endsWith('.mp4') || url.endsWith('.mov'); // add more video extensions as needed
  };

  const handlePrev = () => {
    setCurrentIdx((prevIndex) => (prevIndex === 0 ? urls.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prevIndex) => (prevIndex === urls.length - 1 ? 0 : prevIndex + 1));
  };

  if (urls.length === 0 || currentIdx < 0 || currentIdx >= urls.length) return null; // Prevent rendering if no URLs or invalid index

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 h-full w-full z-50">
      <button onClick={onClose} className="absolute top-4 right-4 text-white text-3xl cursor-pointer">
        <FaTimes />
      </button>
      <button onClick={handlePrev} className="absolute left-4 text-white text-3xl cursor-pointer">
        <FaArrowLeft />
      </button>
      {isVideo(urls[currentIdx]) ? (
        <video src={urls[currentIdx]} controls className="max-w-full max-h-full"></video>
      ) : (
        <img src={urls[currentIdx]} alt="Preview" className="max-w-full max-h-full w-full h-full object-contain" />
      )}
      <button onClick={handleNext} className="absolute right-4 text-white text-3xl cursor-pointer">
        <FaArrowRight />
      </button>
    </div>
  );
};

export default ImageView;
