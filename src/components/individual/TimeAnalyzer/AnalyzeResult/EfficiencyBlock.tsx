import React from 'react'
import {IActionPercentage} from '../../../../core/timeAnalyzer';
import {Box} from '@chakra-ui/react';
import {Card} from '../../../ui/Card';

interface IProps {
    actionsPercentage: IActionPercentage[]
}

export const EfficiencyBlock: React.FC<IProps> = ({actionsPercentage}) => {

    return (
        <Box d={'flex'} justifyContent={'space-evenly'}
             flexWrap={'wrap'} mt={4}>

            {actionsPercentage.map(percentage =>
                <Card key={percentage.name}
                      flex={['0 1 80%', '0 1 25%']}
                      mt={[4, null, 0]}
                      _hover={{
                          cursor: 'pointer',
                          bg: 'custom.mediumDark'
                      }}
                >
                    <Box color={'white'} as={'h3'} fontSize={24} textAlign={'center'}
                         w={['auto', '150px']}>{percentage.name}</Box>
                    <Box color={percentage.color || 'white'} mt={4} fontSize={24}>{percentage.percentage + '%'}</Box>
                </Card>)}

        </Box>
    )
}