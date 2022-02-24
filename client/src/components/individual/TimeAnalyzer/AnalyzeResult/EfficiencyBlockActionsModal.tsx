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
type TOrder = 'Descending' | 'Ascending'

interface IProps {
    actions: IAction[]
    close: Function
    actionsType: string
}

function compareActionsWithOrder(order: TOrder) {
    if (order === "Ascending") return function (a: IAction, b: IAction) {
        return a.durationMs - b.durationMs
    }
    return function (a: IAction, b: IAction) {
        return b.durationMs - a.durationMs
    }
}

export const EfficiencyBlockActionsModal: React.FC<IProps> = ({actions, close, actionsType}) => {

    const [displayMode, setDisplayMode] = useState<TDisplayMode>('Time sum')
    const [order, setOrder] = useState<TOrder>('Descending')

    let counter = 1

    const actionsToShow = (() => {
        if (displayMode === 'Time sum')
            return actions.sort(compareActionsWithOrder(order))
        else
            return actions.sort((a, b) => a.startTime.valueOf() - b.startTime.valueOf())
    })()

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
                        displayMode === 'Time sum' && <>
                            <Text pl={4} mb={2} mt={4}>Select order:</Text>
                            <Select value={order} onChange={e => setOrder(e.target.value as TOrder)}>
                                <option value="Ascending">Ascending</option>
                                <option value="Descending">Descending</option>
                            </Select>
                        </>
                    }
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
                                        {actionsToShow.map(action => <ModalAction action={action}
                                                                                  key={action.endTime.valueOf()}/>)}
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