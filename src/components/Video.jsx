import React, { useEffect, useState } from 'react';
import { db, auth } from "./Firebase";
import { ref as dbRef, onValue, remove } from "firebase/database";
import { onAuthStateChanged } from 'firebase/auth';
import UploadVideo from './UploadVideo';
import Loader from './Loader';

const Video = () => {
  const [videos, setVideos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

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
    <div className='md:ml-[300px] lg:ml-[450px] mt-5 p-5'>
      <section>
        <div>
          <div className='FontStyle-Top text-3xl md:text-[52px] text-[#363636] mb-5'>Our Videos</div>
          <div className='p-5 rounded-2xl text-[#3d1f00] boxShadow md:w-[400px] lg:w-[600px]'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae nihil praesentium fugit amet, sequi incidunt id recusandae ut aperiam, odit velit eveniet. Reprehenderit fuga aperiam itaque at minus possimus nesciunt?
          </div>
        </div>

        {user && (
          <div>
            <UploadVideo dbPath="videos" />
          </div>
        )}

        {loading ? (
          <Loader/>
        ) : (
          <div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 place-items-center lg:place-items-start'>
          {videos.map((video) => (
            video.url && (
              <div key={video.id} className='relative md:w-[400px] h-[300px] w-[300px]'>
                <iframe 
                  width="300" 
                  height="300" 
                  src={video.url} 
                  title={`YouTube video player ${video.id}`} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  className='rounded-3xl border-[1px] border-white boxShadow1 w-[300px] md:w-[400px]' 
                  allowFullScreen
                ></iframe>
                {user && (
                  <div className='absolute bottom-5 w-full flex justify-center'>
                    <button 
                      className='px-8 py-2 bg-white rounded-3xl shadow-lg font-bold text-sm'
                      onClick={() => handleDelete(video.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )
          ))}
        </div>
        )}
        
      </section>
    </div>
  );
};

export default Video;
