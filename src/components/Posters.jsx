import React, { useEffect, useState } from 'react';
import { db, storage } from "./Firebase";
import { ref, onValue, remove } from "firebase/database";
import { ref as storageRef, deleteObject } from "firebase/storage";
import UploadFile from './UploadFile';
import ImageView from './ImageView';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase';
import Loader from './Loader';

const Posters = () => {
  const [posters, setPosters] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [showImageView, setShowImageView] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const dbRef = ref(db, 'posters');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const fetchedPosters = [];
      for (let key in data) {
        if (key !== 'latest') {
          fetchedPosters.push({ key, url: data[key].url });
        }
      }
      setPosters(fetchedPosters);
      // Populate images state with fetched posters
      setImages(fetchedPosters);
      setLoading(false); // Set loading to false once data is fetched
    });
  }, []);

  const handleDelete = async (key, url) => {
    try {
      await remove(ref(db, `posters/${key}`));
      const posterRef = storageRef(storage, `Posters/${url.split('/').pop().split('?')[0]}`);
      await deleteObject(posterRef);
      setPosters(posters.filter(poster => poster.key !== key));
    } catch (error) {
      console.error("Error deleting poster:", error);
    }
  };

  const handleView = (index) => {
    setSelectedImage(images.map(img => img.url)); // Set an array of URLs
    setCurrentIndex(index); // Set the initial index
    setShowImageView(true); // Show the ImageView
  };

  const handleCloseImageView = () => {
    setShowImageView(false);
    setSelectedImage([]);
  };

  return (
    <div className='md:ml-[300px] lg:ml-[450px] mt-5 p-5'>
      <section className='Mlg:max-w-[1200px] Mlg:mx-auto'>
        <div>
          <div className='FontStyle-Top text-3xl md:text-[52px] text-[#363636] mb-5 leading-normal'>Our Posters</div>
          <div className='p-5 rounded-2xl text-[#3d1f00] boxShadow xlg:w-[400px] Mlg:w-[600px]'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae nihil praesentium fugit amet, sequi incidunt id recusandae ut aperiam, odit velit eveniet. Reprehenderit fuga aperiam itaque at minus possimus nesciunt?
          </div>
        </div>

        {user && (
          <div>
            <UploadFile storagePath="Posters" dbPath="posters" />
          </div>
        )}

        {loading ? (
          <Loader />
        ) : (
          <div className='grid place-items-center xlg:grid-cols-2 Mlg:grid-cols-3 gap-10 mt-10'>
            {posters.map(({ key, url }, index) => (
              <div key={key} className='h-[300px] w-full rounded-3xl boxShadow relative'>
                <img 
                  src={url} 
                  alt="" 
                  onClick={() => handleView(index)} 
                  className='w-full h-full object-cover rounded-3xl'
                />
                {user && (
                  <div className='absolute flex justify-center items-center mx-auto bottom-5 left-10 md:left-[30%] Delete-View-Btn'>
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

export default Posters;
