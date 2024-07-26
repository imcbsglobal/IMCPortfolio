import React from 'react';

const VideoView = ({ url, onClose }) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 z-50'>
      <button onClick={onClose} className='absolute top-4 right-4 text-white text-3xl'>X</button>
      <iframe 
        width="80%" 
        height="80%" 
        src={url} 
        title="Video Player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" 
        className='rounded-3xl border-[1px] border-white' 
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoView;
