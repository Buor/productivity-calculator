import React, {useState} from 'react'
import {Box, Td, Tr} from "@chakra-ui/react";
import {IAction} from "../../../../../../commonTypes/timeAnalyzerTypes";
import {getActionTimeInterval} from "../../../../core/utils/timeUtils";

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
        <Td minWidth={131}>{getActionTimeInterval(action)}</Td>
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

