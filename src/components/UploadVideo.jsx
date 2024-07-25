import React, { useState, useEffect } from 'react';
import { FaSquarePlus } from "react-icons/fa6";
import { db, auth } from "./Firebase";
import { ref as dbRef, set, push, remove } from "firebase/database";
import { onAuthStateChanged } from 'firebase/auth';

const UploadVideo = ({ dbPath }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleVideoUpload = () => {
    if (!videoUrl) return;
    setIsLoading(true);

    // Remove the current latest video before uploading a new one
    const latestVideoRef = dbRef(db, `${dbPath}/latest`);
    remove(latestVideoRef)
      .then(() => {
        // Upload the new video to the latest path
        return set(latestVideoRef, { url: videoUrl });
      })
      .then(() => {
        setIsLoading(false);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
        setVideoUrl('');
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  };

  return (
    <div>
      {user && (
        <div className='flex flex-col justify-center items-center gap-5 mt-10'>
          <input
            type="text"
            placeholder='Enter the YouTube URL'
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className='py-2 px-8 outline-none rounded-xl shadow-lg bg-white border border-[#eaeaea]'
          />
          <button onClick={handleVideoUpload} className='flex items-center gap-2 md:text-xl text-sm bg-white px-8 py-2 rounded-xl shadow-lg font-bold text-[#343434] border border-[#eaeaea]'>
            Upload <span className='text-[#ff9019]'><FaSquarePlus /></span>
          </button>
          {isLoading ? <span className='text-sm md:text-xl font-semibold fontName text-[#343434]'>Loading...</span> : null}
          {isError ? <span className='text-sm md:text-xl font-semibold fontName text-[#343434]'>Error <span className='text-[#ff9019]'>Uploading</span> URL</span> : null}
          {showSuccess && <h1 className='text-sm md:text-xl font-base fontName text-[#343434]'>Uploaded <span className='text-[#ff9019]'>Successfully</span></h1>}
        </div>
      )}
    </div>
  )
}

export default UploadVideo;
