import React from "react";
import {Box} from "@chakra-ui/react";

interface IProps {
    onClick: Function
}

export const ManualButtonOpen: React.FC<IProps> = ({onClick}) => {
    return <Box userSelect={'none'}
                minW={50}
                minH={50}
                bg={'custom.medium'} _focus={{border: 0}}
                cursor='pointer'
                position='fixed'
                right='0'
                bottom='0'
                textAlign='center'
                borderTopLeftRadius={10}
                _hover={{bg: 'custom.mediumDark'}}
                onClick={() => onClick()}
    >
        <Box d='flex' justifyContent='center' alignItems='center' w='100%' h='50px' fontSize={34}
             transform='rotate(315deg)' color='yellow.500'>?</Box>
    </Box>
}