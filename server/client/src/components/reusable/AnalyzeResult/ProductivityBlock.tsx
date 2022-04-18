import React from 'react'
import {Text} from '@chakra-ui/react';
import {Card} from "../../ui/Card";
import {IProductivity} from "../../../../../commonTypes/timeAnalyzerTypes";

interface IProps {
    productivity: IProductivity
}

export const ProductivityBlock: React.FC<IProps> = ({productivity}) => {
    return (
        <Card maxWidth={500}
              mx={'auto'}
              mt={8}
              boxShadow={'2px 2px 10px 2px rgba(0.5,0.5,0.5,0.5)'}
              opacity={0}
              animate={{opacity: 100}}
              transition={{delay: .1, duration: 7}}
        >
            <Text textAlign={'center'}>Your productivity value today:</Text>
            <Text fontSize={24} color={productivity.color}>{productivity.value}</Text>
            <Text color={productivity.color}>{productivity.comment}</Text>
        </Card>
    )
}