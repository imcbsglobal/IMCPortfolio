import React, { useRef, useState, useEffect } from 'react';
import { FaSquarePlus } from "react-icons/fa6";
import { storage, db, auth } from "./Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ref as dbRef, set, push } from "firebase/database";
import { onAuthStateChanged } from 'firebase/auth';

const UploadPdf = ({ storagePath, dbPath }) => {
  const [pdfUrl, setPdfUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [isError, setIsError] = useState(false);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const inRef = useRef();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const selectFile = () => {
    inRef.current.click();
  };

  const handleInputFile = (e) => {
    const fileData = e.target.files[0];
    if (fileData && fileData.type === 'application/pdf') {
      setFile(fileData);
      setFileName(fileData.name);
      setIsError(false); // Reset error state if file is valid
    } else {
      setIsError(true);
    }
  };

  const handleFileUpload = () => {
    if (!file) return;
    setIsLoading(true);
    setIsError(false); // Reset error state before uploading
    const storageRef = ref(storage, `${storagePath}/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

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
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setPdfUrl(url);
          console.log("Upload complete, URL:", url);
          const newFileRef = push(dbRef(db, dbPath));
          await set(newFileRef, { url });
          await set(dbRef(db, `${dbPath}/latest`), { url });
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
  };

  return (
    <div>
      <div className='flex justify-center items-center gap-10 mt-10'>
        <input 
          type="file" 
          accept='application/pdf' 
          ref={inRef} 
          className='hidden' 
          onChange={handleInputFile} 
        />
        {user && (
          <div className='flex justify-center items-center gap-10 mt-10'>
            <button 
              className='md:text-xl text-sm bg-white px-8 py-2 shadow-lg font-bold text-[#343434] rounded-xl flex justify-center items-center gap-2 border border-[#eaeaea]' 
              onClick={selectFile}
            >
              Select<span className='text-[#ff9019]'><FaSquarePlus /></span>
            </button>
            <button 
              onClick={handleFileUpload} 
              className='flex items-center gap-2 md:text-xl text-sm bg-white px-8 py-2 rounded-xl shadow-lg font-bold text-[#343434] border border-[#eaeaea]'
              disabled={!file || isLoading}
            >
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
