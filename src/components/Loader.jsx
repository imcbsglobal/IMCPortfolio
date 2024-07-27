import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../Animation.json';

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="flex justify-center items-center h-full">
      <Lottie options={defaultOptions} height={150} width={150} />
    </div>
  );
};

export default Loader;
