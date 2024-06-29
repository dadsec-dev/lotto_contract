import React from 'react'
import { Button, useDisclosure, Modal, ModalOverlay, ModalContent,ModalHeader,ModalCloseButton,ModalBody, FormControl, FormLabel, Input, ModalFooter  } from '@chakra-ui/react'

interface ModalpopProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modalpop: React.FC<ModalpopProps> = ({ isOpen, onClose })  => {
    // const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent pb={15} mt={300} bg="#110E0E" color="#FFFFFF" px={5}>
          <ModalCloseButton mt={15} />
          <ModalBody pb={6} mt={20}>
            <FormControl>
              <FormLabel>Select your number</FormLabel>
              <Input ref={initialRef} placeholder='Input your desired number' />
            </FormControl>
            <h1 className=' text-[12px] mt-2'>The number is available</h1>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button colorScheme='pink' width={150} >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Modalpop