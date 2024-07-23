import React from 'react'
import app1 from "../assets/app1.jpg"
import app2 from "../assets/app2.jpg"
import app3 from "../assets/app3.jpg"
import app4 from "../assets/app4.jpg"
import app5 from "../assets/app5.jpg"
import app6 from "../assets/app6.jpg"
import app7 from "../assets/app7.jpg"


const Android = () => {
  return (
    <div className='  md:ml-[300px] lg:ml-[450px] mt-5 p-5'>
      <section>
        <div>
            <div className='FontStyle-Top text-3xl md:text-[52px] text-[#363636] mb-5'>Our Poster Works</div>
            <div className=' p-5 rounded-2xl text-[#3d1f00] boxShadow md:w-[400px] lg:w-[600px]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae nihil praesentium fugit amet, sequi incidunt id recusandae ut aperiam, odit velit eveniet. Reprehenderit fuga aperiam itaque at minus possimus nesciunt?</div>
        </div>
        <div className=' flex justify-center items-center mt-10'>
            <div>
                <ul className=' grid place-items-center md:grid-cols-2 lg:grid-cols-3 gap-10'>
                    <li>
                        <div className=' h-[300px] w-[300px] rounded-3xl boxShadow'>
                            <img src={app1} className=' w-full h-full object-cover rounded-3xl' alt="" />
                        </div>
                    </li>
                    <li>
                        <div className=' h-[300px] w-[300px] rounded-3xl boxShadow'>
                            <img src={app3} className=' w-full h-full object-cover rounded-3xl' alt="" />
                        </div>
                    </li>
                    <li>
                        <div className=' h-[300px] w-[300px] rounded-3xl boxShadow'>
                            <img src={app4} className=' w-full h-full object-cover rounded-3xl' alt="" />
                        </div>
                    </li>
                    <li>
                        <div className=' h-[300px] w-[300px] rounded-3xl boxShadow'>
                            <img src={app5} className=' w-full h-full object-cover rounded-3xl' alt="" />
                        </div>
                    </li>
                    <li>
                        <div className=' h-[300px] w-[300px] rounded-3xl boxShadow'>
                            <img src={app6} className=' w-full h-full object-cover rounded-3xl' alt="" />
                        </div>
                    </li>
                    <li>
                        <div className=' h-[300px] w-[300px] rounded-3xl boxShadow'>
                            <img src={app7} className=' w-full h-full object-cover rounded-3xl' alt="" />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
      </section>
    </div>
  )
}

export default Android
