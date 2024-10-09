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


const Posters = () => {
  const [posters, setPosters] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [showImageView, setShowImageView] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

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
    <>
    <Helmet>
        <title> Posters | Quality Web Development |Poster Creation | Poster Work</title>
        <meta name="description" content="Explore our diverse range of websites developed to enhance your business. View, manage, and upload your website assets with ease." />
        <meta name="keywords" content="web development, websites, upload website, manage websites, quality web solutions,web development in wayanad, web development in kerala, wesite, website in wayanad,graphic designing in wayanad, digital marketing in wayanad, digital marketing in wayand,imc,imcbs, imc business, imc business solutions, imc wayanad, imc kerala, imc india,website kerala, web design kerala, web development kerala, poster creation, poster works, poster work,graphic designs, graphic design wayanad, graphic design kalpeta,poster work kalpeta, poster work batheri, graphic design batheri, top graphic work wayanad," />
      </Helmet>

    <div>
      <div className='md:ml-[300px] lg:ml-[450px] mt-5 p-5'>
      <section className='Mlg:max-w-[1200px] Mlg:mx-auto mt-16'>
        <div>
          <div className='FontStyle-Top text-3xl md:text-[52px] text-[#363636] mb-5 leading-normal text-center'> Posters</div>
          
        </div>

        {user && (
          <div>
            <UploadFile storagePath="Posters" dbPath="posters" />
          </div>
        )}

        {loading ? (
          <Loader />
        ) : (
          <div className='grid place-items-center xlg:grid-cols-2 Mlg:grid-cols-3 gap-10'>
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
          </div>
        )}
      </section>
      
    </div>
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
    </>
    
  );
};

export default Posters;
