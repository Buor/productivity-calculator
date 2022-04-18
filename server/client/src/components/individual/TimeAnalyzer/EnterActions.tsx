import React from 'react'
import {Box, Button, Checkbox} from '@chakra-ui/react';
import {NumeratedTextarea} from '../../ui/NumeratedTextarea';
import {Title} from '../../ui/Title';
import {useAppDispatch} from "../../../hooks/redux";
import {changeAnalyzeText} from "../../../store/reducers/timeAnalyzerReducer";

interface IProps {
    actionsText: string
    handleAnalyzeButtonClick: Function,
    error: Error | null,
    isManyDays: boolean,
    setIsManyDays: any
}

export const EnterActions: React.FC<IProps> = ({actionsText, handleAnalyzeButtonClick, error, isManyDays, setIsManyDays}) => {

    const dispatch = useAppDispatch()

    return (
        <Box d={'flex'} flexDirection={'column'} alignItems={'center'}>
            <Title>Enter your actions!</Title>
            <Box mt={4} d={'flex'} justifyContent={'center'} alignSelf={'stretch'}>
                <NumeratedTextarea textareaValue={actionsText} setTextareaValue={(value: string) => dispatch(changeAnalyzeText(value))}
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
            <Checkbox
                mt={4}
                defaultChecked={isManyDays}
                colorScheme={'yellow'}
                onChange={() => setIsManyDays((prev: boolean) => !prev)}
            >
                Add a few days
            </Checkbox>
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