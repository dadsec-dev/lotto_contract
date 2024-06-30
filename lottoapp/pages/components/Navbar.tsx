import React, { useEffect, useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import logo from '../../assets/Ellipse6.png';
import Image from 'next/image';
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useAccount } from 'wagmi'
import avatar from '../../assets/avatar.png'
import Link from 'next/link';




const Navbar = () => {
    const {address} = useAccount();
    const [connectionstat, setConnectionstat] = useState(false)

    
    useEffect(() => {
        if(address){
            setConnectionstat(true)
        }else {
            setConnectionstat(false)
        }
    }, [address])
    
  return (
    <div className='text-[#FFFFFF] flex justify-between mx-28 mt-4'>
        <div className='flex space-x-6 items-center'>
            <Image src={logo} alt='logo' className='mr-10' />
            <Link href='/'>
                <h1 className='font-bold text-[25px] cursor-pointer'>Lottery</h1>
            </Link>
            <Link href='/superbowl'>
            <h1 className='text-[18px] cursor-pointer'>Superbowl</h1>
            </Link>
            <h1 className='text-[18px] cursor-pointer'>Schedule</h1>
        </div>
        <div className='flex space-x-4 items-center'>
            {connectionstat && <IoMdNotificationsOutline className='text-2xl' />}
            <div className='flex space-x-3 items-center'>
            <h1>Eng</h1>
            <RiArrowDropDownLine className='text-2xl' />
            </div>
            <div className=" h-20 w-px bg-[#FFFFFF]"></div>
            {connectionstat && <Image src={avatar} alt='avatar' />}
            <div className='items-center space-y-2'>
            <ConnectButton chainStatus="none" showBalance={{ smallScreen: false, largeScreen: false }}/>
            {connectionstat &&  <h1 className='text-[#FFFFFF] text-[18px] font-bold'>200 XP</h1>}
            </div>
        </div>
    </div>
  )
}

export default Navbar