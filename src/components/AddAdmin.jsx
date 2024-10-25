import React from 'react'

const AddAdmin = () => {
  return (
    <div className='md:ml-[300px] lg:ml-[450px] mt-5 p-5 flex justify-center items-center overflow-hidden'>
      <section className='Mlg:max-w-[1200px] Mlg:mx-auto mt-16 md:mt-0 w-full lg:px-10'>
        <div className='FontStyle-Top text-3xl md:text-[52px] text-[#363636] mb-5 leading-normal text-center'>Add Users</div>
            <div className='flex justify-center items-center w-full'>
                <form action="" className='w-full flex flex-col justify-center items-center gap-5'>
                    <input type="text" placeholder='Enter Name' className='px-3 py-2 rounded-xl w-full outline-none border-none'required />
                    <input type="text" placeholder='Enter Company Name' className='px-3 py-2 rounded-xl w-full outline-none border-none' required />
                    <input type="text" placeholder='Facebook Url' className='px-3 py-2 rounded-xl w-full outline-none border-none' />
                    <input type="text" placeholder='Instagram Url' className='px-3 py-2 rounded-xl w-full outline-none border-none' />
                    <input type="text" placeholder='Whatsapp Url' className='px-3 py-2 rounded-xl w-full outline-none border-none' />
                    <input type="text" placeholder='Youtube Url' className='px-3 py-2 rounded-xl w-full outline-none border-none' />
                    <input type="text" placeholder='Website Url' className='px-3 py-2 rounded-xl w-full outline-none border-none' />
                    <input type="text" placeholder='LinkedIn Url' className='px-3 py-2 rounded-xl w-full outline-none border-none' />
                    <input type="text" placeholder='X Url' className='px-3 py-2 rounded-xl w-full outline-none border-none' />
                    <input type="file" />
                    <button className='px-8 py-2 bg-[#ff7f2a] rounded-3xl font-semibold text-[#fff]'>Add User</button>
                </form>
            </div>
      </section>
    </div>
  )
}

export default AddAdmin
