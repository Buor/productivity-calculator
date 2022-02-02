import React from 'react'
import {Box, Button, Text} from '@chakra-ui/react';
import {NumeratedTextarea} from '../../ui/NumeratedTextarea';

interface IProps {
    actionsText: string
    setActionsText: Function,
    handleAnalyzeButtonClick: Function
}

export const EnterActions: React.FC<IProps> = ({setActionsText, actionsText, handleAnalyzeButtonClick}) => {
    return (
        <Box d={'flex'} flexDirection={'column'}>
            <Text textAlign={'center'} as={'h2'} fontSize={36}>Enter your actions!</Text>
            <Box mt={4} d={'flex'} justifyContent={'center'}>
                <NumeratedTextarea textareaValue={actionsText} setTextareaValue={setActionsText}
                                   placeholder={'Enter your actions here'}/>
            </Box>
            <Button mt={8} alignSelf={'center'} colorScheme={'yellow'}
                    onClick={() => handleAnalyzeButtonClick()}>Analyze</Button>
        </Box>
    )
}