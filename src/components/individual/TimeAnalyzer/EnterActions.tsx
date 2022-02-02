import React from 'react'
import {Box, Button, Text} from '@chakra-ui/react';
import {NumeratedTextarea} from '../../ui/NumeratedTextarea';

interface IProps {
    actionsText: string
    setActionsText: Function,
    handleAnalyzeButtonClick: Function,
    error: Error | null
}

export const EnterActions: React.FC<IProps> = ({setActionsText, actionsText, handleAnalyzeButtonClick, error}) => {
    return (
        <Box d={'flex'} flexDirection={'column'}>
            <Text textAlign={'center'} as={'h2'} fontSize={36}>Enter your actions!</Text>
            <Box mt={4} d={'flex'} justifyContent={'center'}>
                <NumeratedTextarea textareaValue={actionsText} setTextareaValue={setActionsText}
                                   placeholder={'Enter your actions here'}/>
            </Box>
            {error && <Box mt={4} textAlign={'center'} color={'white'} bg={'red.800'} p={2} w={'fit-content'} alignSelf={'center'} borderRadius={4}>{error.message}</Box>}
            <Button mt={4} alignSelf={'center'} colorScheme={'yellow'}
                    onClick={() => handleAnalyzeButtonClick()}>Analyze</Button>
        </Box>
    )
}