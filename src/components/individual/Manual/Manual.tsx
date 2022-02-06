import { Box } from '@chakra-ui/react';
import React from 'react';

interface IProps {

}

export const Manual: React.FC<IProps> = () => {
    return <Box minW={50} minH={50} bg={'custom.medium'} _hover={{bg: 'custom.mediumDark'}} cursor='pointer' position='fixed' right='0' bottom='0' textAlign='center'  borderTopLeftRadius={10}>
        <Box d='flex' justifyContent='center' alignItems='center' w='100%' h='50px' fontSize={34} transform='rotate(315deg)' color='yellow.500'>?</Box>
    </Box>
}
