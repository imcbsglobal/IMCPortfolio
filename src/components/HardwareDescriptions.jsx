import React, { useState, useEffect } from 'react';
import { IoCloseCircleSharp } from "react-icons/io5";

const HardwareDescriptions = ({ setOpenDescription, openDescription, description }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleClose = () => {
      setOpenDescription(false);
      // setDescription(""); 
  };
  
    return (
        <div className='fixed w-full h-screen bottom-0 top-0 right-0 left-0 bg-[#f7f2ecb4] z-[999] flex justify-center items-center px-2'>
            <div className='text-[#000] font-bold text-2xl absolute top-5 right-5'>
                <IoCloseCircleSharp
                    className="cursor-pointer"
                    onClick={handleClose}  // Move onClick to the icon itself and use the new handler
                />
            </div>
            <div className='w-full px-2 Mlg:max-w-[900px] Mlg:w-full rounded-3xl GlassBg2 p-5'>
                <div className='text-justify p-5 text-[#fff]'>
                    {description || "No description available."}
                </div>
            </div>
        </div>
    );
};

export default HardwareDescriptions;