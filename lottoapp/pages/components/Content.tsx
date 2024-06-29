import React from "react";
import lotteryimage from "../../assets/image7.png";
import Image from "next/image";
import { FaCalendarDays } from "react-icons/fa6";
import { BsTagsFill } from "react-icons/bs";
import { BsFillPeopleFill } from "react-icons/bs";
import Card from "./Card";
import Modalpop from "./Modal";
import { useDisclosure } from "@chakra-ui/react";




const Content = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()


const mockdata = [
    {
        daysleft : "0d : 04hr : 20m : 20sec",
        amount : "0.01",
        participants : "30",
    },
    {
        daysleft : "4d : 04hr : 20m : 20sec",
        amount : "0.04",
        participants : "56",
    },
    {
        daysleft : "2d : 04hr : 20m : 20sec",
        amount : "0.02",
        participants : "102",
    },
]

  return (
    <div>
      <div className="text-[#FFFFFF] mx-28 mt-10">
        Lorem ipsum dolor sit amet consectetur. Purus faucibus nulla id mi.. Vel
        volutpat pellentesque aliquam faucibus nunc venenatis commodo commodo
        pulvinar. Vel volutpat pellentesque aliquam faucibus nunc venenatis
        commodo commodo pulvinar Vel volutpat pellentesque aliquam faucibus nunc
        venenatis commodo commodo pulvinar.
      </div>
      <div className="mx-28 mt-8 text-[#FFFFFF] bg-[#000000] h-[60vh]">
        <Image src={lotteryimage} alt="lotteryimage" className="mx-auto" />
        <div className="mx-6 mt-3 space-y-2">
          <h1 className="font-bold">Lorem ipsum iyhmso soihmmsj ksifpls</h1>
          <div className="flex space-x-4 items-center">
            <FaCalendarDays className="text-[#611616]" />
            <h1>0d : 04hr : 20m : 20sec</h1>
          </div>
          <div className="flex space-x-4 items-center">
            <BsTagsFill className="text-[#611616]" />
            <div className="flex space-x-64 items-center">
              <h1>0.01Eth</h1>
              <button className="text-[#FFFFFF] w-32 h-12 bg-[#D43791] rounded-lg" onClick={onOpen}>
                Draw
              </button>
            </div>
          </div>
          <div className="flex space-x-4 items-center">
            <BsFillPeopleFill className="text-[#611616]" />
            <h1>56 Participants</h1>
          </div>
        </div>
      </div>
      <div  className="flex mx-28 space-x-6 mt-8">
      {mockdata.map((item, num) => (
        <Card key={num} day={item.daysleft} amount={item.amount} participant={item.participants} />      
        ))}
    </div>
    <Modalpop isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default Content;
