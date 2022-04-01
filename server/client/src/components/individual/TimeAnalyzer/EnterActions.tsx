import React from 'react'
import {Box, Button} from '@chakra-ui/react';
import {NumeratedTextarea} from '../../ui/NumeratedTextarea';
import {Title} from '../../ui/Title';

interface IProps {
    actionsText: string
    setActionsText: Function,
    handleAnalyzeButtonClick: Function,
    error: Error | null
}

export const EnterActions: React.FC<IProps> = ({setActionsText, actionsText, handleAnalyzeButtonClick, error}) => {
    return (
        <Box d={'flex'} flexDirection={'column'}>
            <Title>Enter your actions!</Title>
            <Box mt={4} d={'flex'} justifyContent={'center'}>
                <NumeratedTextarea textareaValue={actionsText} setTextareaValue={setActionsText}
                                   placeholder={'Enter your actions here'}/>
            </Box>
            {error &&
                <Box
                    w={'fit-content'}
                    mt={4}
                    p={2}
                    alignSelf={'center'}
                    textAlign={'center'}
                    color={'white'}
                    bg={'red.800'}
                    borderRadius={4}
                >
                    {error.message}
                </Box>
            }
            <Button
                mt={4}
                alignSelf={'center'}
                variant={'yellow'}

                onClick={() => handleAnalyzeButtonClick()}
            >
                Analyze
            </Button>
        </Box>
    )
}