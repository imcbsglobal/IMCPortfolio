import React, { useRef, useState, useEffect } from 'react';
import { FaSquarePlus } from "react-icons/fa6";
import { storage, db, auth } from "./Firebase";
import { BiSolidFileImage } from "react-icons/bi";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ref as dbRef, set, onValue, push } from "firebase/database";
import { onAuthStateChanged } from 'firebase/auth';

const UploadApp = ({ storagePath, dbPath }) => {
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [firstPhotoFile, setFirstPhotoFile] = useState(null);
    const [secondPhotoFile, setSecondPhotoFile] = useState(null);
    const [thirdPhotoFile, setThirdPhotoFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [percentage, setPercentage] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [user, setUser] = useState(null);
    const [description, setDescription] = useState('');
    
    const thumbnailRef = useRef();
    const firstPhotoRef = useRef();
    const secondPhotoRef = useRef();
    const thirdPhotoRef = useRef();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleFileSelect = (e, setFile) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
        }
    };

    const uploadPhoto = async (file, photoType) => {
        if (!file) return null;
        const photoRef = ref(storage, `${storagePath}/${photoType}_${file.name}`);
        const uploadTask = uploadBytesResumable(photoRef, file);
        
        return new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setPercentage(Math.round(progress));
                },
                (error) => reject(error),
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(downloadURL);
                }
            );
        });
    };

    const handleUpload = async () => {
        if (!thumbnailFile && !firstPhotoFile && !secondPhotoFile && !thirdPhotoFile) {
            alert('Please select all required images');
            return;
        }

        setIsLoading(true);
        try {
            // Upload thumbnail and photos (previous code)
            const thumbnailUrl = await uploadPhoto(thumbnailFile, 'thumbnail');
            const firstPhotoUrl = await uploadPhoto(firstPhotoFile, 'first');
            const secondPhotoUrl = await uploadPhoto(secondPhotoFile, 'second');
            const thirdPhotoUrl = await uploadPhoto(thirdPhotoFile, 'third');

            // Save to database
            const newImageRef = push(dbRef(db, dbPath));
            await set(newImageRef, {
                thumbnailUrl,
                photos: [firstPhotoUrl, secondPhotoUrl, thirdPhotoUrl],
                description: description, // Add description to the database
                timestamp: Date.now()
            });

            // Update latest
            await set(dbRef(db, `${dbPath}/latest`), { url: thumbnailUrl });

            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);

            // Reset form
            setThumbnailFile(null);
            setFirstPhotoFile(null);
            setSecondPhotoFile(null);
            setThirdPhotoFile(null);
            setDescription(''); // Reset description
        } catch (error) {
            setIsError(true);
            console.error('Upload error:', error);
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <div className="p-6">
            {user && (
                <div className="">
                    <div className="flex flex-wrap  place-items-center Mlg:flex justify-center items-center Mlg:flex-wrap gap-10">
                        {/* Thumbnail Selection */}
                        <div className="flex flex-wrap items-center">
                            <input 
                                type="file" 
                                ref={thumbnailRef} 
                                className="hidden" 
                                onChange={(e) => handleFileSelect(e, setThumbnailFile)}
                                accept="image/*"
                            />
                            <button 
                                onClick={() => thumbnailRef.current.click()}
                                className="bg-white px-6 py-3 rounded-xl shadow-lg text-[#343434] border border-[#eaeaea] flex items-center gap-2 font-bold"
                            >
                                Select Thumbnail <BiSolidFileImage className="text-[#ff9019]" />
                            </button>
                            {thumbnailFile && <span className="mt-2 text-sm text-green-600">Selected</span>}
                        </div>

                        {/* First Photo Selection */}
                        <div className="flex flex-col items-center">
                            <input 
                                type="file" 
                                ref={firstPhotoRef} 
                                className="hidden" 
                                onChange={(e) => handleFileSelect(e, setFirstPhotoFile)}
                                accept="image/*"
                            />
                            <button 
                                onClick={() => firstPhotoRef.current.click()}
                                className="px-6 py-3 rounded-xl text-[#fff] border-[1px] border-white shadow-lg font-bold bg-[#ff9019]"
                            >
                                Select Photo
                            </button>
                            {firstPhotoFile && <span className="mt-2 text-sm text-green-600">Selected</span>}
                        </div>

                        {/* Second Photo Selection */}
                        {/* <div className="flex flex-col items-center">
                            <input 
                                type="file" 
                                ref={secondPhotoRef} 
                                className="hidden" 
                                onChange={(e) => handleFileSelect(e, setSecondPhotoFile)}
                                accept="image/*"
                            />
                            <button 
                                onClick={() => secondPhotoRef.current.click()}
                                className="bg-[#ff9019] px-6 py-3 rounded-xl text-[#fff] border-[1px] border-white shadow-lg font-bold"
                            >
                                Second Photo
                            </button>
                            {secondPhotoFile && <span className="mt-2 text-sm text-green-600">Selected</span>}
                        </div> */}

                        {/* Third Photo Selection */}
                        {/* <div className="flex flex-col items-center">
                            <input 
                                type="file" 
                                ref={thirdPhotoRef} 
                                className="hidden" 
                                onChange={(e) => handleFileSelect(e, setThirdPhotoFile)}
                                accept="image/*"
                            />
                            <button 
                                onClick={() => thirdPhotoRef.current.click()}
                                className="bg-[#ff9019] px-6 py-3 rounded-xl text-[#fff] border-[1px] border-white font-bold shadow-lg"
                            >
                                Third Photo
                            </button>
                            {thirdPhotoFile && <span className="mt-2 text-sm text-green-600">Selected</span>}
                        </div> */}
                        {/* Description Section */}
                        <div className='w-full flex justify-center items-center border-none outline-none'>
                        <textarea 
                            placeholder='Enter Description' 
                            className='outline-none border-none w-full py-3 px-2 rounded-xl bg-[#ff9019] text-[#fff] border-[#fff] border'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        </div>
                    </div>

                    {/* Upload Button */}
                    <div className="flex justify-center mt-5">
                        <button 
                            onClick={handleUpload}
                            className="bg-white px-8 py-3 rounded-xl shadow-lg text-[#343434] border border-[#eaeaea] flex items-center gap-2 font-bold"
                            disabled={isLoading}
                        >
                            Upload <FaSquarePlus className="text-[#ff9019]" />
                        </button>
                    </div>

                    {/* Status Messages */}
                    <div className="text-center">
                        {isLoading && <p>Uploading... {percentage}%</p>}
                        {isError && <p className="text-red-500">Error occurred during upload</p>}
                        {showSuccess && <p className="text-green-500">Upload successful!</p>}
                    </div>
                </div>
            )}
        </div>
  )
}

export default UploadApp
