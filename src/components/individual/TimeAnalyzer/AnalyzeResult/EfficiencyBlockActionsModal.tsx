import React from 'react'
import {IAction} from '../../../../core/timeAnalyzer';
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Table,
    TableCaption,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from '@chakra-ui/react';
import {convertMs} from '../../../../core/utils/timeUtils';

interface IProps {
    actions: IAction[]
    close: Function
    actionsType: string
}

export const EfficiencyBlockActionsModal: React.FC<IProps> = ({actions, close, actionsType}) => {

    let counter = 1

    const actionsToShow = actions.sort((a, b) => b.durationMs - a.durationMs)

    return (
        <Modal isOpen={true} onClose={() => close()}>
            <ModalOverlay/>
            <ModalContent bg={'custom.medium'} color={'white'} maxW={600} minW={300}>
                <ModalHeader>{actionsType}</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>

                    {
                        actions.length
                            ? <Table>
                                <TableCaption>{actionsType} and their percentage</TableCaption>
                                <Thead>
                                    <Tr>
                                        <Th>Number</Th>
                                        <Th>Action name</Th>
                                        <Th>Spent time</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {actionsToShow.map(action => <Tr key={action.endTime.toString()}>
                                        <Td>{counter++}</Td>
                                        <Td>{action.name}</Td>
                                        <Td>{convertMs(action.durationMs, 'mh')}</Td>
                                    </Tr>)}
                                </Tbody>
                            </Table>
                            : `There are no ${actionsType}!` + (actionsType === 'Negative actions' ? ' Great job!' : '')
                    }


                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="yellow" mr={3} onClick={() => close()}>
                        Close
                    </Button>
                    {/*<Button variant="ghost">Secondary Action</Button>*/}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}