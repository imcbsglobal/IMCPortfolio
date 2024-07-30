import React from 'react'
import homeBanner from "../assets/home-banner.jpg"
import orange from "../assets/orange-shade.png"
import homeBanner1 from "../assets/home-banner1.png"
import Objectpng from "../assets/home-object1.png"

const Home = () => {
  return (
    <div className=' md:ml-[300px] lg:ml-[400px] mt-5 p-5 md:p-5'>
      <section className=' Mlg:max-w-[1200px] Mlg:mx-auto'>
          <div className=' h-[100vh] w-full'>
            <div className=' w-full mb-10 md:mb-0 grid place-items-center gap-10 HomeBanner'>
              {/* Left */}
              <div className=' mb-10'>
                <div className="FontStyle-Top text-3xl md:text-[42px] text-[#363636] mb-5 leading-normal">Transforming <span className=' Mlg:block'>Ideas into</span> <span className='Mlg:block'>Impactful <span className=' text-[#f80]'>Designs</span></span>
                </div>
                <div className=' text-sm mb-5 GlassBg2 rounded-3xl'>A versatile management platform designed to provide comprehensive software solutions, including business software, Android/iOS development, web development, hardware and IT support, and business execution support. Our primary goal is to elevate the diverse products of RITS Software to the global market.</div>
                <div>
                  <button className=' px-8 py-2 rounded-3xl shadow-lg text-[#f80] font-bold border ButtonGradient'>Get Started</button>
                </div>
              </div>
              {/* Right */}
              <div className='w-auto h-[500px]'>
                <img src={homeBanner1} className=' drop-shadow-lg md:h-full md:w-full md:object-cover md:mt-[-40px]' alt="" />
              </div>
            </div>

            {/* Bottom Designs */}
           
           <div className='grid grid-cols-1 md:grid-cols-2 place-items-start Mlg:place-content-start Mlg:place-items-start'>
              <div className=' h-[300px] w-auto flex justify-start items-center gap-2 mb-10'>
                <div className=' h-[300px] w-[60%] border rounded-3xl shadow-2xl '>
                  <img src={Objectpng} className=' w-full h-full object-cover drop-shadow-2xl' alt="" />
                </div>
                <div className=' flex flex-col justify-center items-center gap-2'>
                  <div className=' w-[100px] h-[145px] bg-black rounded-xl text-[#fff] p-5 text-center text-xl ObjectGradient2 font-bold'>
                    What We Do?
                  </div>
                  <div className=' w-[100px] h-[145px] bg-black rounded-xl overflow-hidden text-[#7e7e7e] text-[8px] text-center p-5 ObjectGradient3 md:p-3 md:text-[10px]'>
                  a platform delivering comprehensive software solutions to elevate RITS Software globally.
                  </div>
                </div>
              </div>

              <div className=' flex flex-col justify-start items-center'>
                <div className=' h-[150px] p-5 mb-5 rounded-3xl w-full ObjectGradient4 overflow-hidden'>
                  <div className='mb-1 md:mb-0'><button className=' px-8 py-2 font-bold bg-[#fff] cursor-none rounded-3xl shadow-lg text-sm'>About Us</button></div>
                  <div className=' text-sm'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas tenetur assumenda beatae necessitatibus ea saepe dolore magnam natus et doloribus!</div>
                </div>

                <div className=' h-[150px] p-5 mb-5 rounded-3xl w-full ObjectGradient4 overflow-hidden'>
                  <div className='mb-1 md:mb-0'><button className=' px-8 py-2 font-bold bg-[#fff] cursor-none rounded-3xl shadow-lg text-sm'>About Us</button></div>
                  <div className=' text-sm'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas tenetur assumenda beatae necessitatibus ea saepe dolore magnam natus et doloribus!</div>
                </div>
              </div>

           </div>

          </div>
      </section>
    </div>
  )
}

export default Home
