import React, { useEffect, useState } from 'react';
import { db, auth } from "./Firebase";
import { ref as dbRef, onValue, remove } from "firebase/database";
import { onAuthStateChanged } from 'firebase/auth';
import UploadVideo from './UploadVideo';
import Loader from './Loader';
import Navbar from './Navbar';

const Video = () => {
  const [videos, setVideos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    window.scrollTo(0,0)
  })

  // Check if Admin is Logged In
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const videosRef = dbRef(db, 'videos');
    onValue(videosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const videosArray = Object.entries(data).map(([id, details]) => ({ id, ...details }));
        setVideos(videosArray);
        setLoading(false)
      }
    });
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this video?");
  
    if (!confirmDelete) return; // Exit the function if the user cancels
  
    const videoRef = dbRef(db, `videos/${id}`);
    remove(videoRef)
      .then(() => {
        setVideos((prevVideos) => prevVideos.filter(video => video.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting video: ', error);
      });
  };
  

  return (
    <div className='w-full overflow-auto'>
      <div className='md:flex justify-center w-full h-screen'>
        <div className='flex'>
          <div className='md:w-[25%] xlg:w-[400px]'>
            <div className=' h-screen fixed top-0 left-0 xlg:w-[400px] bottom-0 md:w-[25%] z-[999] md:z-50'>
              <Navbar/>
            </div>
          </div>
          <div className="md:w-[75%] w-full mt-5 p-5 xlg:w-full xlg:ml-[100px]">
            <section className="Mlg:max-w-[1200px] Mlg:mx-auto mt-16 md:mt-0">
              <div>
                <div className="FontStyle-Top text-3xl md:text-[52px] text-[#363636]  leading-normal text-center">
                  {" "}
                  Videos
                </div>
              </div>

              {user && user.email === "info@imcbsglobal.com" && (
                <div>
                  <UploadVideo dbPath="videos" />
                </div>
              )}

              {loading ? (
                <Loader />
              ) : (
                <div className="mt-5 grid grid-cols-1 xlg:grid-cols-2 gap-5 place-items-center lg:place-items-start Mlg:gap-5">
                  {videos.map(
                    (video) =>
                      video.url && (
                        <div
                          key={video.id}
                          className="relative xlg:w-full Mlg:w-[400px] h-[300px] w-[300px]"
                        >
                          <iframe
                            width="300"
                            height="300"
                            src={video.url}
                            title={`YouTube video player ${video.id}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            className="rounded-3xl border-[1px] border-white boxShadow1 w-[300px] xlg:w-full Mlg:w-[400px]"
                            allowFullScreen
                          ></iframe>
                          {user && user.email === "info@imcbsglobal.com" && (
                            <div className="absolute bottom-5 w-full flex justify-center">
                              <button
                                className="px-8 py-2 bg-white rounded-3xl shadow-lg font-bold text-sm"
                                onClick={() => handleDelete(video.id)}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      )
                  )}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
