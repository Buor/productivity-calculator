import React from "react";
import {Box, Button, Img, Text} from "@chakra-ui/react";
import imgDownArrow from '../../../assets/images/down-arrow.png'

interface IProps {
    month: string
    year: number
    rightButtonHandler: Function
    leftButtonHandler: Function
}

export const CalendarHead: React.FC<IProps> = ({month, year, leftButtonHandler, rightButtonHandler}) => {
    return <Box d={'flex'} w={'100%'} justifyContent={'center'}>
        <Button flex={'0 1 48px'}
                borderRadius={0} p={0}
                backgroundColor={'transparent'}

                _hover={{backgroundColor: 'custom.medium'}}
                _focus={{backgroundColor: 'transparent'}}

                onClick={() => leftButtonHandler()}
        >
            <Img src={imgDownArrow}
                 w={'75%'}
                 transform={'rotate(90deg)'}
                 filter={'invert(1)'}
            />
        </Button>
        <Text
            flex={'0 1 250px'}
            textAlign={'center'}
            fontSize={24}
            cursor={'pointer'}
            transition={'background-color 0.1s ease-in-out'}
            userSelect={'none'}

            _hover={{backgroundColor: 'custom.medium'}}>{month}, {year}</Text>
        <Button
            flex={'0 1 48px'}
            borderRadius={0}
            p={0}
            backgroundColor={'transparent'}

            _hover={{backgroundColor: 'custom.medium'}}
            _focus={{backgroundColor: 'transparent'}}

            onClick={() => rightButtonHandler()}
        >
            <Img src={imgDownArrow} w={'75%'} transform={'rotate(270deg)'} filter={'invert(1)'}/>
        </Button>
    </Box>
}