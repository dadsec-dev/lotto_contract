import React from 'react'
import exclamation from '../../assets/exclaim.png'
import Image from "next/image";


const Info = () => {
  return (
    <div className='flex justify-between px-20 h-[77px] bg-[#000000]'>
    <div className='text-[20px] text-[#FFFFFF] mt-4'> 0x7423d...1c4n just won 0.05Eth</div>
    <div className='flex text-[20px] text-[#FFFFFF] mt-4 space-x-12'>
        <h1>SuperBowl Fund: 2.01 Eth</h1>
        <h1>Total Players Active: 29000</h1>
        <Image src={exclamation} alt='exlaim' width='3' className="h-6"/>
    </div>
    </div>
  )
}

export default Info