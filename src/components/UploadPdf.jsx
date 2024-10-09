import React, { useRef, useState, useEffect } from 'react';
import { FaSquarePlus } from "react-icons/fa6";
import { storage, db, auth } from "./Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ref as dbRef, set, push } from "firebase/database";
import { onAuthStateChanged } from 'firebase/auth';

const UploadPdf = ({ storagePath, dbPath }) => {
  const [pdfUrl, setPdfUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [isError, setIsError] = useState(false);
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const inRef = useRef();
  const thumbnailRef = useRef();
  const [brochureType, setBrochureType] = useState('common'); // Default to 'common'
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleBrochureTypeChange = (e) => {
    setBrochureType(e.target.value.toLowerCase());
  };

  const selectFile = () => {
    inRef.current.click();
  };

  const selectThumbnail = () => {
    thumbnailRef.current.click();
  };

  const handleInputFile = (e) => {
    const fileData = e.target.files[0];
    if (fileData && fileData.type === 'application/pdf') {
      setFile(fileData);
      setFileName(fileData.name);
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const handleInputThumbnail = (e) => {
    const fileData = e.target.files[0];
    if (fileData && fileData.type.startsWith('image/')) {
      setThumbnail(fileData);
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const handleFileUpload = () => {
    if (!file || !thumbnail) return;
    setIsLoading(true);
    setIsError(false);

    const storageRef = ref(storage, `${storagePath}/${brochureType}/${fileName}`);
    const thumbnailRef = ref(storage, `${storagePath}/thumbnails/${brochureType}/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, file);
    const uploadThumbnailTask = uploadBytesResumable(thumbnailRef, thumbnail);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercentage(Math.round(progress));
      },
      (error) => {
        console.error("Upload error:", error);
        setIsError(true);
        setIsLoading(false);
      },
      async () => {
        try {
          const pdfUrl = await getDownloadURL(uploadTask.snapshot.ref);
          setPdfUrl(pdfUrl);
          uploadThumbnailTask.on('state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setPercentage(Math.round(progress));
            },
            (error) => {
              console.error("Thumbnail upload error:", error);
              setIsError(true);
              setIsLoading(false);
            },
            async () => {
              try {
                const thumbnailUrl = await getDownloadURL(uploadThumbnailTask.snapshot.ref);
                setThumbnailUrl(thumbnailUrl);
                const newFileRef = push(dbRef(db, `${dbPath}/${brochureType}`));
                await set(newFileRef, { 
                  name: fileName, 
                  pdfUrl, 
                  thumbnailUrl,
                  type: brochureType
                });
                setIsLoading(false);
                setShowSuccess(true);
                setTimeout(() => {
                  setShowSuccess(false);
                }, 5000);
              } catch (error) {
                console.error("Error getting download URL or updating database:", error);
                setIsError(true);
                setIsLoading(false);
              }
            }
          );
        } catch (error) {
          console.error("Error getting download URL or updating database:", error);
          setIsError(true);
          setIsLoading(false);
        }
      }
    );
  };

  return (
    <div>
      <div className='flex justify-center items-center gap-10 mt-10'>
        <input type="file" accept='application/pdf' ref={inRef} className='hidden' onChange={handleInputFile} />
        <input type="file" accept='image/*' ref={thumbnailRef} className='hidden' onChange={handleInputThumbnail} />
        {user && (
          <div className='grid grid-cols-2 place-items-center place-content-center Mlg:grid-cols-3 justify-center items-center gap-10 mt-10'>
          <button className='md:text-xl text-sm bg-white px-8 py-2 shadow-lg font-bold text-[#343434] rounded-xl flex justify-center items-center gap-2 border border-[#eaeaea]' onClick={selectFile}>
            Select PDF<span className='text-[#ff9019]'><FaSquarePlus /></span>
          </button>
          <button className='md:text-xl text-sm bg-white px-8 py-2 shadow-lg font-bold text-[#343434] rounded-xl flex justify-center items-center gap-2 border border-[#eaeaea]' onClick={selectThumbnail}>
            Select Thumbnail<span className='text-[#ff9019]'><FaSquarePlus /></span>
          </button>
          <select 
            onChange={handleBrochureTypeChange} 
            className='md:text-xl text-sm bg-white px-8 py-2 shadow-lg font-bold text-[#343434] rounded-xl flex justify-center items-center gap-2 border border-[#eaeaea]'
          >
            <option value="Common">Common Brochure</option>
            <option value="Own">Own Brochure</option>
          </select>
          <button onClick={handleFileUpload} className='flex items-center gap-2 md:text-xl text-sm bg-white px-8 py-2 rounded-xl shadow-lg font-bold text-[#343434] border border-[#eaeaea]' disabled={!file || !thumbnail || isLoading}>
            Upload <span className='text-[#ff9019]'><FaSquarePlus /></span>
          </button>
        </div>
        )}
      </div>
      <div className='text-center mt-10'>
        {isLoading && <span className='text-sm md:text-xl font-semibold fontName text-[#343434]'>Loading... {percentage}%</span>}
        {isError && <span className='text-sm md:text-xl font-semibold fontName text-[#343434]'>Error <span className='text-[#ff9019]'>Uploading</span> File</span>}
        {showSuccess && <h1 className='text-sm md:text-xl font-base fontName text-[#343434]'>Uploaded <span className='text-[#ff9019]'>Successfully</span></h1>}
      </div>
    </div>
  );
};

export default UploadPdf;
