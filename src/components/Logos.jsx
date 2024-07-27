import React, { useEffect, useState } from 'react';
import { db, storage, auth } from "./Firebase";
import { ref, onValue, remove } from "firebase/database";
import { ref as storageRef, deleteObject } from "firebase/storage";
import UploadFile from './UploadFile';
import { onAuthStateChanged } from 'firebase/auth';
import ImageView from './ImageView';
import Loader from './Loader';

const Logos = () => {
  const [logos, setLogos] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [showImageView, setShowImageView] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

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
    <div className='md:ml-[300px] lg:ml-[450px] mt-5 p-5'>
      <section>
        <div>
          <div className='FontStyle-Top text-3xl md:text-[52px] text-[#363636] mb-5'>Our Logos</div>
          <div className='p-5 rounded-2xl text-[#3d1f00] boxShadow md:w-[400px] lg:w-[600px]'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae nihil praesentium fugit amet, sequi incidunt id recusandae ut aperiam, odit velit eveniet. Reprehenderit fuga aperiam itaque at minus possimus nesciunt?
          </div>
        </div>

        {user && (
          <div>
            <UploadFile storagePath="Logos" dbPath="logos" />
          </div>
        )}

        {loading ? (
          <Loader />
        ) : (
          <div className='grid place-items-center md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10'>
            {logos.map(({ key, url }, index) => (
              <div key={key} className='h-[300px] w-full rounded-3xl boxShadow1 relative'>
                <img 
                  src={url} 
                  alt="" 
                  onClick={() => handleView(index)} // Pass the index to handleView
                  className='w-full h-full object-contain rounded-3xl' 
                />
                {user && (
                  <div className='absolute flex justify-center items-center mx-auto bottom-5 left-[30%] Delete-View-Btn'>
                    <button 
                      onClick={() => handleDelete(key, url)} 
                      className='font-bold shadow-2xl px-8 py-2 bg-[#ff8912] rounded-3xl text-white text-center mx-auto'
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
  );
};

export default Logos;
