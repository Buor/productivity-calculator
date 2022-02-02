import React, {useState} from 'react'
import {EnterActions} from './EnterActions';
import {analyzeTime, IAnalyzeResult} from '../../../core/timeAnalyzer';
import {AnalyzeResult} from './AnalyzeResult/AnalyzeResult';

interface IProps {

}

export const TimeAnalyzer: React.FC<IProps> = () => {

    const [actionsText, setActionsText] = useState('')
    const [analyzeResult, setAnalyzeResult] = useState<IAnalyzeResult | null>(null)

    const analyze = () => {
        const analyzeResult = analyzeTime(actionsText)
        setAnalyzeResult(analyzeResult)
    }

    return (
        <>
            {
                analyzeResult === null
                    ? <EnterActions actionsText={actionsText}
                                    setActionsText={setActionsText}
                                    handleAnalyzeButtonClick={analyze}/>
                    : <AnalyzeResult analyzeResult={analyzeResult}/>
            }
        </>
    )
}