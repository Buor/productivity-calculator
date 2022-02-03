import React from 'react'
import {Box, useStyleConfig} from '@chakra-ui/react';

export const Card: React.FC<any> = (props) => {
    const { variant, children, ...rest } = props
    const styles = useStyleConfig('Card', { variant })
    return <Box __css={styles} {...rest} >{children}</Box>
}
