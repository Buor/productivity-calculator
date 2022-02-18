import React from 'react'
import {Box} from '@chakra-ui/react';

interface IProps {

}

export const Main: React.FC<IProps> = () => {
    return (
        <Box display={'flex'} flexDirection={'column'} mt={8} w={'100%'} m={'20px auto 0'}>
            <Box as={'h1'} textAlign={'center'} fontSize={36} >
                Welcome!
            </Box>
            <Box fontSize={18} textAlign={'center'}>This is the main page of productivity-calculator application.</Box>
        </Box>
    )
}