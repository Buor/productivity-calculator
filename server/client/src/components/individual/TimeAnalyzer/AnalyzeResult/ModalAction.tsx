import React, {useState} from 'react'
import {Box, Td, Tr} from "@chakra-ui/react";
import {IAction} from "../../../../../../server/commonTypes/timeAnalyzerTypes";

interface IProps {
    action: IAction
}

export const ModalAction: React.FC<IProps> = ({action}) => {

    const [descriptionOpened, setDescriptionOpened] = useState(false)

    return <Tr cursor={'pointer'}
               userSelect={'none'}
               _hover={{backgroundColor: 'custom.dark'}}
               onClick={() => setDescriptionOpened(!descriptionOpened)}
    >
        <Td minWidth={131}>{action.startTime.getHours() + ':' + ('0' + action.startTime.getMinutes()).slice(-2) + '-' + action.endTime.getHours() + ':' + ('0' + action.endTime.getMinutes()).slice(-2)}</Td>
        <Td>{action.name}
            {
                descriptionOpened
                    ? <Box mt={4} fontStyle={'italic'}>
                        {action.description !== '' ? action.description : `\n\nОписание действия отсутствует`}
                    </Box>
                    : ''
            }
        </Td>
        <Td>{action.type.toUpperCase()}</Td>
    </Tr>
}

