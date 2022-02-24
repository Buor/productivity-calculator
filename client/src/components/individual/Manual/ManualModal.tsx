import React from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";

interface IProps {
    onClose: Function
    isModalOpen: boolean
}

export const ManualModal: React.FC<IProps> = ({isModalOpen, onClose}) => {
    return <Modal isOpen={isModalOpen} onClose={() => onClose()}>
        <ModalOverlay/>
        <ModalContent bg={'custom.medium'} color={'white'} maxW={600} minW={300}>
            <ModalHeader>Manual</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
                Currently empty. Will be written when all base functionality implemented
            </ModalBody>

            <ModalFooter>
                <Button colorScheme="yellow" mr={3} onClick={() => onClose()}>
                    Close
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
}