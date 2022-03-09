import React, {useState} from 'react'
import {EnterActions} from './EnterActions';
import {analyzeTime} from '../../../core/timeAnalyzer';
import {AnalyzeResult} from './AnalyzeResult/AnalyzeResult';
import {CalendarDal} from "../../../core/dal/calendarDal";
import {IAnalyzeResult} from "../../../../../server/commonTypes/timeAnalyzerTypes";

interface IProps {

}

export const TimeAnalyzer: React.FC<IProps> = () => {
    const [actionsText, setActionsText] = useState(``)
    const [analyzeResult, setAnalyzeResult] = useState<IAnalyzeResult | null>(null)
    // todo delete (mock data for test purposes)
    // const [analyzeResult, setAnalyzeResult] = useState<IAnalyzeResult | null>({
    //     productivity: 5,
    //     actionsPercentage: [
    //         {name: 'Positive actions', percentage: 44, color: 'green.500'},
    //         {name: 'Neutral actions', percentage: 22, color: 'yellow.500'},
    //         {name: 'Negative actions', percentage: 34, color: 'red.500'},
    //     ],
    //     actions: []
    // })
    const [enterActionsError, setEnterActionsError] = useState<Error | null>(null)

    const analyze = () => {
        try {
            const analyzeResult = analyzeTime(actionsText)
            setAnalyzeResult(analyzeResult)
            setEnterActionsError(null)
            CalendarDal.sendDateInfo(analyzeResult)
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