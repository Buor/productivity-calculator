import React, {useState} from 'react'
import {EnterActions} from './EnterActions';
import {AnalyzeResult} from './AnalyzeResult/AnalyzeResult';
import {CalendarDal} from "../../../core/dal/calendarDal";
import {IAnalyzeResult} from "../../../../../commonTypes/timeAnalyzerTypes";
import {restoreActionsDates} from "../../../core/utils/timeUtils";
import {SuccessAnalysis} from "./SuccessAnalysis";

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
    const [isManyDays, setIsManyDays] = useState(false)

    const reset = () => setAnalyzeResult(null)

    const analyze = async () => {
        let analyzeResult: IAnalyzeResult | null | string
        try {
            if (!isManyDays) {
                const response = await CalendarDal.addDate(actionsText)
                analyzeResult = response.data as IAnalyzeResult
                analyzeResult.actions = restoreActionsDates(analyzeResult.actions)
            } else {
                const response = await CalendarDal.addDates(actionsText)
                if (response.data === true)
                    analyzeResult = `Actions has been successfully parsed!`
                else
                    analyzeResult = `Unexpected error occurred!`
            }
            setAnalyzeResult(analyzeResult)
        } catch (e: any) {
            setEnterActionsError(e.response.data as Error)
        }
    }

    return (
        <>
            {
                analyzeResult === null
                    ? <EnterActions actionsText={actionsText}
                                    setActionsText={setActionsText}
                                    handleAnalyzeButtonClick={analyze}
                                    error={enterActionsError}
                                    isManyDays={isManyDays}
                                    setIsManyDays={setIsManyDays}/>
                    : typeof (analyzeResult) === 'string'
                        ? <SuccessAnalysis analyzeResult={analyzeResult} reset={reset}/>
                        : <AnalyzeResult analyzeResult={analyzeResult}/>
            }
        </>
    )
}