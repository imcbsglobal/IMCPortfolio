import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaArrowLeft, FaArrowRight, FaSearchPlus, FaSearchMinus } from "react-icons/fa";

const AppImageView = ({ photos = [], onClose }) => {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [showContent, setShowContent] = useState(true);
    const [zoom, setZoom] = useState(1);
    const [startX, setStartX] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const isVideo = (url) => {
    return typeof url === 'string' && (url.endsWith('.mp4') || url.endsWith('.mov')); // Add more video extensions as needed
  };
  

  const handlePrev = () => {
    setShowContent(false);
    setTimeout(() => {
        setCurrentIdx((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
        setShowContent(true);
        setZoom(1);
    }, 300);
};

const handleNext = () => {
    setShowContent(false);
    setTimeout(() => {
        setCurrentIdx((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
        setShowContent(true);
        setZoom(1);
    }, 300);
};

const handleTouchStart = (e) => setStartX(e.touches[0].clientX);

const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const threshold = 50;
    if (startX - endX > threshold) handleNext();
    else if (endX - startX > threshold) handlePrev();
};


const zoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 3));
const zoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 1));

  const handleDoubleClick = () => {
    zoomIn();
  };

  if (!photos.length) return null;

  return (
    <div className=' inset-0  bg-black bg-opacity-80 z-50 fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center h-[100vh]'>
      <div 
      className="relative w-full h-full"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onDoubleClick={zoomIn}
    >
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 text-white text-3xl cursor-pointer z-10"
      >
        <FaTimes />
      </button>
      <button 
        onClick={handlePrev} 
        className="absolute left-4 text-white text-3xl cursor-pointer z-10 hidden md:block"
      >
        <FaArrowLeft />
      </button>
      <div className="h-full flex justify-center items-center">
        <div 
            className={`transition-opacity duration-300 ${showContent ? 'opacity-100' : 'opacity-0'}`}
            style={{ transform: `scale(${zoom})` }}
        >
            <img 
                src={photos[currentIdx]} 
                alt={`Photo ${currentIdx + 1}`}
                className="max-h-[90vh] w-auto object-contain"
            />
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
        <button onClick={zoomIn} className="text-white text-2xl cursor-pointer z-10">
          <FaSearchPlus />
        </button>
        <button onClick={zoomOut} className="text-white text-2xl cursor-pointer z-10">
          <FaSearchMinus />
        </button>
      </div>
      <button 
        onClick={handleNext} 
        className="absolute right-4 text-white text-3xl cursor-pointer hidden md:block"
      >
        <FaArrowRight />
      </button>
    </div>
    </div>
  )
}

export default AppImageView
