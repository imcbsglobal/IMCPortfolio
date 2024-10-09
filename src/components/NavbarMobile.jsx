import React, {useState} from 'react'
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
import { Link } from 'react-router-dom';
import { PiVideoFill } from "react-icons/pi";
import { BsAndroid2 } from "react-icons/bs";
import { motion } from 'framer-motion';
import { HiPencilAlt } from "react-icons/hi";
import { PiBookOpenTextFill } from "react-icons/pi";
import { PiPencilCircleBold } from "react-icons/pi";
import { BsInstagram } from "react-icons/bs";
import { BiLogoFacebook } from "react-icons/bi";
import { GrMultimedia } from "react-icons/gr";
import { FaGlobe } from "react-icons/fa6";

const NavbarMobile = ({setMenuBar}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [socialOpen, setSocialOpen] = useState(false)

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };

    // Social Media Drop Down
    const toggleDropdown2 = () => {
        setSocialOpen(!socialOpen)
    }


  return (
    <div className=''>

      <div className=' fixed top-0 left-0 h-[100vh] bottom-0 w-full bg-white z-[200] flex flex-col justify-center items-center gap-10'>
        <div className=' absolute top-10 right-10 text-3xl text-[#ff9100]  drop-shadow-sm cursor-pointer'>
            <IoCloseCircle onClick={() => setMenuBar(false)}/>
        </div>
        <div>
                <div className=' w-[80px] h-auto mb-5 flex justify-center mx-auto'>
                    <img src={Logo} className=' w-full h-full object-contain drop-shadow-md' alt="" />
                </div>
                <div className=' text-center text-3xl font-semibold mb-5'>IMC Business Solution</div>
                <div className=' flex justify-center items-center gap-10 mb-5 bg-white p-5 rounded-full BoxShadow'>
                    <div className=' text-xl'><MdOutlineFacebook/></div>
                    <div className=' text-xl'><BiLogoInstagramAlt/></div>
                    <div className=' text-xl'><IoLogoWhatsapp/></div>
                    <div className=' text-xl'><FaYoutube/></div>
                </div>
        </div>
            <div className=' flex justify-center text-center items-center'>
                <ul className='flex flex-col gap-5 font-semibold'>
                    <li>
                        <Link to='/' onClick={() => setMenuBar(false)}>
                            <div className=' flex justify-center items-center gap-5'>
                                <div className=' text-[#ff9100]'><FaHome/></div>
                                <div>Home</div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to='/websites' onClick={() => setMenuBar(false)}>
                            <div className=' flex justify-center items-center gap-5'>
                                <div className=' text-[#ff9100]'><FaEarthAmericas/></div>
                                <div>Website Work</div>
                            </div>
                        </Link>
                    </li>
                    <li>
                    <div className='flex flex-col'>
                            <div className='flex justify-center items-center gap-5 cursor-pointer' onClick={toggleDropdown}>
                            <div className='text-[#ff9100]'><RiPencilRulerFill /></div>
                            <div>Designs</div>
                            </div>
                            {isOpen && (
                            <motion.ul
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className='pl-14 mt-2'
                            >
                                <li className='mt-2'>
                                    <Link to="/posters" onClick={() => setMenuBar(false)} className='flex justify-start items-center gap-5'>
                                        <div className='text-[#ff9100]'><HiPencilAlt /></div>
                                        <div>Posters</div>
                                    </Link>
                                </li>
                                <li className='mt-3'>
                                    <Link to="/brochure" onClick={() => setMenuBar(false)} className='flex justify-start items-center gap-5'>
                                        <div className='text-[#ff9100]'><PiBookOpenTextFill /></div>
                                        <div>Brochure</div>
                                    </Link>

                                </li>
                                <li className='mt-3'>
                                    <Link to="/logos" onClick={() => setMenuBar(false)} className='flex justify-start items-center gap-5'>
                                        <div className='text-[#ff9100]'><PiPencilCircleBold /></div>
                                        <div>Logos</div>
                                    </Link>
                                </li>
                            </motion.ul>
                            )}
                        </div>
                    </li>
                    <li>
                        <Link to='/webapplication' onClick={() => setMenuBar(false)}>
                            <div className=' flex justify-center items-center gap-5'>
                                <div className=' text-[#ff9100]'><FaGlobe/></div>
                                <div>Web App</div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to='/android' onClick={() => setMenuBar(false)}>
                            <div className=' flex justify-center items-center gap-5'>
                                <div className=' text-[#ff9100]'><BsAndroid2/></div>
                                <div>Mobile App</div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to='/video' onClick={() => setMenuBar(false)}>
                            <div className=' flex justify-center items-center gap-5'>
                                <div className=' text-[#ff9100]'><PiVideoFill/></div>
                                <div>Video</div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <div className='flex flex-col'>
                            <div className='flex justify-center items-center gap-5 cursor-pointer' onClick={toggleDropdown2}>
                            <div className='text-[#ff9100]'><GrMultimedia /></div>
                            <div>Social Media</div>
                            </div>
                            {socialOpen && (
                            <motion.ul
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className='pl-14 mt-2'
                            >
                                <li className='mt-2'>
                                    <Link to="/instagram" onClick={() => setMenuBar(false)} className='flex justify-start items-center gap-5'>
                                        <div className='text-[#ff9100]'><BsInstagram /></div>
                                        <div>Instagram</div>
                                    </Link>
                                </li>
                                <li className='mt-3'>
                                    <Link to="/facebook" onClick={() => setMenuBar(false)} className='flex justify-start items-center gap-5'>
                                        <div className='text-[#ff9100]'><BiLogoFacebook /></div>
                                        <div>Facebook</div>
                                    </Link>

                                </li>
                            </motion.ul>
                            )}
                        </div>
                    </li>
                </ul>
            </div>
      </div>
    </div>
  )
}

export default NavbarMobile
