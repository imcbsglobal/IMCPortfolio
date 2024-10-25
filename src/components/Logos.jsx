import React, { useEffect, useState } from 'react';
import { db, storage, auth } from "./Firebase";
import { ref, onValue, remove } from "firebase/database";
import { ref as storageRef, deleteObject } from "firebase/storage";
import UploadFile from './UploadFile';
import { onAuthStateChanged } from 'firebase/auth';
import ImageView from './ImageView';
import Loader from './Loader';
import Navbar from './Navbar';


const Logos = () => {
  const [logos, setLogos] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [showImageView, setShowImageView] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  // Check if admin is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch logos and update state
  useEffect(() => {
    const dbRef = ref(db, 'logos');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const fetchedLogos = [];
      for (let key in data) {
        if (key !== 'latest') {
          fetchedLogos.push({ key, url: data[key].url });
        }
      }
      setLogos(fetchedLogos);
      setImages(fetchedLogos); // Set images state
      setLoading(false); // Set loading to false once data is fetched
    });
  }, []);

  // Handle delete action
  const handleDelete = async (key, url) => {
    try {
      await remove(ref(db, `logos/${key}`));
      const logoRef = storageRef(storage, `Logos/${url.split('/').pop().split('?')[0]}`);
      await deleteObject(logoRef);
      setLogos(logos.filter(logo => logo.key !== key));
    } catch (error) {
      console.error("Error deleting logo:", error);
    }
  };

  // Handle view action
  const handleView = (index) => {
    setSelectedImage(images.map(img => img.url)); // Set an array of URLs
    setCurrentIndex(index); // Set the initial index
    setShowImageView(true); // Show the ImageView
  };

  // Close ImageView
  const handleCloseImageView = () => {
    setShowImageView(false);
    setSelectedImage([]);
  };

  return (
    <div className='w-full overflow-auto'>
      <div className='md:flex justify-center w-full h-screen'>
        <div className='flex'>
          <div className='md:w-[35%] xlg:w-[400px]'>
            <div className='h-screen fixed top-0 left-0 bottom-0 md:w-[25%] xlg:w-[400px] z-[999] md:z-50'>
              <Navbar/>
            </div>
          </div>
          <div className="md:w-[65%] xlg:ml-[100px] xlg:w-full w-full mt-5 p-5">
            <section className="Mlg:max-w-[1200px] Mlg:mx-auto mt-16 md:mt-0">
              <div>
                <div className="FontStyle-Top text-3xl md:text-[52px] text-[#363636] mb-5 leading-normal text-center">
                  Logos
                </div>
              </div>

              {user && user.email === "info@imcbsglobal.com" && (
                <div>
                  <UploadFile storagePath="Logos" dbPath="logos" />
                </div>
              )}

              {loading ? (
                <Loader />
              ) : (
                <div className="grid place-items-center xlg:grid-cols-2 Mlg:grid-cols-3 gap-10 mt-5">
                  {logos.map(({ key, url }, index) => (
                    <div
                      key={key}
                      className="h-[300px] w-[300px] xlg:w-full rounded-3xl boxShadow1 relative"
                    >
                      <img
                        src={url}
                        alt=""
                        onClick={() => handleView(index)} // Pass the index to handleView
                        className="w-full h-full object-contain rounded-3xl"
                      />
                      {user && user.email === "info@imcbsglobal.com" && (
                        <div className="absolute flex justify-center items-center mx-auto bottom-5 left-[30%] Delete-View-Btn">
                          <button
                            onClick={() => handleDelete(key, url)}
                            className="font-bold shadow-2xl px-8 py-2 bg-[#ff8912] rounded-3xl text-white text-center mx-auto"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                  {showImageView && (
                    <ImageView
                      urls={selectedImage} // Pass the image URLs
                      currentIndex={currentIndex} // Current index in the array
                      onClose={handleCloseImageView}
                    />
                  )}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logos;
