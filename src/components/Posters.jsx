import React from 'react'
import post1 from "../assets/post1.jpg"
import post2 from "../assets/post2.jpg"
import post3 from "../assets/post3.jpg"
import post4 from "../assets/post4.jpg"
import post5 from "../assets/post5.jpg"
import post6 from "../assets/post6.jpg"


const Posters = () => {
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
                            <img src={post1} className=' w-full h-full object-cover rounded-3xl' alt="" />
                        </div>
                    </li>
                    <li>
                        <div className=' h-[300px] w-[300px] rounded-3xl boxShadow'>
                            <img src={post2} className=' w-full h-full object-cover rounded-3xl' alt="" />
                        </div>
                    </li>
                    <li>
                        <div className=' h-[300px] w-[300px] rounded-3xl boxShadow'>
                            <img src={post3} className=' w-full h-full object-cover rounded-3xl' alt="" />
                        </div>
                    </li>
                    <li>
                        <div className=' h-[300px] w-[300px] rounded-3xl boxShadow'>
                            <img src={post4} className=' w-full h-full object-cover rounded-3xl' alt="" />
                        </div>
                    </li>
                    <li>
                        <div className=' h-[300px] w-[300px] rounded-3xl boxShadow'>
                            <img src={post5} className=' w-full h-full object-cover rounded-3xl' alt="" />
                        </div>
                    </li>
                    <li>
                        <div className=' h-[300px] w-[300px] rounded-3xl boxShadow'>
                            <img src={post6} className=' w-full h-full object-cover rounded-3xl' alt="" />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
      </section>
    </div>
  )
}

export default Posters
