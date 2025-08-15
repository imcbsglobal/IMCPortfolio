import React, { useState, useEffect } from "react";
import NavbarMobile from "./NavbarMobile";
import logo from "../assets/IMC Logo.png";
import { TiThMenu } from "react-icons/ti";
import {
  FaUserCircle,
  FaRulerCombined,
  FaUserSlash,
  FaYoutube,
} from "react-icons/fa";
import { MdOutlineFacebook, MdContacts } from "react-icons/md";
import { BiLogoInstagramAlt, BiLogoFacebook } from "react-icons/bi";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { RiPencilRulerFill } from "react-icons/ri";
import { CgMenuLeftAlt } from "react-icons/cg";
import { motion } from "framer-motion";
import { HiPencilAlt } from "react-icons/hi";
import {
  PiBookOpenTextFill,
  PiPencilCircleBold,
  PiVideoFill,
} from "react-icons/pi";
import { BsAndroid2, BsInstagram } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { GrMultimedia } from "react-icons/gr";
import { FaGlobe } from "react-icons/fa6";
import { IoGlobeOutline } from "react-icons/io5";
import { HiDesktopComputer } from "react-icons/hi";
import { IoHardwareChip } from "react-icons/io5";
import flashLogo from "../assets/flashlogo.png";
import absyLolgo from "../assets/absylogo.png";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaCommentSms } from "react-icons/fa6";
import { MdLeaderboard } from "react-icons/md";

const Navbar = () => {
  const [menuBar, setMenuBar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [currentAdmin, setCurrentAdmin] = useState(null);

  // useEffect(() => {
  //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //       setUser(currentUser);
  //     });

  //     return () => unsubscribe();
  // }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown2 = () => {
    setSocialOpen(!socialOpen);
  };

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/";
      console.log("Admin Logout successfully");
    } catch (error) {
      console.error("Error Logging Out:", error.message);
    }
  }

  const adminDatas = [
    {
      name: "IMC Business Solutions",
      email: "info@imcbusiness.com", // Add the email property
      img: logo,
      facebook: "https://www.facebook.com/profile.php?id=100069040622427",
      instagram: "https://www.instagram.com/imcbusinesssolution/",
      whatasapp: "https://wa.me/917593820005 ",
      youtube: "https://www.youtube.com/@IMCBUSINESSSOLUTIONS",
      website: "https://imcbs.com/",
      linkedIn: "",
      X: "",
    },
    {
      name: "Flash Innovations",
      email: "info@flashinnovations.com", // Add the email property
      img: flashLogo,
      facebook: "https://www.facebook.com/sajith.thomas.710",
      instagram:
        "https://www.instagram.com/sajith_thomazzzz/profilecard/?igsh=enV2NG9qN3A0MWo=",
      whatasapp: "https://www.linkedin.com/in/sajith-thomas-1bb386304",
      youtube: "https://www.linkedin.com/in/sajith-thomas-1bb386304",
      website: "https://www.linkedin.com/in/sajith-thomas-1bb386304",
      linkedIn: "",
      X: "",
    },
    {
      name: "Absy IT Solutions",
      email: "info@absy.com", // Add the email property
      img: absyLolgo,
      facebook: "https://youtu.be/7O1H9kr1CsA?si=aiVOoiv1eB7m_Lp9",
      instagram: "https://youtu.be/kT2KSDwlw28?si=-I7rMmFUdegK-Ku0",
      whatasapp: "https://youtu.be/y4cb2EWKTaE?si=ud8DBYdoaBvpZys-",
      youtube: "https://youtu.be/y4cb2EWKTaE?si=ud8DBYdoaBvpZys-",
      website: "https://youtu.be/y4cb2EWKTaE?si=ud8DBYdoaBvpZys-",
      linkedIn: "",
      X: "",
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
    <div className="fixed ">
      <header className=" m-0 p-0 fixed w-full">
        {menuBar && <NavbarMobile setMenuBar={setMenuBar} />}
        <div className=" relative ">
          <nav className="flex items-center justify-between px-8 md:hidden bg-[#fff] rounded-3xl GlassBg">
            <div className="flex items-center gap-5">
              <CgMenuLeftAlt
                onClick={() => setMenuBar(true)}
                className="text-3xl cursor-pointer md:hidden text-[hsl(26,100%,50%)]"
              />
              {user ? (
                <FaUserSlash
                  className="text-3xl text-[#ff8400] md:hidden drop-shadow-md cursor-pointer"
                  onClick={handleLogout}
                />
              ) : (
                <Link to="/introduction">
                  <FaUserCircle className="text-3xl text-[#ff8400] md:hidden drop-shadow-md cursor-pointer" />
                </Link>
              )}
            </div>
            <div className="p-2">
              <a href="https://imcportfolio.in/">
                {currentAdmin && currentAdmin.img ? (
                  <img
                    src={currentAdmin.img}
                    className="w-auto h-[50px] cursor-pointer"
                    alt=""
                  />
                ) : (
                  <img
                    src={logo}
                    className="w-auto h-[50px] cursor-pointer"
                    alt=""
                  />
                )}
              </a>
            </div>
          </nav>
        </div>
        <div className="md:fixed md:left-0 xlg:w-[350px] md:top-0  md:mx-auto md:flex md:justify-center md:items-center GlassBg hidden border-[1px] border-[#fff] fixed py-20 bg-[#fff]">
          <nav className="hidden md:block">
            {user ? (
              <div className="absolute top-6 right-5">
                <button
                  className="px-8 py-2 bg-white rounded-3xl shadow-[inset_-12px_-8px_40px_#ff8400] border-[.1px] border-white text-[#fff] font-bold"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="absolute top-6 right-5">
                <Link to="/introduction">
                  <button className="px-8 py-2 bg-white rounded-3xl shadow-[inset_-12px_-8px_40px_#ff8400] border-[.1px] border-white text-[#fff] font-bold">
                    Login
                  </button>
                </Link>
              </div>
            )}
            <div className="w-[80px] h-auto mx-auto mb-5">
              <a href="https://imcportfolio.in/">
                {currentAdmin && currentAdmin.img ? (
                  <img
                    src={currentAdmin.img}
                    className="w-full h-full"
                    alt=""
                  />
                ) : (
                  <img
                    src={logo}
                    className="w-full h-full drop-shadow-md"
                    alt=""
                  />
                )}
              </a>
            </div>
            {currentAdmin && currentAdmin.name ? (
              <div className="text-center text-2xl font-semibold mb-5">
                {currentAdmin.name}
              </div>
            ) : (
              <div className="text-center text-2xl font-semibold mb-5">
                IMC Business Solution
              </div>
            )}

            <div className="flex justify-center flex-wrap items-center gap-5 mb-5 bg-white p-5 rounded-full BoxShadow">
              {currentAdmin ? (
                <>
                  {currentAdmin && currentAdmin.website && (
                    <a href={currentAdmin.website}>
                      <div className="text-xl SocialHover">
                        <FaGlobe />
                      </div>
                    </a>
                  )}

                  {currentAdmin && currentAdmin.facebook && (
                    <a href={currentAdmin.facebook}>
                      <div className="text-xl SocialHover">
                        <MdOutlineFacebook />
                      </div>
                    </a>
                  )}
                  
                  {currentAdmin && currentAdmin.instagram && (
                    <a href={currentAdmin.instagram}>
                      <div className="text-xl SocialHover">
                        <BiLogoInstagramAlt />
                      </div>
                    </a>
                  )}
                  
                  {currentAdmin && currentAdmin.whatasapp && (
                    <a href={currentAdmin.whatasapp}>
                      <div className="text-xl SocialHover">
                        <IoLogoWhatsapp />
                      </div>
                    </a>
                  )}
                  
                  {currentAdmin && currentAdmin.youtube && (
                    <a href={currentAdmin.youtube}>
                      <div className="text-xl SocialHover">
                        <FaYoutube />
                      </div>
                    </a>
                  )}
                  
                  {currentAdmin && currentAdmin.linkedIn && (
                    <a href={currentAdmin.linkedIn}>
                      <div className="text-xl SocialHover">
                        <FaLinkedinIn />
                      </div>
                    </a>
                  )}
                  
                  {currentAdmin && currentAdmin.X && (
                    <a href={currentAdmin.X}>
                      <div className="text-xl SocialHover">
                        <FaXTwitter />
                      </div>
                    </a>
                  )}
                  
                  <a href="https://ssm.imcbs.com/">
                      <div className="text-xl SocialHover">
                        <MdLeaderboard />
                      </div>
                  </a>
                </>
              ) : (
                <>
                  <a href="https://imcbs.com/">
                    <div className="text-xl SocialHover">
                      <FaGlobe />
                    </div>
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=100069040622427">
                    <div className="text-xl SocialHover">
                      <MdOutlineFacebook />
                    </div>
                  </a>
                  <a href="https://www.instagram.com/imcbusinesssolution/">
                    <div className="text-xl SocialHover">
                      <BiLogoInstagramAlt />
                    </div>
                  </a>
                  <a href="https://wa.me/917593820005">
                    <div className="text-xl SocialHover">
                      <IoLogoWhatsapp />
                    </div>
                  </a>
                  <a href="https://www.youtube.com/@IMCBUSINESSSOLUTIONS">
                    <div className="text-xl SocialHover">
                      <FaYoutube />
                    </div>
                  </a>
                  <a href="https://www.linkedin.com/in/imc-business-solutions-0b0066335/">
                    <div className="text-xl SocialHover">
                      <FaLinkedinIn />
                    </div>
                  </a>
                  <a href="https://x.com/imcbsblobal">
                    <div className="text-xl SocialHover">
                      <FaXTwitter />
                    </div>
                  </a>
                  <a href="https://myimc.in/">
                      <div className="text-xl SocialHover">
                        <MdLeaderboard />
                      </div>
                  </a>
                </>
              )}
            </div>
            <div className="flex justify-center text-center items-center">
              <ul className="flex flex-col gap-5 font-semibold items-start justify-start">
                <li className="NavbarHover">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `flex justify-center items-center gap-5 ${
                        isActive ? "text-[#ff9100] font-bold" : ""
                      }`
                    }
                  >
                    <div>
                      <FaHome />
                    </div>
                    <div>Home</div>
                  </NavLink>
                </li>
                <li className="NavbarHover">
                  <NavLink
                    to="/software"
                    className={({ isActive }) =>
                      `flex justify-center items-center gap-5 ${
                        isActive ? "text-[#ff9100] font-bold" : ""
                      }`
                    }
                  >
                    <div>
                      <HiDesktopComputer />
                    </div>
                    <div>ERP Softwares</div>
                  </NavLink>
                </li>
                <li className="NavbarHover">
                  <NavLink
                    to="/websites"
                    className={({ isActive }) =>
                      `flex justify-center items-center gap-5 ${
                        isActive ? "text-[#ff9100] font-bold" : ""
                      }`
                    }
                  >
                    <div>
                      <FaEarthAmericas />
                    </div>
                    <div>Websites</div>
                  </NavLink>
                </li>
                <li className="NavbarHover">
                  <NavLink
                    to="/android"
                    className={({ isActive }) =>
                      `flex justify-center items-center gap-5 ${
                        isActive ? "text-[#ff9100] font-bold" : ""
                      }`
                    }
                  >
                    <div>
                      <BsAndroid2 />
                    </div>
                    <div>Mobile Application</div>
                  </NavLink>
                </li>
                <li className="NavbarHover">
                  <NavLink
                    to="/hardware"
                    className={({ isActive }) =>
                      `flex justify-center items-center gap-5 ${
                        isActive ? "text-[#ff9100] font-bold" : ""
                      }`
                    }
                  >
                    <div>
                      <IoHardwareChip />
                    </div>
                    <div>Hardware</div>
                  </NavLink>
                </li>
                <li className="NavbarHover">
                  <NavLink
                    to="/webapplication"
                    className={({ isActive }) =>
                      `flex justify-center items-center gap-5 ${
                        isActive ? "text-[#ff9100] font-bold" : ""
                      }`
                    }
                  >
                    <div>
                      <IoGlobeOutline />
                    </div>
                    <div>Web Application</div>
                  </NavLink>
                </li>
                <li className="NavbarHover">
                  <div className="flex flex-col">
                    <div
                      className="flex justify-center items-center gap-5 cursor-pointer"
                      onClick={toggleDropdown}
                    >
                      <div>
                        <RiPencilRulerFill />
                      </div>
                      <div>Graphic Design</div>
                    </div>
                    {isOpen && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-14 mt-2"
                      >
                        <li className="mt-2 insideNavbarHover">
                          <NavLink
                            to="/posters"
                            className={({ isActive }) =>
                              `flex justify-start items-center gap-5 ${
                                isActive ? "text-[#ff9100] font-bold" : ""
                              }`
                            }
                          >
                            <div>
                              <HiPencilAlt />
                            </div>
                            <div>Posters</div>
                          </NavLink>
                        </li>
                        <li className="mt-3 insideNavbarHover">
                          <NavLink
                            to="/brochure"
                            className={({ isActive }) =>
                              `flex justify-start items-center gap-5 ${
                                isActive ? "text-[#ff9100] font-bold" : ""
                              }`
                            }
                          >
                            <div>
                              <PiBookOpenTextFill />
                            </div>
                            <div>Brochure</div>
                          </NavLink>
                        </li>
                        <li className="mt-3 insideNavbarHover">
                          <NavLink
                            to="/logos"
                            className={({ isActive }) =>
                              `flex justify-start items-center gap-5 ${
                                isActive ? "text-[#ff9100] font-bold" : ""
                              }`
                            }
                          >
                            <div>
                              <PiPencilCircleBold />
                            </div>
                            <div>Logos</div>
                          </NavLink>
                        </li>
                      </motion.ul>
                    )}
                  </div>
                </li>

                <li className="NavbarHover">
                  <div className="flex flex-col">
                    <div
                      className="flex justify-center items-center gap-5 cursor-pointer"
                      onClick={toggleDropdown2}
                    >
                      <div>
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
                        <li className="mt-2 insideNavbarHover">
                          <NavLink
                            to="/instagram"
                            className={({ isActive }) =>
                              `flex justify-start items-center gap-5 ${
                                isActive ? "text-[#ff9100] font-bold" : ""
                              }`
                            }
                          >
                            <div>
                              <BsInstagram />
                            </div>
                            <div>Instagram</div>
                          </NavLink>
                        </li>
                        <li className="mt-3 insideNavbarHover">
                          <NavLink
                            to="/facebook"
                            className={({ isActive }) =>
                              `flex justify-start items-center gap-5 ${
                                isActive ? "text-[#ff9100] font-bold" : ""
                              }`
                            }
                          >
                            <div>
                              <BiLogoFacebook />
                            </div>
                            <div>Facebook</div>
                          </NavLink>
                        </li>
                        <li className="mt-3 insideNavbarHover">
                          <NavLink
                            to="/video"
                            className={({ isActive }) =>
                              `flex justify-start items-center gap-5 ${
                                isActive ? "text-[#ff9100] font-bold" : ""
                              }`
                            }
                          >
                            <div>
                              <PiVideoFill />
                            </div>
                            <div>Video</div>
                          </NavLink>
                        </li>
                        <li className="mt-3 insideNavbarHover">
                          <NavLink
                            to="/smsWhatsappMarketing"
                            className={({ isActive }) =>
                              `flex justify-start items-center gap-5 ${
                                isActive ? "text-[#ff9100] font-bold" : ""
                              }`
                            }
                          >
                            <div>
                              <FaCommentSms />
                            </div>
                            <div>SMS / Whatsapp Marketing</div>
                          </NavLink>
                        </li>
                      </motion.ul>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
// sg