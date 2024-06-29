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
