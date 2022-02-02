import React, {useState} from 'react'
import {EnterActions} from './EnterActions';
import {analyzeTime, IAnalyzeResult} from '../../../core/timeAnalyzer';
import {AnalyzeResult} from './AnalyzeResult/AnalyzeResult';

interface IProps {

}

export const TimeAnalyzer: React.FC<IProps> = () => {

    const [actionsText, setActionsText] = useState('')
    const [analyzeResult, setAnalyzeResult] = useState<IAnalyzeResult | null>(null)
    const [enterActionsError, setEnterActionsError] = useState<Error | null>(null)

    const analyze = () => {
        try {
            const analyzeResult = analyzeTime(actionsText)
            setAnalyzeResult(analyzeResult)
            setEnterActionsError(null)
        } catch (e) {
            console.error(e)
            setEnterActionsError(e as Error)
        }
    }

    return (
        <>
            {
                analyzeResult === null
                    ? <EnterActions actionsText={actionsText}
                                    setActionsText={setActionsText}
                                    handleAnalyzeButtonClick={analyze}
                                    error={enterActionsError}/>
                    : <AnalyzeResult analyzeResult={analyzeResult}/>
            }
        </>
    )
}