import React, { useRef, useState, useEffect } from 'react';
import { FaSquarePlus } from "react-icons/fa6";
import { storage, db } from "./Firebase";
import { BiSolidFileImage } from "react-icons/bi";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ref as dbRef, set, onValue, push } from "firebase/database";

const UploadFile = () => {
  const [imgUrl, setImgUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [isError, setIsError] = useState(false);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const inRef = useRef();

  useEffect(() => {
    const imageRef = dbRef(db, 'images/latest');
    onValue(imageRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setImgUrl(data.url);
      }
    });
  }, []);

  const selectImage = () => {
    inRef.current.click();
  };

  const handleInputFile = (e) => {
    let fileData = e.target.files[0];
    setFile(fileData);
    setFileName(fileData.name);
  };

  const handleImageUpload = () => {
    if (!file) return;
    setIsLoading(true);
    const storageRef = ref(storage, `Images/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setPercentage(Math.round(progress));
    }, (error) => {
      setIsError(true);
      setIsLoading(false);
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
        setImgUrl(url);
        const newImageRef = push(dbRef(db, 'images'));
        set(newImageRef, { url });
        set(dbRef(db, 'images/latest'), { url });  // Set latest image
        setIsLoading(false);
      }).catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
    });
  };

  return (
    <div>
      <div className='flex justify-center items-center gap-10 mt-10'>
        <input type="file" accept='image/*' ref={inRef} className='hidden' onChange={handleInputFile} />
        <button className='text-xl bg-white px-8 py-2 shadow-lg font-bold text-[#343434] rounded-xl flex justify-center items-center gap-2' onClick={selectImage}>
          Select Image <span className='text-[#ff9019]'><BiSolidFileImage /></span>
        </button>
        <button onClick={handleImageUpload} className='flex items-center gap-2 text-xl bg-white px-8 py-2 rounded-xl shadow-lg font-bold text-[#343434]'>
          Upload <span className='text-[#ff9019]'><FaSquarePlus /></span>
        </button>
        {isLoading ? <span>Loading... {percentage}%</span> : <></>}
        {isError ? <span>Error uploading file</span> : <></>}
        {imgUrl ?<h1>Uploaded Successfully</h1>: <></>}
      </div>
    </div>
  );
};

export default UploadFile;
