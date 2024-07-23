import React, { useState, useEffect } from 'react'
import NavbarMobile from './NavbarMobile';
import logo from "../assets/IMC Logo.png"
import { TiThMenu } from "react-icons/ti";
import { FaUserCircle, FaRulerCombined } from "react-icons/fa";
import { MdOutlineFacebook } from "react-icons/md";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { RiPencilRulerFill } from "react-icons/ri";
import { MdContacts } from "react-icons/md";
import { CgMenuLeftAlt } from "react-icons/cg";
import { motion } from 'framer-motion';
import { HiPencilAlt } from "react-icons/hi";
import { PiBookOpenTextFill } from "react-icons/pi";
import { PiPencilCircleBold } from "react-icons/pi";
import { PiVideoFill } from "react-icons/pi";
import { BsAndroid2 } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { auth } from "./Firebase"
import { onAuthStateChanged, signOut } from 'firebase/auth';





const Navbar = () => {
    const [menuBar, setMenuBar] = useState(false)

    const [isOpen, setIsOpen] = useState(false);

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
    
        return () => unsubscribe();
      }, []);
  

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };
    

    async function handleLogout(){
        try {
            
            await auth.signOut()
            window.location.href="/"
            console.log('Admin Logout successfully')
        } catch (error) {
            
            console.error("Error Logging Out:",error.message)
        }
    }
  return (
    <div>
        <header className=''>
           
           {menuBar &&  <NavbarMobile setMenuBar = {setMenuBar} /> }
            <div className='GlassBg'>
                <nav className='flex items-center justify-between px-8 mt-5 md:hidden'>
                    <div className=' flex items-center gap-5'>
                        <CgMenuLeftAlt onClick={() => setMenuBar(true)} className=' text-3xl cursor-pointer md:hidden text-[hsl(26,100%,50%)]'/>
                        <FaUserCircle className=' text-3xl text-[#ff8400] md:hidden drop-shadow-md cursor-pointer'/>
                        
                    </div>
                    <div className=' p-2'>
                        <img src={logo} className=' w-auto h-[50px] cursor-pointer' alt="" />
                    </div>
                </nav>
            </div>
            <div className='md:fixed md:left-0 md:top-0 md:h-[100vh] md:w-[300px] md:mx-auto md:flex md:justify-center md:items-center lg:w-[400px] GlassBg hidden border-[.1px] border-[#fff] fixed'>
            <nav className=' hidden md:block'>
            {user ? (
                <div className='absolute top-6 right-5'>
                    <button className='px-8 py-2 bg-white rounded-3xl shadow-[inset_-12px_-8px_40px_#ff8400] border-[.1px] border-white text-[#fff] font-bold' onClick={handleLogout}>Logout</button>
                </div>
                ) : (
                <div className='absolute top-6 right-5'>
                    <Link to='/introduction'>
                    <button className='px-8 py-2 bg-white rounded-3xl shadow-[inset_-12px_-8px_40px_#ff8400] border-[.1px] border-white text-[#fff] font-bold'>Login</button>
                    </Link>
                </div>
                )}
                <div className=' w-[130px] h-auto mx-auto mb-5'>
                    <img src={logo} className=' w-full h-full drop-shadow-md' alt="" />
                </div>
                <div className=' text-center text-2xl font-semibold mb-10'>IMC Business Solution</div>
                <div className=' flex justify-center items-center gap-10 mb-5 bg-white p-5 rounded-full BoxShadow'>
                    <div className=' text-xl'><MdOutlineFacebook/></div>
                    <div className=' text-xl'><BiLogoInstagramAlt/></div>
                    <div className=' text-xl'><IoLogoWhatsapp/></div>
                    <div className=' text-xl'><FaYoutube/></div>
                </div>
                <div className=' flex justify-center text-center items-center'>
                <ul className='flex flex-col gap-10 font-semibold'>
                    <li>
                        <Link to="/" className=' flex justify-center items-center gap-5'>
                            <div className=' text-[#ff9100]'><FaHome /></div>
                            <div>Home</div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/websites" className=' flex justify-center items-center gap-5'>
                            <div className=' text-[#ff9100]'><FaEarthAmericas /></div>
                            <div>Websites</div>
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
                                    <Link to="/posters" className='flex justify-start items-center gap-5'>
                                        <div className='text-[#ff9100]'><HiPencilAlt /></div>
                                        <div>Posters</div>
                                    </Link>
                                </li>
                                <li className='mt-3'>
                                    <Link to="/brochure" className='flex justify-start items-center gap-5'>
                                        <div className='text-[#ff9100]'><PiBookOpenTextFill /></div>
                                        <div>Brochure</div>
                                    </Link>

                                </li>
                                <li className='mt-3'>
                                    <Link to="/logos" className='flex justify-start items-center gap-5'>
                                        <div className='text-[#ff9100]'><PiPencilCircleBold /></div>
                                        <div>Logos</div>
                                    </Link>
                                </li>
                            </motion.ul>
                            )}
                        </div>
                    </li>
                    <li>
                        <Link to="/android" className=' flex justify-center items-center gap-5'>
                            <div className=' text-[#ff9100]'><BsAndroid2 /></div>
                            <div>App</div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/video" className=' flex justify-center items-center gap-5'>
                            <div className=' text-[#ff9100]'><PiVideoFill /></div>
                            <div>Video</div>
                        </Link>
                    </li>
                </ul>
            </div>
            </nav>
            </div>
        </header>
    </div>
  )
}

export default Navbar
