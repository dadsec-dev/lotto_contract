import React from 'react'
import lotteryimage from '../../assets/image7.png'
import Image from 'next/image'
import { FaCalendarDays } from "react-icons/fa6";
import { BsTagsFill } from "react-icons/bs";
import { BsFillPeopleFill } from "react-icons/bs";
import { useDisclosure } from "@chakra-ui/react";
import Modalpop from './Modal';


const Card = (props : any) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div>
        <div className="mt-12 text-[#FFFFFF] bg-[#000000] h-[55vh]">
        <Image src={lotteryimage} alt="lotteryimage" className="mx-auto fit"  />
        <div className="mx-6 mt-3 space-y-2">
          <h1 className="font-bold">Lorem ipsum iyhmso soihmmsj ksifpls</h1>
          <div className="flex space-x-4 items-center">
            <FaCalendarDays className="text-[#611616]" />
            <h1>{props.day}</h1>
          </div>
          <div className="flex space-x-4 items-center">
            <BsTagsFill className="text-[#611616]" />
            <div className="flex space-x-28 items-center">
              <h1>{props.amount}ETH</h1>
              <button className="text-[#FFFFFF] w-32 h-12 bg-[#D43791] rounded-lg" onClick={onOpen}>
                Draw
              </button>
            </div>
          </div>
          <div className="flex space-x-4 items-center">
            <BsFillPeopleFill className="text-[#611616]" />
            <h1>{props.participant} participants</h1>
          </div>
        </div>
      </div>
      <Modalpop isOpen={isOpen} onClose={onClose} />

    </div>
  )
}

export default Card