import React, { useEffect, useState } from 'react';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { db, storage, auth } from "./Firebase";
import { ref, onValue, remove } from "firebase/database";
import { ref as storageRef, deleteObject } from "firebase/storage";
import UploadPdf from './UploadPdf';
import { onAuthStateChanged } from 'firebase/auth';
// import PDF from "../assets/pdf.png";
import Loader from './Loader';
import Navbar from './Navbar';


const Brochure = () => {
  const [pdfs, setPdfs] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState('common');

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
    const dbRef = ref(db, 'brochures');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetchedPdfs = [];
        Object.entries(data).forEach(([type, typeData]) => {
          if (type !== 'latest' && typeData) {
            Object.entries(typeData).forEach(([key, value]) => {
              if (value && value.pdfUrl && value.thumbnailUrl) {
                fetchedPdfs.push({
                  key,
                  url: value.pdfUrl,
                  name: value.name,
                  thumbnailUrl: value.thumbnailUrl,
                  type: type.toLowerCase()
                });
              }
            });
          }
        });
        setPdfs(fetchedPdfs);
        setLoading(false);
      }
    });
  }, []);

  const handleDelete = async (key, url, thumbnailUrl, type) => {
    try {
      await remove(ref(db, `brochures/${type}/${key}`));
      const fileRef = storageRef(storage, `Brochures/${type}/${url.split('/').pop().split('?')[0]}`);
      const thumbnailRef = storageRef(storage, `Brochures/thumbnails/${type}/${thumbnailUrl.split('/').pop().split('?')[0]}`);
      await deleteObject(fileRef);
      await deleteObject(thumbnailRef);
      console.log("Deleted PDF and thumbnail successfully.");
    } catch (error) {
      console.error("Error deleting PDF:", error);
    }
  };

  const filteredPdfs = pdfs.filter(pdf => pdf.type === activeType);

  return (
    <div className='w-full overflow-auto'>
      <div className='md:flex justify-center w-full h-screen'>
        <div className='flex'>
          <div className='md:w-[30%] xlg:w-[400px]'>
            <div className='h-screen fixed top-0 left-0 bottom-0 md:w-[30%] xlg:w-[400px] w-full z-[999] md:z-50'>
              <Navbar/>
            </div>
          </div>
          <div className="md:w-[75%] xlg:w-full xlg:ml-[100px] w-full mt-5 p-5">
            <section className="Mlg:max-w-[1200px] Mlg:mx-auto mt-16 md:mt-0">
              <div>
                <div className="FontStyle-Top text-3xl md:text-[52px] text-[#363636] mb-5 leading-normal text-center">
                  Brochures
                </div>
                <div className=" mb-16 flex items-center justify-center gap-10">
                  <button
                    className={`px-6 py-2 rounded-lg ${
                      activeType === "common" ? "bg-[#ff6a00]" : "bg-gray-400"
                    } text-sm font-bold text-[#fff]`}
                    onClick={() => setActiveType("common")}
                  >
                    Common Brochure
                  </button>
                  <button
                    className={`px-6 py-2 rounded-lg ${
                      activeType === "own" ? "bg-[#ff6a00]" : "bg-gray-400"
                    } text-sm font-bold text-[#fff]`}
                    onClick={() => setActiveType("own")}
                  >
                    Own Brochure
                  </button>
                </div>
              </div>
              <div className=" mt-[-30px]">
                {user && user.email === "info@imcbsglobal.com" && (
                  <div className="text-center">
                    <UploadPdf storagePath="Brochures" dbPath="brochures" />
                  </div>
                )}

                <div className="grid place-items-center md:grid-cols-1 xlg:grid-cols-2 Mlg:grid-cols-3 gap-10 mt-5">
                  {loading ? (
                    <Loader />
                  ) : (
                    filteredPdfs.map((pdf) => (
                      <div
                        key={pdf.key}
                        className="h-[300px] w-[300px] xlg:w-full rounded-3xl boxShadow relative"
                      >
                        <img
                          src={pdf.thumbnailUrl}
                          alt={pdf.name}
                          className="w-full h-full object-cover rounded-3xl"
                        />
                        <div className="justify-center items-center flex">
                          <div className="absolute top-5 w-full shadow-lg">
                            <p className="text-lg font-bold text-center w-full bg-white">
                              {pdf.name}
                            </p>
                          </div>
                        </div>
                        <div className="">
                          <div className="absolute bottom-5 left-2">
                            <a
                              href={pdf.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-8 py-2 bg-white rounded-3xl shadow-lg font-bold text-sm"
                            >
                              View PDF
                            </a>
                          </div>
                          <div className="flex justify-end items-center">
                            {user && user.email === "info@imcbsglobal.com" && (
                              <div className="absolute bottom-5 right-2">
                                <button
                                  onClick={() =>
                                    handleDelete(
                                      pdf.key,
                                      pdf.url,
                                      pdf.thumbnailUrl,
                                      pdf.type
                                    )
                                  }
                                  className="text-[#fff] px-8 py-2 rounded-3xl font-bold bg-[#ff6a00] text-sm"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brochure;
