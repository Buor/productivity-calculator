import {Box, Text} from "@chakra-ui/react";
import {Calendar} from "../individual/Calendar/Calendar";
import {useEffect, useState} from "react";
import {YearCalendar} from "../individual/Calendar/YearCalendar";
import {IAnalyzeResult} from "../../../../commonTypes/timeAnalyzerTypes";


export const CalendarPage: React.FC = () => {

    const [selectedDate, setSelectedDate] = useState<Date | null>()
    const [selectedMonth, setSelectedMonth] = useState<Date>(new Date())

    const [calendarType, setCalendarType] = useState<'month' | 'year'>('month')
    const [daysAnalysis, setDaysAnalysis] = useState<IAnalyzeResult[] | null>()

    useEffect(() => {
        //todo implement
    }, [])

    if (daysAnalysis === null) return null

    return <Box>
        <Text fontSize={36} textAlign={'center'} mt={5}>Calendar</Text>
        {
            calendarType === 'month'
                ? <Calendar
                    datesData={daysAnalysis!}
                    selectedMonth={selectedMonth}
                    setSelectedMonth={setSelectedMonth}
                />
                : <YearCalendar/>
        }
    </Box>
}