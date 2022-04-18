import React from 'react'
import {Box} from '@chakra-ui/react';
import {Card} from '../../ui/Card';
import {IAdvice} from "../../../../../commonTypes/timeAnalyzerTypes";

interface IProps {
    advices: IAdvice[]
}

export const AdvicesBlock: React.FC<IProps> = ({advices}) => {

    return (
        <Card
            mt={8}
            alignItems={'flexStart'}
            maxW={500}
            mx={['15px', 'auto']}
            opacity={0}
            animate={{opacity: 100}}
            transition={{delay: .1, duration: 7}}
        >
            {advices.map((advice, i) =>
                <Box
                    key={advice.text}

                    d={'flex'}
                    mt={i !== 0 ? 4 : 0}
                >
                    <Box flex={'0 0 20px'}
                         textAlign={'center'}
                         color={advice.mark === 'positive' ? 'green.500' : advice.mark === 'neutral' ? 'yellow.500' : 'red.500'}
                    >
                        {advice.mark === 'positive' ? '✓' : advice.mark === 'neutral' ? '*' : '!'}
                    </Box>
                    <Box flexGrow={1}>{advice.text}</Box>
                </Box>)}
        </Card>
    )
}