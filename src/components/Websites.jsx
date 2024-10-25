import React, { useEffect, useState } from 'react';
import { db, storage, auth } from './Firebase';
import { ref, onValue, remove } from 'firebase/database';
import { ref as storageRef, deleteObject } from 'firebase/storage';
import UploadFile from './UploadFile';
import ImageView from './ImageView';
import { onAuthStateChanged } from 'firebase/auth';
import Loader from './Loader';
import Navbar from './Navbar';

const Websites = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [showImageView, setShowImageView] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

 // Check if Admin is Logged In
 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  return () => unsubscribe();
}, []);

  useEffect(() => {
    const dbRef = ref(db, 'websites');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const fetchedImages = [];
      for (let key in data) {
        if (key !== 'latest') {
          fetchedImages.push({ key, url: data[key].url, playStoreLink: data[key].playStoreLink });
        }
      }
      setImages(fetchedImages);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (key, url) => {
    try {
      await remove(ref(db, `websites/${key}`));
      const imageRef = storageRef(storage, `Websites/${url.split('/').pop().split('?')[0]}`);
      await deleteObject(imageRef);
      setImages(images.filter((image) => image.key !== key));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleView = (index) => {
    setSelectedImage(images.map((img) => img.url)); // This remains as the array of URLs
    setCurrentIndex(index); // Pass the clicked index
    setShowImageView(true); // Show the ImageView
  };
  
  const handleCloseImageView = () => {
    setShowImageView(false);
    setSelectedImage([]);
  };

  return (
    <div className='w-full overflow-auto'>
      <div className='md:flex justify-center w-full h-screen'>
        <div className='flex w-full'>
          <div className='md:w-[30%] xlg:w-[400px]'>
            <div className=' h-screen fixed top-0 left-0 bottom-0 xlg:w-[400px] md:w-[25%] z-[999] md:z-50'>
              <Navbar/>
            </div>
          </div>
          <div className="md:w-[75%] xlg:w-full xlg:ml-[100px] w-full mt-5">
        <section className='Mlg:max-w-[1200px] Mlg:mx-auto mt-16 md:mt-0'>
          <div>
            <div className="FontStyle-Top text-3xl md:text-[52px] text-[#363636] leading-normal text-center">
              Websites
            </div>
          </div>

          {user && user.email === "info@imcbsglobal.com" && (
            <div>
              <UploadFile storagePath="Websites" dbPath="websites" />
            </div>
          )}

          {loading ? (
            <Loader />
          ) : (
            <div className="grid place-items-center md:grid-cols-1 xlg:grid-cols-2 Mlg:grid-cols-3 gap-10 mt-2">
              {images.map(({ key, url, playStoreLink }, index) => (
                <div key={key} className="h-[300px] w-[300px] Mlg:w-full rounded-3xl boxShadow relative">
                  <img
                    src={url}
                    alt=""
                    onClick={() => handleView(index)}
                    className="w-full h-full object-cover rounded-3xl"
                  />

                  <div className="absolute flex justify-center items-center mx-auto bottom-5 left-5 Delete-View-Btn gap-5">
                    {user && user.email === "info@imcbsglobal.com" && (
                      <button
                        onClick={() => handleDelete(key, url)}
                        className="font-bold shadow-2xl px-8 py-2 bg-[#ff8912] rounded-3xl text-white text-center mx-auto"
                      >
                        Delete
                      </button>
                    )}
                    <button
                      onClick={() => window.open(playStoreLink, '_blank')}
                      className="font-bold shadow-2xl px-8 py-2 rounded-3xl bg-white"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
              {showImageView && (
                <div className=''>
                    <ImageView 
                    urls={selectedImage} // Pass the image URLs
                    currentIndex={currentIndex} // Current index in the array
                    onClose={handleCloseImageView} 
                    />
                </div>
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

export default Websites;
