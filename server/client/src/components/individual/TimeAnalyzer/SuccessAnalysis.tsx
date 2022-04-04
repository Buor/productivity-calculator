import React from "react";
import {Box, Button} from "@chakra-ui/react";

interface IProps {
    reset: () => void
    analyzeResult: string
}

export const SuccessAnalysis: React.FC<IProps> = ({reset, analyzeResult}) => {
    return <Box
        d={'flex'}
        alignItems={'center'}
        flexDirection={'column'}
        h={'100vh'}
        justifyContent={'center'}
    >
        <Box>{analyzeResult}</Box>
        <Button
            colorScheme={'green'}
            onClick={reset}
        >
            Analyze more
        </Button>
    </Box>
}