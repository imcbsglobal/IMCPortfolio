import React, { useState, useEffect } from "react";
import logo from "../assets/IMC Logo.png";
import { MdOutlineFacebook } from "react-icons/md";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { RiPencilRulerFill } from "react-icons/ri";
import { MdContacts } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { PiVideoFill } from "react-icons/pi";
import { BsAndroid2 } from "react-icons/bs";
import { motion } from "framer-motion";
import { HiPencilAlt } from "react-icons/hi";
import { PiBookOpenTextFill } from "react-icons/pi";
import { PiPencilCircleBold } from "react-icons/pi";
import { BsInstagram } from "react-icons/bs";
import { BiLogoFacebook } from "react-icons/bi";
import { GrMultimedia } from "react-icons/gr";
import { FaGlobe } from "react-icons/fa6";
import { HiDesktopComputer } from "react-icons/hi";
import { IoHardwareChip } from "react-icons/io5";
import { IoGlobeOutline } from "react-icons/io5";
import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";
import flashLogo from "../assets/flashlogo.png";
import absyLolgo from "../assets/absylogo.png";
import { FaCommentSms } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { MdLeaderboard } from "react-icons/md";


const NavbarMobile = ({ setMenuBar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [user, setUser] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Social Media Drop Down
  const toggleDropdown2 = () => {
    setSocialOpen(!socialOpen);
  };

  const adminDatas = [
    {
      name: "IMC Business Solutions",
      email: "info@imcbusiness.com",
      img: logo,
      facebook: "https://www.facebook.com/profile.php?id=100069040622427",
      instagram: "https://www.instagram.com/imcbusinesssolution/",
      whatasapp: "https://wa.me/917593820005",
      youtube: "https://www.youtube.com/@IMCBUSINESSSOLUTIONS",
      website: "https://imcbsglobal.com/",
      linkedIn : "https://www.linkedin.com/in/imc-business-solutions-0b0066335/",
      X : "https://x.com/imcbsblobal"
    },
    {
      name: "Flash Innovations",
      email: "info@flashinnovations.com",
      img: flashLogo,
      facebook: "https://www.facebook.com/sajith.thomas.710",
      instagram: "https://www.instagram.com/sajith_thomazzzz/",
      whatasapp: "https://www.linkedin.com/in/sajith-thomas-1bb386304",
      youtube: "https://www.linkedin.com/in/sajith-thomas-1bb386304",
      website: "https://www.linkedin.com/in/sajith-thomas-1bb386304",
      linkedIn : "",
      X : ""
    },
    {
      name: "Absy IT Solutions",
      email: "info@absy.com",
      img: absyLolgo,
      facebook: "https://youtu.be/7O1H9kr1CsA",
      instagram: "https://youtu.be/kT2KSDwlw28",
      whatasapp: "https://youtu.be/y4cb2EWKTaE",
      youtube: "https://youtu.be/y4cb2EWKTaE",
      website: "https://youtu.be/y4cb2EWKTaE",
      linkedIn : "",
      X : ""
    },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userEmail = localStorage.getItem("userEmail");
        const admin = adminDatas.find((admin) => admin.email === userEmail);
        setCurrentAdmin(admin);
      } else {
        setCurrentAdmin(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="">
      <div className=" fixed top-0 left-0 h-[130vh] bottom-0 w-full bg-white z-[999] flex flex-col justify-center items-center gap-10">
        <div className=" absolute top-10 right-10 text-3xl text-[#ff9100]  drop-shadow-sm cursor-pointer">
          <IoCloseCircle onClick={() => setMenuBar(false)} />
        </div>

        <div>
          <div className="w-[130px] h-auto mb-5 flex justify-center mx-auto">
            {currentAdmin && currentAdmin.img ? (
              <a href="">
                <img
                  src={currentAdmin.img}
                  className="w-full h-full object-contain cursor-pointer"
                  alt=""
                />
              </a>
            ) : (
              <a href="">
                <img
                  src={logo}
                  className="w-full h-full object-contain cursor-pointer"
                  alt=""
                />
              </a>
            )}
          </div>
          {currentAdmin && currentAdmin.name ? (
            <div className="text-center text-3xl font-semibold mb-5">
              {currentAdmin.name}
            </div>
          ) : (
            <div className="text-center text-3xl font-semibold mb-5">
              IMC Business Solutions
            </div>
          )}
          <div className="flex justify-center items-center gap-10 mb-5 bg-white p-5 rounded-full BoxShadow">
            {currentAdmin ? (
              <>
                {currentAdmin && currentAdmin.website && (
                    <a href="https://imcbsglobal.com/">
                        <div className="text-xl ">
                        <FaGlobe />
                        </div>
                    </a>
                )}
                {currentAdmin && currentAdmin.facebook && (
                    <a href="https://www.facebook.com/profile.php?id=100069040622427">
                        <div className="text-xl ">
                        <MdOutlineFacebook />
                        </div>
                    </a>
                )}
                {currentAdmin && currentAdmin.instagram && (
                    <a href="https://www.instagram.com/imcbusinesssolution/">
                        <div className="text-xl ">
                        <BiLogoInstagramAlt />
                        </div>
                    </a>
                )}
                {currentAdmin && currentAdmin.whatasapp && (
                    <a href="https://wa.me/917593820005">
                        <div className="text-xl ">
                        <IoLogoWhatsapp />
                        </div>
                    </a>
                )}
                {currentAdmin && currentAdmin.youtube && (
                    <a href="https://www.youtube.com/@IMCBUSINESSSOLUTIONS">
                        <div className="text-xl ">
                        <FaYoutube />
                        </div>
                    </a>
                )}

                {currentAdmin && currentAdmin.linkedIn && (
                    <a href="https://www.linkedin.com/in/imc-business-solutions-0b0066335/">
                    <div className="text-xl ">
                      <FaLinkedinIn />
                    </div>
                  </a>
                )}
                {currentAdmin && currentAdmin.X && (
                    <a href="https://x.com/imcbsblobal">
                        <div className="text-xl ">
                        <FaXTwitter />
                        </div>
                    </a>
                )}

                  <a href="https://sysmac.co.in/">
                      <div className="text-xl">
                        <MdLeaderboard />
                      </div>
                  </a>
              </>
            ) : (
              <>
                <a href="https://imcbsglobal.com/">
                  <div className="text-xl ">
                    <FaGlobe />
                  </div>
                </a>
                <a href="https://www.facebook.com/profile.php?id=100069040622427">
                  <div className="text-xl ">
                    <MdOutlineFacebook />
                  </div>
                </a>
                <a href="https://www.instagram.com/imcbusinesssolution/">
                  <div className="text-xl ">
                    <BiLogoInstagramAlt />
                  </div>
                </a>
                <a href="https://wa.me/917593820005">
                  <div className="text-xl ">
                    <IoLogoWhatsapp />
                  </div>
                </a>
                <a href="https://www.youtube.com/@IMCBUSINESSSOLUTIONS">
                  <div className="text-xl ">
                    <FaYoutube />
                  </div>
                </a>

                <a href="https://www.linkedin.com/in/imc-business-solutions-0b0066335/">
                  <div className="text-xl ">
                    <FaLinkedinIn />
                  </div>
                </a>
                <a href="https://x.com/imcbsblobal">
                  <div className="text-xl ">
                    <FaXTwitter />
                  </div>
                </a>
                <a href="https://sysmac.co.in/">
                      <div className="text-xl ">
                        <MdLeaderboard />
                      </div>
                  </a>
              </>
            )}
          </div>
        </div>

        <div className=" flex justify-center text-center items-center">
          <ul className="flex flex-col gap-5 font-semibold">
            <li>
              <Link to="/" onClick={() => setMenuBar(false)}>
                <div className=" flex justify-center items-center gap-5">
                  <div className=" text-[#ff9100]">
                    <FaHome />
                  </div>
                  <div>Home</div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/software" onClick={() => setMenuBar(false)}>
                <div className=" flex justify-center items-center gap-5">
                  <div className=" text-[#ff9100]">
                    <HiDesktopComputer />
                  </div>
                  <div>ERP Softwares</div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/websites" onClick={() => setMenuBar(false)}>
                <div className=" flex justify-center items-center gap-5">
                  <div className=" text-[#ff9100]">
                    <FaEarthAmericas />
                  </div>
                  <div>Websites</div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/android" onClick={() => setMenuBar(false)}>
                <div className=" flex justify-center items-center gap-5">
                  <div className=" text-[#ff9100]">
                    <BsAndroid2 />
                  </div>
                  <div>Mobile Applications</div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/hardware" onClick={() => setMenuBar(false)}>
                <div className=" flex justify-center items-center gap-5">
                  <div className=" text-[#ff9100]">
                    <IoHardwareChip />
                  </div>
                  <div>Hardwares</div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/webapplication" onClick={() => setMenuBar(false)}>
                <div className=" flex justify-center items-center gap-5">
                  <div className=" text-[#ff9100]">
                    <IoGlobeOutline />
                  </div>
                  <div>Web Applications</div>
                </div>
              </Link>
            </li>
            <li>
              <div className="flex flex-col">
                <div
                  className="flex justify-center items-center gap-5 cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <div className="text-[#ff9100]">
                    <RiPencilRulerFill />
                  </div>
                  <div>Designs</div>
                </div>
                {isOpen && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pl-14 mt-2"
                  >
                    <li className="mt-2">
                      <Link
                        to="/posters"
                        onClick={() => setMenuBar(false)}
                        className="flex justify-start items-center gap-5"
                      >
                        <div className="text-[#ff9100]">
                          <HiPencilAlt />
                        </div>
                        <div>Posters</div>
                      </Link>
                    </li>
                    <li className="mt-3">
                      <Link
                        to="/brochure"
                        onClick={() => setMenuBar(false)}
                        className="flex justify-start items-center gap-5"
                      >
                        <div className="text-[#ff9100]">
                          <PiBookOpenTextFill />
                        </div>
                        <div>Brochure</div>
                      </Link>
                    </li>
                    <li className="mt-3">
                      <Link
                        to="/logos"
                        onClick={() => setMenuBar(false)}
                        className="flex justify-start items-center gap-5"
                      >
                        <div className="text-[#ff9100]">
                          <PiPencilCircleBold />
                        </div>
                        <div>Logos</div>
                      </Link>
                    </li>
                  </motion.ul>
                )}
              </div>
            </li>
            <li>
              <div className="flex flex-col">
                <div
                  className="flex justify-center items-center gap-5 cursor-pointer"
                  onClick={toggleDropdown2}
                >
                  <div className="text-[#ff9100]">
                    <GrMultimedia />
                  </div>
                  <div>Digital Marketing</div>
                </div>
                {socialOpen && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pl-14 mt-2"
                  >
                    <li className="mt-2">
                      <Link
                        to="/instagram"
                        onClick={() => setMenuBar(false)}
                        className="flex justify-start items-center gap-5"
                      >
                        <div className="text-[#ff9100]">
                          <BsInstagram />
                        </div>
                        <div>Instagram</div>
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link
                        to="/facebook"
                        onClick={() => setMenuBar(false)}
                        className="flex justify-start items-center gap-5"
                      >
                        <div className="text-[#ff9100]">
                          <BiLogoFacebook />
                        </div>
                        <div>Facebook</div>
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link to="/video" onClick={() => setMenuBar(false)}>
                        <div className=" flex justify-start items-center gap-5">
                          <div className=" text-[#ff9100]">
                            <PiVideoFill />
                          </div>
                          <div>Video</div>
                        </div>
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link
                        to="/smsWhatsappMarketing"
                        onClick={() => setMenuBar(false)}
                      >
                        <div className=" flex justify-start items-center gap-5">
                          <div className=" text-[#ff9100]">
                            <FaCommentSms />
                          </div>
                          <div>SMS / Whatsapp Marketing</div>
                        </div>
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
  );
};

export default NavbarMobile;
