import React, { useEffect, useState } from 'react';
import { db, storage } from "./Firebase";
import { ref, onValue, remove } from "firebase/database";
import { ref as storageRef, deleteObject } from "firebase/storage";
import UploadFile from './UploadFile';
import ImageView from './ImageView';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase';
import Loader from './Loader';
import Navbar from './Navbar';


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
    const confirmDelete = window.confirm("Are you sure you want to delete this poster?");
  
    if (!confirmDelete) return; // Exit the function if the user cancels
  
    try {
      await remove(ref(db, `posters/${key}`));
  
      // Delete the associated poster image
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
    <div className='w-full overflow-auto'>
      <div className='md:flex justify-center w-full h-screen'>
      <div className=' flex'>
        {/* Navbar Section */}
        <div className='md:w-[35%] xlg:w-[400px]'>
          <div className=' h-screen fixed top-0 left-0 bottom-0 xlg:w-[400px] md:w-[35%] z-[999] md:z-50'>
            <Navbar/>
          </div>
        </div>
        
      
      <div className='md:w-[70%] xlg:w-full xlg:ml-[100px] Mlg:w-full w-full'>
      <div>
      <div className='mt-5 p-5'>
      <section className='Mlg:max-w-[1200px] Mlg:mx-auto mt-16 md:mt-0'>
        <div>
          <div className='FontStyle-Top text-3xl md:text-[52px] text-[#363636] mb-5 leading-normal text-center'> Posters</div>
          
        </div>

        {user && user.email === "info@imcbsglobal.com" && (
          <div>
            <UploadFile storagePath="Posters" dbPath="posters" />
          </div>
        )}

        {loading ? (
          <Loader />
        ) : (
          <div className='grid place-items-center xlg:grid-cols-2 Mlg:grid-cols-3 gap-10'>
            {posters.map(({ key, url }, index) => (
              <div key={key} className='h-[300px] w-[300px] Mlg:w-full rounded-3xl boxShadow relative'>
                <img 
                  src={url} 
                  alt="" 
                  onClick={() => handleView(index)} 
                  className='w-full h-full object-cover rounded-3xl'
                />
                {user && user.email === "info@imcbsglobal.com" && (
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
      </div>
      </div>
      </div>
    </div>
    
  );
};

export default Posters;
