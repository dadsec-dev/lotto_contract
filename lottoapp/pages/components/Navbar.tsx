import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import logo from '../../assets/Ellipse6.png';
import Image from 'next/image';


const Navbar = () => {
  return (
    <div className='text-[#FFFFFF] flex justify-between mx-28 mt-4'>
        <div className='flex space-x-6 items-center'>
            <Image src={logo} alt='logo' className='mr-10' />
            <h1 className='font-bold text-[25px]'>Lottery</h1>
            <h1 className='text-[18px]'>Superbowl</h1>
            <h1 className='text-[18px]'>Schedule</h1>
            <h1 className='text-[18px]'>Results</h1>
        </div>
        <div className='flex space-x-4 items-center'>
            <h1>Eng</h1>
            <div className=" h-10 w-px bg-[#FFFFFF]"></div>
            <ConnectButton />
        </div>
    </div>
  )
}

export default Navbar