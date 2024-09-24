import React,{useEffect} from 'react'
import blackShade from "../assets/black-shade.png"
import Banner from "../assets/banner.jpg"
import homeBanner from "../assets/home-banner1.png"
import { Link } from "react-router-dom"
import development from "../assets/development.jpg"
import { Helmet } from 'react-helmet';
import logo from "../assets/IMC Logo.png";
import { BiLogoInstagramAlt, BiLogoFacebook } from "react-icons/bi";
import { IoLogoWhatsapp } from "react-icons/io";



const Home = () => {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  return (
    <div className='flex justify-center items-center'>

      <Helmet>
        <title>IMC Portfolio</title>
        <meta name="description" content="Explore our diverse range of websites developed to enhance your business. View, manage, and upload your website assets with ease." />
        <meta name="keywords" content="web development, websites, upload website, manage websites, quality web solutions,web development in wayanad, web development in kerala, wesite, website in wayanad,graphic designing in wayanad, digital marketing in wayanad, digital marketing in wayand,imc,imcbs, imc business, imc business solutions, imc wayanad, imc kerala, imc india,website kerala, web design kerala, web development kerala" />
      </Helmet>

      <div className='relative pt-20 md:pt-0 md:ml-[300px] lg:ml-[400px] flex flex-col justify-center items-center'>
      {/* <div className='absolute top-0 bottom-0 left-0 right-0 w-full h-full -z-50 opacity-5'>
        <img src={Banner} className=' w-full h-full object-cover' alt="" />
      </div> */}
      {/* <div className='absolute top-0 bottom-0 left-0 right-0 w-full h-full -z-50'>
        <img src={blackShade} className=' w-full h-full object-cover' alt="" />
      </div> */}
      <div className=' mt-5 px-5 grid place-items-center Mlg:flex  justify-center items-end gap-5 mb-5'>
        <div className='mb-5 lg:w-[600px]'>
          <div className='text-center text-[45px] leading-[50px] lg:text-[52px] lg:leading-[60px] font-bold mb-5 mx-auto text-[#ffad2a] drop-shadow-sm'>Turning Vision into Complete Solutions</div>
          <div className='text-center mb-10 font-semibold text-[#878282] mx-auto'>We transform your ideas into seamless solutions, delivering services that streamline operations and drive success. Using the latest technologies and tailored strategies, we help your business stay ahead in a rapidly evolving digital world, providing solutions that empower your vision and achieve lasting results. </div>
          <Link to="websites">
            <div className='flex justify-center items-center'>
              <button className='px-8 py-2 rounded-3xl ButtonGradient font-bold text-white'>Get Started</button>
            </div>
          </Link>
        </div>
          <div className='w-auto h-[450px]'>
            <img src={homeBanner} className='w-full h-full object-contain' alt="" />
        </div>
      </div>
      {/* Bottom Side */}
      {/* <div className=' flex justify-center items-center md:pl-10'>
        <div className=' w-full grid place-items-center  md:flex justify-start items-center gap-10'>
          <div className='w-[60%] h-[300px] rounded-3xl'>
            <img src={development} className='w-full h-full object-cover rounded-3xl' alt="" />
          </div>
          <div>
            <div className='font-bold text-3xl mb-5 text-[#ffad2a] drop-shadow-sm'>Our Services</div>
            <ul className='list-disc font-semibold'>
             <li>Business Softwares</li>
             <li>Website and Web Development</li>
             <li>Graphic Designing</li>
             <li>Digital Marketing</li>
             <li>SEO and Branding</li>
            </ul>
          </div>
        </div>
      </div> */}
      <div className=' w-[95%] rounded-3xl BgGradient GlassBg py-2 px-2 md:hidden Mlg:block'>
        <div className='grid lg:grid-cols-3 justify-center items-start gap-5 lg:px-2 w-full'>
          <div className='flex flex-col justify-center items-center py-2 bg-[#ffffff3d] rounded-3xl GlassBg w-full h-[200px]'>
            <div className='w-[80px] h-[80px] rounded-full bg-[#fff] p-2 mb-2'>
              <img src={logo} alt="" />
            </div>
            <div className='font-bold text-[#fff] mb-3'>IMC Business Solutions</div>
            <div className=' text-xl flex justify-center items-center gap-5 bg-[#fff] py-2 px-8 rounded-[50px] GlassBg'>
                <a href="https://www.facebook.com/profile.php?id=100069040622427">
                  <BiLogoFacebook className=' text-[#ff7301] cursor-pointer SocialHover'/>
                </a>
                <a href="https://www.instagram.com/imcbusinesssolution/">
                  <BiLogoInstagramAlt className=' text-[#ff7301] cursor-pointer SocialHover'/>
                </a>
                <a href="">
                  <IoLogoWhatsapp className=' text-[#ff7301] cursor-pointer SocialHover'/>
                </a>
            </div>
          </div>
          

          <div className='grid grid-cols-1 place-items-center bg-[#ffffff3d] rounded-3xl GlassBg py-2 w-full h-[200px]'>
            <div className='text-[#fff] font-bold text-xl lg:text-3xl underline underline-offset-8 mb-5'>Our Services</div>
            <ul className='flex flex-col justify-center items-center list-disc text-[#fff] font-semibold'>
              <li>Business Softwares</li>
              <li>Website and Web Applications</li>
              <li>Graphic Designing</li>
              <li>Digital Marketing</li>
              <li>SEO and Branding</li>
            </ul>
          </div>
          <div className='flex flex-col justify-center items-center mx-auto bg-[#ffffff3d] rounded-3xl GlassBg py-2 w-full h-[200px] px-2'>
            <div className='text-center text-3xl font-bold text-[#fff] drop-shadow-sm underline underline-offset-8 mb-5'>Explore Our Portfolio</div>
            
            <div className='flex justify-center items-center w-full'>
              <ul className='grid grid-cols-2 gap-x-10 text-[#fff] font-semibold leading-normal list-disc list-inside'>
                  
                  <Link to="/websites"><li className=''>Websites</li></Link>
                  <Link to="/posters"><li className=' '>Posters</li></Link>
                  <Link to="/brochure"><li className=' '>Brouchers</li></Link>
                  <Link to="/logos"><li className=' '>Logos</li></Link>
                  <Link to="/video"><li className=''>Video</li></Link>
                  <Link to="/instagram"><li className=''>Instagram</li></Link>
                  <Link to="/facebook"><li className=''>Facebook</li></Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Home
