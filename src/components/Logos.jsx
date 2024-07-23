import React from 'react'
import logo1 from "../assets/logo1.jpg"
import logo2 from "../assets/logo2.jpg"
import logo3 from "../assets/logo3.jpg"
import logo4 from "../assets/logo4.jpg"
import logo5 from "../assets/logo5.jpg"
import logo6 from "../assets/logo6.jpg"



const Logos = () => {
  return (
    <div className='  md:ml-[300px] lg:ml-[450px] mt-5 p-5'>
      <section>
        <div>
            <div className='FontStyle-Top text-3xl md:text-[52px] text-[#363636] mb-5'>Our Logo Works</div>
            <div className=' p-5 rounded-2xl text-[#3d1f00] boxShadow md:w-[400px] lg:w-[600px]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae nihil praesentium fugit amet, sequi incidunt id recusandae ut aperiam, odit velit eveniet. Reprehenderit fuga aperiam itaque at minus possimus nesciunt?</div>
        </div>
        <div className=' flex justify-center items-center mt-10'>
            <div>
                <ul className=' grid place-items-center md:grid-cols-2 lg:grid-cols-3 gap-10'>
                    <li>
                        <div className=' h-[300px] w-[300px] rounded-3xl boxShadow'>
                            <img src={logo1} className=' w-full h-full object-cover rounded-3xl' alt="" />
                        </div>
                    </li>
                    <li>
                        <div className=' h-[300px] w-[300px] rounded-3xl boxShadow'>
                            <img src={logo2} className=' w-full h-full object-cover rounded-3xl' alt="" />
                        </div>
                    </li>
                    <li>
                        <div className=' h-[300px] w-[300px] rounded-3xl boxShadow'>
                            <img src={logo3} className=' w-full h-full object-cover rounded-3xl' alt="" />
                        </div>
                    </li>
                    <li>
                        <div className=' h-[300px] w-[300px] rounded-3xl boxShadow'>
                            <img src={logo4} className=' w-full h-full object-cover rounded-3xl' alt="" />
                        </div>
                    </li>
                    <li>
                        <div className=' h-[300px] w-[300px] rounded-3xl boxShadow'>
                            <img src={logo5} className=' w-full h-full object-cover rounded-3xl' alt="" />
                        </div>
                    </li>
                    <li>
                        <div className=' h-[300px] w-[300px] rounded-3xl boxShadow'>
                            <img src={logo6} className=' w-full h-full object-cover rounded-3xl' alt="" />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
      </section>
    </div>
  )
}

export default Logos
