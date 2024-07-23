import React, { useEffect, useState } from 'react';
import { db, storage } from "./Firebase";
import { ref, onValue, remove } from "firebase/database";
import { ref as storageRef, deleteObject } from "firebase/storage";
import UploadFile from './UploadFile';
import ImageView from './ImageView';

const Logos = () => {
  const [logos, setLogos] = useState([]);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [showImageView, setShowImageView] = useState(false);

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
    });
  }, []);

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

  const handleView = (url) => {
    setSelectedLogo(url);
    setShowImageView(true);
  };

  const handleCloseImageView = () => {
    setShowImageView(false);
    setSelectedLogo(null);
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

            <div>
                <UploadFile storagePath="Logos" dbPath="logos" />
            </div>

            <div className='grid place-items-center md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10'>
                {logos.map(({ key, url }) => (
                    <div key={key} className='h-[300px] w-full rounded-3xl boxShadow1 relative'>
                        <img src={url} alt="" onClick={() => handleView(url)} className='w-full h-full object-contain rounded-3xl' />
                        <div className='absolute flex justify-center items-center mx-auto bottom-5 left-[30%] Delete-View-Btn'>
                            <button onClick={() => handleDelete(key, url)} className='font-bold shadow-2xl px-8 py-2 bg-[#ff8912] rounded-3xl text-white text-center mx-auto'>Delete</button>
                        </div>
                    </div>
                ))}
                {showImageView && (
                    <ImageView url={selectedLogo} onClose={handleCloseImageView} />
                )}
            </div>
        </section>
      
      
    </div>
  );
};

export default Logos;
