import React, { useEffect, useState } from 'react';
import { db, storage } from "./Firebase";
import { ref, onValue, remove } from "firebase/database";
import { ref as storageRef, deleteObject } from "firebase/storage";
import UploadFile from './UploadFile';

const Websites = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const dbRef = ref(db, 'images');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const fetchedImages = [];
      for (let key in data) {
        if (key !== 'latest') {
          fetchedImages.push({ key, url: data[key].url });
        }
      }
      setImages(fetchedImages);
    });
  }, []);

  const handleDelete = async (key, url) => {
    try {
      // Remove image reference from the database
      await remove(ref(db, `images/${key}`));

      // Create a reference to the file to delete
      const imageRef = storageRef(storage, `Images/${url.split('/').pop().split('?')[0]}`);

      // Delete the file from storage
      await deleteObject(imageRef);

      // Remove the image from the state
      setImages(images.filter(image => image.key !== key));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className='md:ml-[300px] lg:ml-[450px] mt-5 p-5'>
      <section>
        <div>
          <div className='FontStyle-Top text-3xl md:text-[52px] text-[#363636] mb-5'>Our Websites</div>
          <div className='p-5 rounded-2xl text-[#3d1f00] boxShadow md:w-[400px] lg:w-[600px]'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae nihil praesentium fugit amet, sequi incidunt id recusandae ut aperiam, odit velit eveniet. Reprehenderit fuga aperiam itaque at minus possimus nesciunt?
          </div>
        </div>
        <div>
          <UploadFile />
        </div>
        <div className='flex justify-center items-center mt-10'>
          <div>
            <ul className='grid place-items-center md:grid-cols-2 lg:grid-cols-3 gap-10'>
              {images.map(({ key, url }) => (
                <li key={key}>
                  <div className='h-[300px] w-full rounded-3xl boxShadow relative'>
                    <img src={url} className='w-full h-full object-cover rounded-3xl' alt="" />
                    <div className='absolute flex justify-center items-center gap-10 mx-auto bottom-5 left-7 Delete-View-Btn'>
                      <button
                        className='font-bold shadow-2xl px-8 py-2 bg-[#ff8912] rounded-3xl text-white'
                        onClick={() => handleDelete(key, url)}
                      >
                        Delete
                      </button>
                      <button className='px-8 py-2 bg-[#ff8912] rounded-3xl font-bold shadow-2xl text-white'>
                        View
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Websites;
