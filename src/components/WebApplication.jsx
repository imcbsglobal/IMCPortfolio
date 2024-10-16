import React, { useEffect, useState } from 'react';
import { db, storage } from "./Firebase";
import { ref, onValue, remove } from "firebase/database";
import { ref as storageRef, deleteObject } from "firebase/storage";
import UploadFile from './UploadFile';
import UploadApp from './UploadApp';
import ImageView from './ImageView';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase';
import Loader from './Loader';
import { Helmet } from 'react-helmet';
import AppImageView from './AppImageView';
import DescriptionView from './DescriptionView';


const WebApplication = () => {
  const [images, setImages] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [showImageView, setShowImageView] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [openDescription, setOpenDescription] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    const dbRef = ref(db, 'webapp');
    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        const fetchedImages = [];
        for (let key in data) {
            if (key !== 'latest' && data[key].photos) {
                fetchedImages.push({
                    key,
                    thumbnailUrl: data[key].thumbnailUrl,
                    photos: data[key].photos
                });
            }
        }
        setImages(fetchedImages);
        setLoading(false);
    });

    return () => unsubscribe();
 }, []);

const handleDelete = async (key, urls) => {
  try {
      await remove(ref(db, `webapp/${key}`));
      
      // Delete all associated images
      const allUrls = [urls.thumbnailUrl, ...urls.photos];
      for (const url of allUrls) {
          const imageRef = storageRef(storage, url);
          await deleteObject(imageRef);
      }
      
      setImages(images.filter(image => image.key !== key));
  } catch (error) {
      console.error("Error deleting images:", error);
  }
};

const handleView = (photos) => {
  setSelectedPhotos(photos);
  setShowImageView(true);
};

  return (
    <>
    <Helmet>
        <title>Mobile App | Quality Web Development | Mobile App Development</title>
        <meta name="description" content="Explore our diverse range of websites developed to enhance your business. View, manage, and upload your website assets with ease." />
        <meta name="keywords" content="web development, websites, upload website, manage websites, quality web solutions,web development in wayanad, web development in kerala, wesite, website in wayanad,graphic designing in wayanad, digital marketing in wayanad, digital marketing in wayand,imc,imcbs, imc business, imc business solutions, imc wayanad, imc kerala, imc india,website kerala, web design kerala, web development kerala, mobile app development, mobile app, webapp app, webapp" />
      </Helmet>
    <div className='md:ml-[300px] lg:ml-[450px] mt-5 p-5'>
        <section className='Mlg:max-w-[1200px] Mlg:mx-auto mt-16 md:mt-0'>
            <div>
                <div className='FontStyle-Top text-3xl md:text-[52px] text-[#363636] mb-5 leading-normal text-center'>Web Apps</div>
            </div>

            {user && (
              <div className='mb-5'>
               <UploadApp storagePath="webapp" dbPath="webapp" />
              </div>
            )}
            
            {loading ? (
              <Loader/>
            ) : (
              <div className='grid place-items-center xlg:grid-cols-2 Mlg:grid-cols-3 gap-10'>
                            {images.map(({ key, thumbnailUrl, photos }) => (
                                <div key={key} className='h-[300px] w-full rounded-3xl boxShadow relative'>
                                    <button onClick={()=>setOpenDescription(!openDescription)} className='px-6 py-2 rounded-3xl bg-[#ff8912] font-bold text-[13px] absolute top-2 text-[#fff] left-2 Delete-View-Btn'>
                                            Details
                                    </button>
                                    <img 
                                        src={thumbnailUrl} 
                                        alt="Thumbnail" 
                                        onClick={() => handleView(photos)}
                                        className='w-full h-full object-cover rounded-3xl cursor-pointer'
                                    />
                                    
                                    <div className='absolute flex justify-center items-center mx-auto bottom-5 left-5 Delete-View-Btn gap-5'>
                                        {user && (
                                            <button 
                                                onClick={() => handleDelete(key, { thumbnailUrl, photos })}
                                                className='font-bold shadow-2xl px-8 py-2 bg-[#ff1919] text-[13px] rounded-3xl text-white text-center mx-auto'
                                            >
                                                Delete
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => handleView(photos)}
                                            className='font-bold shadow-2xl px-8 py-2 rounded-3xl border-[#ff8912] border text-[13px] bg-white'
                                        >
                                            View
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {showImageView && (
                        <AppImageView 
                            photos={selectedPhotos}
                            onClose={() => {
                                setShowImageView(false);
                                setSelectedPhotos([]);
                            }}
                        />
                    )}
                </section>
            </div>
            {openDescription && (
                <div>
                    <DescriptionView setOpenDescription={setOpenDescription}/>
                </div>
            )}
        </>
    );
};

export default WebApplication
