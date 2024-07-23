import React from 'react';
import { FaTimes } from "react-icons/fa";

const ImageView = ({ url, onClose }) => {
  const isVideo = url.endsWith('.mp4') || url.endsWith('.mov'); // add more video extensions as needed

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 h-full w-full z-50">
      <button onClick={onClose} className="absolute top-4 right-4 text-white text-3xl">
        <FaTimes />
      </button>
      {isVideo ? (
        <video src={url} controls className="max-w-full max-h-full"></video>
      ) : (
        <img src={url} alt="Preview" className="max-w-full max-h-full w-full h-full object-contain" />
      )}
    </div>
  );
};

export default ImageView;
