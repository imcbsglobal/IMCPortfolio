import React, { useEffect, useState } from 'react';
import { db, storage } from "./Firebase";
import { ref, onValue, remove } from "firebase/database";
import { ref as storageRef, deleteObject } from "firebase/storage";
import UploadFile from './UploadFile';
import ImageView from './ImageView';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase';
import Loader from './Loader';

const Facebook = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [showImageView, setShowImageView] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null);


  // Check if Admin is Logged In
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const dbRef = ref(db, 'facebookPages');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const fetchedImages = [];
      for (let key in data) {
        if (key !== 'latest') {
          fetchedImages.push({ key, url: data[key].url, playStoreLink: data[key].playStoreLink });
        }
      }
      setImages(fetchedImages);
      setLoading(false)
    });
  }, []);

  const handleDelete = async (key, url) => {
    try {
      await remove(ref(db, `facebookPages/${key}`));
      const imageRef = storageRef(storage, `Facebook/${url.split('/').pop().split('?')[0]}`);
      await deleteObject(imageRef);
      setImages(images.filter(image => image.key !== key));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleView = (urls, index) => {
    setSelectedImage(urls); // Set an array of URLs
    setCurrentIndex(index); // Set the initial index
    setShowImageView(true); // Show the ImageView
  };

  const handleCloseImageView = () => {
    setShowImageView(false);
    setSelectedImage([]);
  };

  return (
    <div className='md:ml-[300px] lg:ml-[450px] mt-5 p-5'>
      <section>
        <div>
          <div className='FontStyle-Top text-3xl md:text-[52px] text-[#363636] mb-5'>Our Facebook Pages</div>
          <div className='p-5 rounded-2xl text-[#3d1f00] boxShadow md:w-[400px] lg:w-[600px]'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae nihil praesentium fugit amet, sequi incidunt id recusandae ut aperiam, odit velit eveniet. Reprehenderit fuga aperiam itaque at minus possimus nesciunt?
          </div>
        </div>

        {user && (
          <div>
            <UploadFile storagePath="Facebook" dbPath="facebookPages" />
          </div>
        )}

        {loading ? (
          <Loader/>
        ) : (
          <div className='grid place-items-center md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10'>
          {images.map(({ key, url, playStoreLink }, index) => (
            <div key={key} className='h-[300px] w-full rounded-3xl boxShadow relative'>
              <img src={url} alt="" onClick={() => handleView(images, index)} className='w-full h-full object-cover rounded-3xl'/>
              
              <div className='absolute flex justify-center items-center mx-auto bottom-5 left-5 Delete-View-Btn gap-5'>
                {user && (
                  <button onClick={() => handleDelete(key, url)} className='font-bold shadow-2xl px-8 py-2 bg-[#ff8912] rounded-3xl text-white text-center mx-auto'>Delete</button>
                )}
                <button onClick={() => window.open(playStoreLink, '_blank')} className='font-bold shadow-2xl px-8 py-2 rounded-3xl bg-white'>View</button>
              </div>
            </div>
          ))}
          {showImageView && (
            <ImageView 
              urls={images.map(img => img.url)} // Pass all image URLs
              currentIndex={currentIndex} // Current index in the array
              onClose={handleCloseImageView} 
            />
          )}
        </div>
        )}
       
      </section>
    </div>
  )
}

export default Facebook
