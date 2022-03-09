import React, {useState} from 'react'
import {EnterActions} from './EnterActions';
import {analyzeTime} from '../../../core/timeAnalyzer';
import {AnalyzeResult} from './AnalyzeResult/AnalyzeResult';
import {CalendarDal} from "../../../core/dal/calendarDal";
import {IAnalyzeResult} from "../../../../../server/commonTypes/timeAnalyzerTypes";

interface IProps {

}

export const TimeAnalyzer: React.FC<IProps> = () => {
    const [actionsText, setActionsText] = useState(`13.00.2020
8:50-8:54) Смотреть видел по RambdaJS
9:05-9:15) Велотренажёр
-9:25) Пить зелёный чай с анисом
-9:41) Создать план по обучению Frontend
9:50-9:56) Добавить категорию Разума в TimePlanner
-10:10) Поесть
-10:55) Учить устройство интернета
11:00-11:35) Учить TCP IP, Сокеты, их устройство #П
-11:50) Смотреть видео Winderton'а
12:00-12:31) Заниматься спортом, слушать музыку
-13:05) Посмотреть видео про Svelte, найти roadmap по React.
-13:18) Смотреть видео про структуры данных
-13:25) Поесть
-13:28) Скачать 55 выпуск подкаста по js
-13:42) Собираться
14:38-14:40) Гулять и слушать подкаст
-14:50) Переодеваться
-15:05) Есть мандарины, разговаривать с мамой
15:20-16:09) Разговаривать с мамой, есть аладьи
-16:21) Переписываться с Евой и Матвеем
-18:00) Готовиться к партии ДнД
-18:40) Разговаривать с мамой об Одессе, поесть, размяться
-19:00) Готовиться к партии
-22:30) Играть в ДнД
-22:55) Ждать, перекусить`)
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