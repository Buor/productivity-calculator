import React, {createContext, useContext, useEffect, useState} from "react";
import {Box, Text} from "@chakra-ui/react";
import {Calendar} from "../individual/Calendar/Calendar";
import {YearCalendar} from "../individual/Calendar/YearCalendar";
import {CalendarDal} from "../../core/dal/calendarDal";
import {IDateData, IMonthDTO} from "../../../../commonTypes/dtos";
import {IDateResult} from "../../../../commonTypes/timeAnalyzerTypes";
import {AnalyzeResult} from "../reusable/AnalyzeResult/AnalyzeResult";
import {NoData} from "../individual/Calendar/NoData";

export interface ICalendarContext {
    selectedDate: IDateData | null
    setSelectedDate: Function
    selectedMonth: Date
    setSelectedMonth: Function
    dateResult: IDateResult | null | 'non selected',
    setDateResult: Function
}

export const CalendarContext = createContext<ICalendarContext>({
    selectedDate: null,
    setSelectedDate: () => {
    },

    selectedMonth: new Date(),
    setSelectedMonth: () => {
    },

    dateResult: null,
    setDateResult: () => {
    }
})

export const useCalendarContext = () => useContext(CalendarContext)

export const CalendarPage: React.FC = () => {

    const [selectedDate, setSelectedDate] = useState<IDateData | null>(null)
    const [selectedMonth, setSelectedMonth] = useState<Date>(new Date())
    const [dateResult, setDateResult] = useState<IDateResult | null | 'non selected'>('non selected')

    const [calendarType, setCalendarType] = useState<'month' | 'year'>('month')
    const [monthData, setMonthData] = useState<IMonthDTO | null>(null)

    useEffect(() => {
        getDates()
    }, [selectedMonth])

    const getDates = async () => {
        const response = await CalendarDal.getMonth(selectedMonth)
        setMonthData(response.data)
        console.log(response.data)
    }

    if (!monthData) return null

    return <CalendarContext.Provider value={{
        selectedDate,
        setSelectedDate,

        selectedMonth,
        setSelectedMonth,

        dateResult,
        setDateResult
    }}>
        <Box>
            <Text fontSize={36} textAlign={'center'} mt={5}>Calendar</Text>
            {
                calendarType === 'month'
                    ? <Calendar
                        monthData={monthData!}
                    />
                    : <YearCalendar/>
            }
            {
                dateResult === 'non selected'
                    ? null
                    : dateResult === null
                        ? <NoData dateISO={selectedDate?.dateISO!}/>
                        : <AnalyzeResult analyzeResult={dateResult}/>
            }
        </Box>
    </CalendarContext.Provider>

}