import React, { useState, useEffect } from 'react';
import Logo from "../assets/logo.png";
import { FaFacebookF } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaYoutube } from "react-icons/fa6";
import introImg from "../assets/intro-img.png";
import yellowShade from "../assets/yellow-shade.png";
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase';
import { BsFillEyeSlashFill } from "react-icons/bs";
import { toast, ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'; 
import { BsFillEyeFill } from "react-icons/bs";

const Introduction = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [openEye,setOpenEye] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Admin Logged Successfully');
      window.location.href="/"
      toast.success("Admin Logged Successfully", {
        position: "top-center"
      });
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Incorrect Username or Password", {
        position: "top-center"
      });
    }
  };

  return (
    <div>
      <section className=''>
        <div className=''>
          <ToastContainer/>
        </div>
        <div className='h-screen w-screen flex flex-col justify-center items-center gap-10 bg-[#ffd500] md:max-w-[600px] md:h-full md:w-full md:max-h-[650px] relative md:mx-auto md:mt-[5%] md:rounded-3xl md:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] lg:max-w-[900px] lg:grid lg:grid-cols-2 lg:place-items-center lg:max-h-[900px] lg:h-full lg:mt-[15%] lg:gap-0'>
          <div className='absolute h-full w-full -z-20 md:rounded-3xl'>
            <img src={yellowShade} className='h-full w-full object-cover md:rounded-3xl' alt="" />
          </div>
          <div className='w-auto h-[350px] z-20'>
            <img src={introImg} className='h-full w-full drop-shadow-lg' alt="" />
          </div>
          <div className='mx-auto flex flex-col justify-center items-center'>
            <div className='h-auto w-[200px] mb-1'>
              <img className='drop-shadow-md' src={Logo} alt="" />
            </div>
            <div className='flex justify-center items-center m-10 w-full'>
              <form className='flex flex-col gap-5 w-full' onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder='User Name'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='pl-5 py-3 rounded-3xl outline-none border-none w-full'
                />
                <div className=' relative flex items-center'>
                  <input
                    type={openEye ? "text" : "password" }
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='pl-5 py-3 rounded-3xl outline-none border-none w-full'
                  />
                  <span className='absolute right-2'>
                    {openEye ? <BsFillEyeSlashFill onClick={()=>setOpenEye(false)}/> : <BsFillEyeFill onClick={()=>setOpenEye(true)}/>}
                    
                    
                  </span>
                </div>
                <button
                  className='bg-white px-8 py-3 rounded-2xl shadow-md cursor-pointer text-[#ff9d24] font-bold z-10'
                  type='submit'
                >
                  Get Started
                </button>
              </form>
            </div>
            {user && <p>Welcome, {user.email}</p>}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Introduction;
