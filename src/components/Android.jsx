import React, { useEffect, useState } from 'react';
import { db, storage } from "./Firebase";
import { ref, onValue, remove } from "firebase/database";
import { ref as storageRef, deleteObject } from "firebase/storage";
import UploadFile from './UploadFile';
import ImageView from './ImageView';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase';
import Loader from './Loader';
import { Helmet } from 'react-helmet';


const Android = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [showImageView, setShowImageView] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null);


  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const dbRef = ref(db, 'android');
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
      await remove(ref(db, `android/${key}`));
      const imageRef = storageRef(storage, `Android/${url.split('/').pop().split('?')[0]}`);
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
    <>
    <Helmet>
        <title>Our Websites | Quality Web Development</title>
        <meta name="description" content="Explore our diverse range of websites developed to enhance your business. View, manage, and upload your website assets with ease." />
        <meta name="keywords" content="web development, websites, upload website, manage websites, quality web solutions,web development in wayanad, web development in kerala, wesite, website in wayanad,graphic designing in wayanad, digital marketing in wayanad, digital marketing in wayand,imc,imcbs, imc business, imc business solutions, imc wayanad, imc kerala, imc india,website kerala, web design kerala, web development kerala" />
      </Helmet>
    <div className='md:ml-[300px] lg:ml-[450px] mt-5 p-5'>
        <section className='Mlg:max-w-[1200px] Mlg:mx-auto'>
            <div>
                <div className='FontStyle-Top text-3xl md:text-[52px] text-[#363636] mb-5 leading-normal text-center'>Our Mobile Apps</div>
            </div>

            {user && (
              <div>
                <UploadFile storagePath="Android" dbPath="android" />
              </div>
            )}
            
            {loading ? (
              <Loader/>
            ) : (
              <div className='grid place-items-center xlg:grid-cols-2 Mlg:grid-cols-3 gap-10 mt-10'>
                {images.map(({ key, url, playStoreLink }) => (
                    <div key={key} className='h-[300px] w-full rounded-3xl boxShadow relative'>
                        <img src={url} alt="" onClick={() => handleView(url)} className='w-full h-full object-cover rounded-3xl'/>
                        
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
    </>
  );
};

export default Android;
