import React, { useEffect, useState } from 'react';
import { db, storage } from "./Firebase";
import { ref, onValue, remove } from "firebase/database";
import { ref as storageRef, deleteObject } from "firebase/storage";
import UploadFile from './UploadFile';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase';

const Brochure = () => {
  const [pdfs, setPdfs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const dbRef = ref(db, 'brochures');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Database Snapshot: ", data); // Log entire snapshot
      const fetchedPdfs = [];
      for (let key in data) {
        if (key !== 'latest' && data[key].url.toLowerCase().endsWith('.pdf')) {
          fetchedPdfs.push({ key, url: data[key].url });
        }
      }
      console.log("Fetched PDFs: ", fetchedPdfs); // Log fetched PDFs
      setPdfs(fetchedPdfs);
    });
  }, []);

  const handleDelete = async (key, url) => {
    try {
      await remove(ref(db, `brochures/${key}`));
      const fileRef = storageRef(storage, `Brochures/${url.split('/').pop().split('?')[0]}`);
      await deleteObject(fileRef);
      setPdfs(pdfs.filter(pdf => pdf.key !== key));
    } catch (error) {
      console.error("Error deleting PDF:", error);
    }
  };

  return (
    <div className='md:ml-[300px] lg:ml-[450px] mt-5 p-5'>
        <section>
            <div>
                <div className='FontStyle-Top text-3xl md:text-[52px] text-[#363636] mb-5'>Our Brochure</div>
                <div className='p-5 rounded-2xl text-[#3d1f00] boxShadow md:w-[400px] lg:w-[600px]'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae nihil praesentium fugit amet, sequi incidunt id recusandae ut aperiam, odit velit eveniet. Reprehenderit fuga aperiam itaque at minus possimus nesciunt?
                </div>
            </div>

            {user && (
              <div>
                <UploadFile storagePath="Brochures" dbPath="brochures" />
              </div>
            )}

            <div className='grid place-items-center md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10'>
                {pdfs.map(({ key, url }) => (
                    <div key={key} className='h-[300px] w-full rounded-3xl boxShadow relative'>
                      <iframe src={url} title={`PDF Brochure ${key}`} className='w-full h-full rounded-3xl' />
                      {user && (
                        <div className='absolute flex justify-center items-center mx-auto bottom-5 left-[30%] Delete-View-Btn'>
                          <button onClick={() => handleDelete(key, url)} className='font-bold shadow-2xl px-8 py-2 bg-[#ff8912] rounded-3xl text-white text-center mx-auto'>Delete</button>
                        </div>
                      )}
                    </div>
                ))}
            </div>
        </section>
    </div>
  );
};

export default Brochure;
