import React, {useState} from 'react'
import {EnterActions} from './EnterActions';
import {AnalyzeResult} from '../../reusable/AnalyzeResult/AnalyzeResult';
import {CalendarDal} from "../../../core/dal/calendarDal";
import {IDateResult} from "../../../../../commonTypes/timeAnalyzerTypes";
import {restoreActionsDates} from "../../../core/utils/timeUtils";
import {SuccessAnalysis} from "./SuccessAnalysis";
import {useAppSelector} from "../../../hooks/redux";

interface IProps {

}

export const TimeAnalyzer: React.FC<IProps> = () => {

    const {actionsText} = useAppSelector(state => state.timeAnalyzer)

    const [analyzeResult, setAnalyzeResult] = useState<IDateResult | null | string>(null)
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
    const [isReplace, setIsReplace] = useState(false)

    const reset = () => setAnalyzeResult(null)

    const analyze = async () => {
        let analyzeResult: IDateResult | null | string
        try {
            if (!isManyDays) {
                const response = await CalendarDal.addDate({actionsText, isReplace})
                analyzeResult = response.data as IDateResult
                analyzeResult.actions = restoreActionsDates(analyzeResult.actions)
            } else {
                const response = await CalendarDal.addDates({actionsText, isReplace})
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
                                    handleAnalyzeButtonClick={analyze}
                                    error={enterActionsError}

                                    isManyDays={isManyDays}
                                    setIsManyDays={setIsManyDays}

                                    isReplace={isReplace}
                                    setIsReplace={setIsReplace}/>
                    : typeof (analyzeResult) === 'string'
                        ? <SuccessAnalysis analyzeResult={analyzeResult} reset={reset}/>
                        : <AnalyzeResult analyzeResult={analyzeResult}/>
            }
        </>
    )
}