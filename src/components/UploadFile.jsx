// import React, { useRef, useState, useEffect } from 'react';
// import { FaSquarePlus } from "react-icons/fa6";
// import { storage, db, auth } from "./Firebase";
// import { BiSolidFileImage } from "react-icons/bi";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { ref as dbRef, set, onValue, push } from "firebase/database";
// import { onAuthStateChanged } from 'firebase/auth';

// const UploadFile = ({ storagePath, dbPath }) => {
//   const [imgUrl, setImgUrl] = useState('');
//   const [fileName, setFileName] = useState('');
//   const [isError, setIsError] = useState(false);
//   const [file, setFile] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [percentage, setPercentage] = useState(0);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const inRef = useRef();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const imageRef = dbRef(db, `${dbPath}/latest`);
//     onValue(imageRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         setImgUrl(data.url);
//       }
//     });

//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//     return () => unsubscribe();
//   }, [dbPath]);

//   const selectImage = () => {
//     inRef.current.click();
//   };

//   const handleInputFile = (e) => {
//     let fileData = e.target.files[0];
//     setFile(fileData);
//     setFileName(fileData.name);
//   };

//   const handleImageUpload = () => {
//     if (!file) return;
//     setIsLoading(true);
//     const storageRef = ref(storage, `${storagePath}/${fileName}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on('state_changed', (snapshot) => {
//       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       setPercentage(Math.round(progress));
//     }, (error) => {
//       setIsError(true);
//       setIsLoading(false);
//     }, () => {
//       getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
//         setImgUrl(url);
//         const newImageRef = push(dbRef(db, dbPath));
//         set(newImageRef, { url });
//         set(dbRef(db, `${dbPath}/latest`), { url });  // Set latest image
//         setIsLoading(false);
//         setShowSuccess(true);
//         setTimeout(() => {
//           setShowSuccess(false);
//         }, 5000); // Hide the success message after 5 seconds
//       }).catch(() => {
//         setIsError(true);
//         setIsLoading(false);
//       });
//     });
//   };

//   return (
//     <div>
//       <div className='flex justify-center items-center gap-10 mt-10'>
//         <input type="file" accept='image/*,video/*,application/pdf'  ref={inRef} className='hidden' onChange={handleInputFile} />
//         <input type="text" placeholder='Url' />
//         {user && (
//           <>
//             <button className='md:text-xl text-sm bg-white px-8 py-2 shadow-lg font-bold text-[#343434] rounded-xl flex justify-center items-center gap-2' onClick={selectImage}>
//               Select<span className='text-[#ff9019]'><BiSolidFileImage /></span>
//             </button>
//             <button onClick={handleImageUpload} className='flex items-center gap-2 md:text-xl text-sm bg-white px-8 py-2 rounded-xl shadow-lg font-bold text-[#343434]'>
//               Upload <span className='text-[#ff9019]'><FaSquarePlus /></span>
//             </button>
//           </>
//         )}
//       </div>
//       <div className='text-center mt-10'>
//         {isLoading ? <span className='text-sm md:text-xl font-semibold fontName text-[#343434]'>Loading... {percentage}<span className='text-[#ff9019]'>%</span></span> : null}
//         {isError ? <span className='text-sm md:text-xl font-semibold fontName text-[#343434]'>Error <span className='text-[#ff9019]'>Uploading</span> File</span> : null}
//         {showSuccess && <h1 className='text-sm md:text-xl font-base fontName text-[#343434]'>Uploaded <span className='text-[#ff9019]'>Successfully</span></h1>}
//       </div>
//     </div>
//   );
// };

// export default UploadFile;
import React, { useRef, useState, useEffect } from 'react';
import { FaSquarePlus } from "react-icons/fa6";
import { storage, db, auth } from "./Firebase";
import { BiSolidFileImage } from "react-icons/bi";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ref as dbRef, set, onValue, push } from "firebase/database";
import { onAuthStateChanged } from 'firebase/auth';

const UploadFile = ({ storagePath, dbPath }) => {
  const [imgUrl, setImgUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [isError, setIsError] = useState(false);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [playStoreLink, setPlayStoreLink] = useState('');
  const inRef = useRef();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const imageRef = dbRef(db, `${dbPath}/latest`);
    onValue(imageRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setImgUrl(data.url);
      }
    });

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [dbPath]);

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
    const storageRef = ref(storage, `${storagePath}/${fileName}`);
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
        const newImageRef = push(dbRef(db, dbPath));
        set(newImageRef, { url, playStoreLink });
        set(dbRef(db, `${dbPath}/latest`), { url });
        setIsLoading(false);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      }).catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
    });
  };

  return (
    <div>
      <div className='flex justify-center items-center gap-10 mt-10'>
        <input type="file" accept='image/*,video/*,application/pdf' ref={inRef} className='hidden' onChange={handleInputFile} />
        {user && (
          <div className=' grid place-items-center lg:grid-cols-2'>
            <div>
              <input type="text" placeholder='Enter The Url' value={playStoreLink} onChange={(e) => setPlayStoreLink(e.target.value)} className='py-2 px-8 outline-none rounded-xl shadow-lg bg-white border border-[#eaeaea]' />
            </div>
            <div className=' flex justify-center items-center gap-10 mt-5 lg:mt-0'>
              <button className='md:text-xl text-sm bg-white px-8 py-2 shadow-lg font-bold text-[#343434] rounded-xl flex justify-center items-center gap-2 border border-[#eaeaea]' onClick={selectImage}>
                Select<span className='text-[#ff9019]'><BiSolidFileImage /></span>
              </button>
              <button onClick={handleImageUpload} className='flex items-center gap-2 md:text-xl text-sm bg-white px-8 py-2 rounded-xl shadow-lg font-bold text-[#343434] border border-[#eaeaea]'>
                Upload <span className='text-[#ff9019]'><FaSquarePlus /></span>
              </button>
            </div>
          </div>
        )}
      </div>
      <div className='text-center mt-10'>
        {isLoading ? <span className='text-sm md:text-xl font-semibold fontName text-[#343434]'>Loading... {percentage}<span className='text-[#ff9019]'>%</span></span> : null}
        {isError ? <span className='text-sm md:text-xl font-semibold fontName text-[#343434]'>Error <span className='text-[#ff9019]'>Uploading</span> File</span> : null}
        {showSuccess && <h1 className='text-sm md:text-xl font-base fontName text-[#343434]'>Uploaded <span className='text-[#ff9019]'>Successfully</span></h1>}
      </div>
    </div>
  );
};

export default UploadFile;
