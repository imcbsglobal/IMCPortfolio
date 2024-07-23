import React from 'react'
import Logo from "../assets/IMC Logo.png"
import { MdOutlineFacebook } from "react-icons/md";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { RiPencilRulerFill } from "react-icons/ri";
import { MdContacts } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";


const NavbarMobile = ({setMenuBar}) => {
  return (
    <div className=''>

      <div className=' fixed top-0 left-0 h-full w-full bg-white z-[200] flex flex-col justify-center items-center gap-10'>
        <div className=' absolute top-10 right-10 text-3xl text-[#ff9100]  drop-shadow-sm cursor-pointer'>
            <IoCloseCircle onClick={() => setMenuBar(false)}/>
        </div>
        <div>
                <div className=' w-[200px] h-auto mb-5 flex justify-center mx-auto'>
                    <img src={Logo} className=' w-full h-full object-contain drop-shadow-md' alt="" />
                </div>
                <div className=' text-center text-3xl font-semibold mb-10'>IMC Business Solution</div>
                <div className=' flex justify-center items-center gap-10 mb-5 bg-white p-5 rounded-full BoxShadow'>
                    <div className=' text-xl'><MdOutlineFacebook/></div>
                    <div className=' text-xl'><BiLogoInstagramAlt/></div>
                    <div className=' text-xl'><IoLogoWhatsapp/></div>
                    <div className=' text-xl'><FaYoutube/></div>
                </div>
        </div>
            <div className=' flex justify-center text-center items-center'>
                <ul className='flex flex-col gap-10 font-semibold'>
                    <li>
                        <div className=' flex justify-center items-center gap-5'>
                            <div className=' text-[#ff9100]'><FaHome/></div>
                            <div>Home</div>
                        </div>
                    </li>
                    <li>
                        <div className=' flex justify-center items-center gap-5'>
                            <div className=' text-[#ff9100]'><FaEarthAmericas/></div>
                            <div>Website Work</div>
                        </div>
                    </li>
                    <li>
                        <div className=' flex justify-center items-center gap-5'>
                            <div className=' text-[#ff9100]'><RiPencilRulerFill/></div>
                            <div>Post Work</div>
                        </div>
                    </li>
                    <li>
                        <div className=' flex justify-center items-center gap-5'>
                            <div className=' text-[#ff9100]'><MdContacts/></div>
                            <div>Contact Us</div>
                        </div>
                    </li>
                </ul>
            </div>
      </div>
    </div>
  )
}

export default NavbarMobile
