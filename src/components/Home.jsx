import React from 'react'
import homeBanner from "../assets/home-banner.jpg"
import orange from "../assets/orange-shade.png"
// import inteoVideo from "../assets/intro-video.mp4"

const Home = () => {
  return (
    <div className=' md:ml-[300px] lg:ml-[400px] mt-5 p-5'>
      <section className=''>
          <div className=' h-[100vh] w-full relative'>
            <div className=' w-full h-full'>
              {/* <img className=' w-full h-full object-cover mix-blend-multiply' src={homeBanner} alt="" /> */}
              {/* <img className=' absolute w-full h-full top-0' src={orange} alt="" /> */}
            </div>
          </div>
      </section>
    </div>
  )
}

export default Home
