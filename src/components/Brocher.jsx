import React, { useEffect, useState } from 'react';
// import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { db, storage, auth } from "./Firebase";
import { ref, onValue, remove } from "firebase/database";
import { ref as storageRef, deleteObject } from "firebase/storage";
import UploadPdf from './UploadPdf';
import { onAuthStateChanged } from 'firebase/auth';
import PDF from "../assets/pdf.png"

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
      console.log("Fetched data:", data); // Debugging line

      if (data) {
        const fetchedPdfs = [];
        for (let key in data) {
          // Check data structure
          console.log(`Processing key: ${key}`, data[key]); // Debugging line

          // Exclude 'latest' key and ensure URL is a valid PDF
          if (key !== 'latest' && data[key] && data[key].url) {
            console.log(`Adding PDF with key: ${key} and URL: ${data[key].url}`); // Debugging line
            fetchedPdfs.push({ key, url: data[key].url,name : data[key].name });
          }
        }
        console.log("Processed PDFs:", fetchedPdfs); // Debugging line
        setPdfs(fetchedPdfs);
      }
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

  const ClickTheUrl =(url) => {
      window.location.href = url
  }

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
            <UploadPdf storagePath="Brochures" dbPath="brochures" />
          </div>
        )}

        {pdfs.length > 0 ? (
          <div className=' grid place-items-center grid-cols-1 lg:grid-cols-3'>
            {pdfs.map(({ key, url, name }) => (
              <div key={key} className='h-[300px] w-[300px] rounded-3xl boxShadow relative mt-10'>
                <div className=' w-auto h-[120px] mb-3 mt-3'>
                  <img src={PDF} className=' w-full h-full object-contain drop-shadow-md' alt="" />
                </div>
                <div className=' flex flex-col gap-5 justify-center items-center'>
                  <div className=' text-[16px] font-semibold'>{name}</div>
                  <button className=' px-8 py-1 font-bold bg-white rounded-3xl mb-5 shadow-lg' onClick={()=> window.open(url, "_blank")}>Click Here</button>
                </div>
                  
                {user && (
                  <div className='flex justify-center items-center mx-auto bottom-5 left-[30%] Delete-View-Btn'>
                    <button onClick={() => handleDelete(key, url)} className='font-bold shadow-2xl border px-8 py-2 bg-[#ff8912] rounded-3xl text-white text-center mx-auto'>Delete</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center mt-10'>
            <span className='text-sm md:text-xl font-semibold fontName text-[#343434]'>No brochures available.</span>
          </div>
        )}
      </section>
    </div>
  );
};

export default Brochure;
