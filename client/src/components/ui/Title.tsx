import React from 'react'
import {Text} from '@chakra-ui/react';

interface IProps {

}

export const Title: React.FC<IProps> = ({children}) => {
    return (
        <Text textAlign={'center'} as={'h2'} fontSize={36}>{children}</Text>
    )
}