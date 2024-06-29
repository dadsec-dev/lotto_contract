import React from 'react'
import icon from '../../assets/Ellipse6.png'
import Image from 'next/image'

const Copyright = () => {
  return (
    <div>
        <div className=" h-px w-100% bg-[#313030]"></div>
        <div className='my-6 w-[25%] mx-auto flex space-x-4'>
        <Image src={icon} alt='icon' className='w-[7%]'/>
        <h1 className='text-[#8A8383] '>Copyright ® 2024  All rights Reserved</h1>
        </div>
    </div>
  )
}

export default Copyright