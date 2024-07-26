import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ImageView = ({ urls = [], currentIndex = 0, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(currentIndex);
  const [showContent, setShowContent] = useState(true);
  const contentRef = useRef(null);
  const [startX, setStartX] = useState(null);

  useEffect(() => {
    setCurrentIdx(currentIndex);
  }, [currentIndex]);

  const isVideo = (url) => {
    return url.endsWith('.mp4') || url.endsWith('.mov'); // Add more video extensions as needed
  };

  const handlePrev = () => {
    setShowContent(false);
    setTimeout(() => {
      setCurrentIdx((prevIndex) => (prevIndex === 0 ? urls.length - 1 : prevIndex - 1));
      setShowContent(true);
    }, 500); // Match the transition duration
  };

  const handleNext = () => {
    setShowContent(false);
    setTimeout(() => {
      setCurrentIdx((prevIndex) => (prevIndex === urls.length - 1 ? 0 : prevIndex + 1));
      setShowContent(true);
    }, 500); // Match the transition duration
  };

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const threshold = 50; // Minimum swipe distance to register as a swipe
    if (startX - endX > threshold) {
      handleNext();
    } else if (endX - startX > threshold) {
      handlePrev();
    }
  };

  if (urls.length === 0 || currentIdx < 0 || currentIdx >= urls.length) return null; // Prevent rendering if no URLs or invalid index

  return (
    <div 
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-50"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 text-white text-3xl cursor-pointer z-10"
      >
        <FaTimes />
      </button>
      <button 
        onClick={handlePrev} 
        className="absolute left-4 text-white text-3xl cursor-pointer z-10"
      >
        <FaArrowLeft />
      </button>
      <div className="image-view-container">
        <div 
          className={`image-view-content ${showContent ? 'show' : ''}`}
          ref={contentRef}
        >
          {isVideo(urls[currentIdx]) ? (
            <video 
              src={urls[currentIdx]} 
              controls 
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <img 
              src={urls[currentIdx]} 
              alt="Preview" 
              className="max-w-full max-h-full object-contain"
            />
          )}
        </div>
      </div>
      <button 
        onClick={handleNext} 
        className="absolute right-4 text-white text-3xl cursor-pointer"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default ImageView;
