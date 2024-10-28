import React,{useEffect} from 'react'
import blackShade from "../assets/black-shade.png"
import Banner from "../assets/banner.jpg"
import homeBanner from "../assets/home-banner1.png"
import { Link } from "react-router-dom"
import development from "../assets/development.jpg"
import logo from "../assets/IMC Logo.png";
import { BiLogoInstagramAlt, BiLogoFacebook } from "react-icons/bi";
import { IoLogoWhatsapp } from "react-icons/io";
import Navbar from './Navbar'



const Home = () => {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  return (
    <div className=' w-full overflow-auto'>
      <div className="md:flex justify-center w-full h-screen">
        <div className=" grid place-items-center md:flex w-full">
          <div className="md:w-[35%] w-full Mlg:w-[300px]">
            <div className="h-screen fixed w-full top-0 left-0 bottom-0 md:w-[35%] Mlg:w-[300px] z-[999]">
              <Navbar/>
            </div>
          </div>
        <div className='flex justify-center items-center md:pt-20 md:w-[60%] xlg:w-[60%] Mlg:ml-[100px] Mlg:w-full '>
          <div className='relative pt-20 md:pt-0  flex flex-col justify-center items-center'>
          <div className=' mt-5 px-5 grid place-items-center Mlg:flex  justify-center items-end gap-5 mb-5'>
            <div className='mb-5 lg:w-[600px]'>
              <div className='text-center text-[45px] leading-[50px] lg:text-[52px] lg:leading-[60px] font-bold mb-5 mx-auto text-[#ffad2a] drop-shadow-sm'>Turning Vision into Complete Solutions</div>
              <div className='text-center mb-10 font-semibold text-[#878282] mx-auto'>We transform your ideas into seamless solutions, delivering services that streamline operations and drive success. Using the latest technologies and tailored strategies, we help your business stay ahead in a rapidly evolving digital world, providing solutions that empower your vision and achieve lasting results. </div>
              <Link to="software">
                <div className='flex justify-center items-center'>
                  <button className='px-8 py-2 rounded-3xl ButtonGradient font-bold text-white'>Get Started</button>
                </div>
              </Link>
            </div>
              <div className='w-auto h-[450px]'>
                <img src={homeBanner} className='w-full h-full object-contain' alt="" />
            </div>
          </div>
          <div className=' w-[95%] rounded-3xl   py-2  md:hidden Mlg:block'>
            <div className='grid lg:flex justify-center items-center gap-5 w-full'>
              <div className='flex  flex-col justify-center items-center py-2 bg-[#ffffff3d] rounded-3xl GlassBg w-full h-[230px] border-[#ff7f2a] border-[.1px]'>
                <div className=' px-5 text-[#878282]'>We specialize in delivering tailored solutions to enhance your online presence. From innovative web development and eye-catching graphic designs to comprehensive digital marketing, SEO, and branding strategies, we help businesses stand out and succeed in the digital world.</div>
              </div>
              

              <div className='grid grid-cols-1 place-items-center lg:w-[50%] bg-[#ffffff3d] rounded-3xl GlassBg border-[#ff7f2a] border-[.1px] py-2 w-full h-[230px]'>
                <div className='text-[#ff7f2a] drop-shadow-sm font-bold text-xl lg:text-3xl underline underline-offset-8 mb-5'>Our Services</div>
                <ul className='flex flex-col justify-center items-start list-disc text-[#878282] font-semibold'>
                  <li>Business Softwares</li>
                  <li>Website and Web Applications</li>
                  <li>Graphic Designing</li>
                  <li>Digital Marketing</li>
                  <li>SEO and Branding</li>
                </ul>
              </div>
              
            </div>
          </div>
        </div>
        </div>
    </div>
        </div>
      </div>    
  )
}

export default Home
