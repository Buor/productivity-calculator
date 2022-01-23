import React from 'react'
import {Box, Button, Text} from '@chakra-ui/react'
import {NumeratedTextarea} from '../../ui/NumeratedTextarea';

interface IProps {
    
}

export const TimeAnalyzer: React.FC<IProps> = () => {
    return (
        <Box d={'flex'} flexDirection={'column'}>
            <Text textAlign={'center'} as={'h2'} fontSize={36}>Enter your actions!</Text>
            <Box mt={4} d={'flex'} justifyContent={'center'}>
                <NumeratedTextarea placeholder={'Enter your actions here'}/>
            </Box>
            <Button mt={8} alignSelf={'center'} colorScheme={'yellow'}>Analyze</Button>
        </Box>
    )
}