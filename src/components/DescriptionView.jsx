import React,{ useState, useEffect } from 'react'
import { IoCloseCircleSharp } from "react-icons/io5";

const DescriptionView = ({setOpenDescription}) => {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
  return (
    <div className='fixed w-full h-screen bottom-0 top-0 right-0 left-0 bg-[#000] z-[999] flex justify-center items-center px-2'>
        <div className='text-[#fff] font-bold text-2xl absolute top-5 right-5'>
            <IoCloseCircleSharp className='cursor-pointer' onClick={()=>setOpenDescription(false)}/>
        </div>
      <div className='w-full px-2 Mlg:max-w-[900px] Mlg:w-full rounded-3xl GlassBg p-5'>
        <div className='text-justify p-5 text-[#fff]'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique a ducimus eligendi ut culpa, explicabo magni maiores dolor modi neque. Atque eligendi dignissimos sunt. At, libero? Expedita, quas? Voluptates, cupiditate.
            Voluptate fuga aliquam cum excepturi, beatae dignissimos iure numquam accusamus odit soluta optio pariatur consequuntur at impedit eum tempora eveniet voluptas. Fugit reiciendis iusto ab perferendis deleniti modi rem quasi.
            Quidem ab vitae, aliquam ullam recusandae eveniet exercitationem, neque odit dolor ipsa, delectus quibusdam. Quis, porro. Veritatis deleniti sed labore quos ea enim quae aliquam blanditiis asperiores incidunt! Voluptas, architecto?
        </div>
      </div>
    </div>
  )
}

export default DescriptionView
