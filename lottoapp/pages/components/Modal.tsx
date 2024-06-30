import React, { useState } from 'react'
import { Button, useDisclosure, Modal, ModalOverlay, ModalContent,ModalHeader,ModalCloseButton,ModalBody, FormControl, FormLabel, Input, ModalFooter  } from '@chakra-ui/react'
import { useWriteContract } from 'wagmi';
import {abi} from '../../api/abi.js';
import {lottoaddress} from '../../api/address';
import { parseEther } from 'viem' 



interface ModalpopProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modalpop: React.FC<ModalpopProps> = ({ isOpen, onClose })  => {
    const { writeContract } = useWriteContract()
    const [numberinput, setNumberinput] = useState(0);
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const handlebuyticket = (e : any) =>{
        e.preventDefault();
        writeContract({ 
          abi,
          address: lottoaddress,
          functionName: 'buyTicket',
          args: [numberinput],
          value: parseEther('0.001'),
       })
        console.log('clicked')
    }

    const handleChange = (event : any) => {
        setNumberinput(event.target.value);
    };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent pb={15} mt={220} bg="#110E0E" color="#FFFFFF" px={5}>
          <ModalCloseButton mt={15} />
          <ModalBody pb={6} mt={20}>
            <FormControl>
              <FormLabel>Select your number</FormLabel>
              <Input ref={initialRef} placeholder='Input your desired number' onChange={handleChange}/>
            </FormControl>
            <h1 className=' text-[12px] mt-2'>The number is available</h1>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button colorScheme='pink' width={150} onClick={handlebuyticket} >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Modalpop