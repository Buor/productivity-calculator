import React, {useState} from 'react'
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
    Select,
    Table,
    TableCaption,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr
} from '@chakra-ui/react';
import {convertMs} from '../../../../core/utils/timeUtils';
import {ModalAction} from "./ModalAction";

type TDisplayMode = 'Time sum' | 'All actions'

interface IProps {
    actions: IAction[]
    close: Function
    actionsType: string
}

export const EfficiencyBlockActionsModal: React.FC<IProps> = ({actions, close, actionsType}) => {

    const [displayMode, setDisplayMode] = useState<TDisplayMode>('Time sum')

    let counter = 1

    const actionsToShow = displayMode === 'Time sum' ? actions.sort((a, b) => b.durationMs - a.durationMs) : actions.sort((a, b) => a.startTime.valueOf() - b.startTime.valueOf())

    return (
        <Modal isOpen={true} onClose={() => close()}>
            <ModalOverlay/>
            <ModalContent bg={'custom.medium'} color={'white'} maxW={800} minW={300}>
                <ModalHeader>{actionsType}</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Text pl={4} mb={2}>Select display mode:</Text>
                    <Select value={displayMode} onChange={e => setDisplayMode(e.target.value as TDisplayMode)}>
                        <option value="Time sum">Time sum</option>
                        <option value="All actions">All actions</option>
                    </Select>
                    {
                        actions.length
                            ?
                            displayMode === 'Time sum'
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
                                : <Table>
                                    <TableCaption>All {actionsType}</TableCaption>
                                    <Thead>
                                        <Tr>
                                            <Th>Timing</Th>
                                            <Th>Name</Th>
                                            <Th>Type</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {actionsToShow.map(action => <ModalAction action={action} key={action.endTime.valueOf()}/>)}
                                    </Tbody>
                                </Table>
                            : `There are no ${actionsType}!` + (actionsType === 'Negative actions' ? ' Great job!' : '')
                    }

                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="yellow" mr={3} onClick={() => close()}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}