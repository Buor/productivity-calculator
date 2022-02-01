import React, {useMemo} from 'react'
import {Box, Textarea} from '@chakra-ui/react';

interface IProps {
    initialWidth?: string
    placeholder?: string
    textareaValue: string
    setTextareaValue: Function
}

export const NumeratedTextarea: React.FC<IProps> = ({placeholder = '', initialWidth = '700px', textareaValue, setTextareaValue}) => {

    const numberElements = useMemo(() => {
        const countLines = textareaValue
            .split('')
            .reduce((acc, ch) => ch === '\n' ? acc + 1 : acc, 0) + 1

        return Array(countLines).fill(null).map((_, i) => <Box key={i} textAlign={'right'}>{i + 1}</Box>)
    }, [textareaValue])

    return (
        <Box d={'flex'} flex={`0 1 ${initialWidth}`} justifyContent={'space-between'}
             fontFamily={'Consolas, sans-serif'}
             borderRadius={'10px'}
             p={4}
             backgroundColor={'custom.medium'}
        >
            <Box flex={'0 1 1%'}
                 borderRight={'1px solid'} borderRightColor={'custom.dark'} pr={3}
            >
                {numberElements}
            </Box>
            <Textarea h={'auto'} minH={'100px'}
                      lineHeight={1.5}
                      resize={'none'}
                      p={0} pl={2}
                      border={0}
                      placeholder={placeholder}
                      onChange={e => setTextareaValue(e.target.value)}
                      _focus={{border: '0'}} value={textareaValue}
            />
        </Box>
    )
}