import React, { useEffect, useState } from 'react';
import { db, auth } from "./Firebase";
import { ref as dbRef, onValue, remove } from "firebase/database";
import { onAuthStateChanged } from 'firebase/auth';
import UploadVideo from './UploadVideo';
import Loader from './Loader';
import { Helmet } from 'react-helmet';


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
    <>
      <Helmet>
        <title>Video | Our Customers Love</title>
        <meta name="description" content="Explore our diverse range of websites developed to enhance your business. View, manage, and upload your website assets with ease." />
        <meta name="keywords" content="web development, websites, upload website, manage websites, quality web solutions,web development in wayanad, web development in kerala, wesite, website in wayanad,graphic designing in wayanad, digital marketing in wayanad, digital marketing in wayand,imc,imcbs, imc business, imc business solutions, imc wayanad, imc kerala, imc india,website kerala, web design kerala, web development kerala" />
      </Helmet>

    <div className='md:ml-[300px] lg:ml-[450px] mt-5 p-5'>
      <section className='Mlg:max-w-[1200px] Mlg:mx-auto mt-16 md:mt-0'>
        <div>
          <div className='FontStyle-Top text-3xl md:text-[52px] text-[#363636]  leading-normal text-center'> Videos</div>
        </div>

        {user && (
          <div>
            <UploadVideo dbPath="videos" />
          </div>
        )}

        {loading ? (
          <Loader/>
        ) : (
          <div className='mt-5 grid grid-cols-1 xlg:grid-cols-2 gap-5 place-items-center lg:place-items-start Mlg:gap-5'>
          {videos.map((video) => (
            video.url && (
              <div key={video.id} className='relative xlg:w-full Mlg:w-[400px] h-[300px] w-[300px]'>
                <iframe 
                  width="300" 
                  height="300" 
                  src={video.url} 
                  title={`YouTube video player ${video.id}`} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  className='rounded-3xl border-[1px] border-white boxShadow1 w-[300px] xlg:w-full Mlg:w-[400px]' 
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
    </>
  );
};

export default Video;
