import React from 'react'
import {Box, BoxProps, useStyleConfig} from '@chakra-ui/react';
import {motion} from 'framer-motion';

const MotionBox = motion<BoxProps>(Box)

export const Card: React.FC<any> = (props) => {
    const { variant, children, ...rest } = props
    const styles = useStyleConfig('Card', { variant })
    return <MotionBox __css={styles} {...rest} >{children}</MotionBox>
}
