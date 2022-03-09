import React from 'react'
import {Box} from '@chakra-ui/react';
import {EfficiencyBlock} from './EfficiencyBlock';
import {AdvicesBlock} from './AdvicesBlock';
import {ProductivityBlock} from './ProductivityBlock';
import {IAnalyzeResult} from "../../../../../../server/commonTypes/timeAnalyzerTypes";

interface IProps {
    analyzeResult: IAnalyzeResult
}

export const AnalyzeResult: React.FC<IProps> = ({analyzeResult}) => {
    return (
        <Box>
            <EfficiencyBlock actionsPercentages={analyzeResult.actionsPercentages} actions={analyzeResult.actions}/>
            <AdvicesBlock advices={analyzeResult.advices}/>
            <ProductivityBlock productivity={analyzeResult.productivity}/>
        </Box>
    )
}