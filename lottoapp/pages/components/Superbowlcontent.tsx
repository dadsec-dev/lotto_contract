import React from "react";
import lotteryimage from "../../assets/image7.png";
import Image from "next/image";
import { FaCalendarDays } from "react-icons/fa6";
import { BsTagsFill } from "react-icons/bs";
import { BsFillPeopleFill } from "react-icons/bs";
import Card from "./Card";
import Modalpop from "./Modal";
import { useDisclosure } from "@chakra-ui/react";
import lotterystr from '../../assets/strectchlottery.png'




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
      <div className="mx-28 bg-[#000000] h-[50vh] mt-10">
            <div className="h-[60%]">
                <Image src={lotterystr} alt="lot" className="fit"/>
            </div>
            <div className="text-[#ffffff] my-12 mx-12">
                <h1>Lorem ipsum iyhmso soihmmsj ksifpls</h1>
                <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                        <div className="flex space-x-3">
                        <FaCalendarDays className="text-[#611616]" />
                        <h1>0d : 04hr : 20m : 20sec</h1>
                        </div>
                        
                        <div className="flex space-x-3">
                        <BsTagsFill className="text-[#611616]" />
                        <h1>0.001 ETH</h1>
                        </div>

                        <div className="flex space-x-3">
                        <BsFillPeopleFill className="text-[#611616]" />
                        <h1>200 participants</h1>
                        </div>
                    </div>
                    <button className="text-[#FFFFFF] w-32 h-12 bg-[#D43791] rounded-lg" onClick={onOpen}>
                Draw
              </button>
                </div>
            </div>
      </div>
      <div  className="grid grid-cols-3 gap-6 mx-28 mt-2 ">
      {mockdata.map((item, num) => (
        <Card key={num} day={item.daysleft} amount={item.amount} participant={item.participants} />      
        ))}
    </div>
    <Modalpop isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default Content;
