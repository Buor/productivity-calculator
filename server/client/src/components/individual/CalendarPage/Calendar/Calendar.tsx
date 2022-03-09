import {Box} from "@chakra-ui/react";
import {CalendarHead} from "./CalendarHead";
import {useEffect, useState} from "react";
import {monthNames} from "../../../../core/utils/timeUtils";
import {CalendarDays} from "./CalendarDays";
import axios from "axios";
import {IAnalyzeResult} from "../../../../../../server/commonTypes/timeAnalyzerTypes";

export const Calendar: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>()
    const [selectedMonth, setSelectedMonth] = useState<Date>(new Date())
    const [dates, setDates] = useState<IAnalyzeResult[]>([])

    useEffect(() => {
        async function run() {
            const responseBody = await axios.get(`http://localhost:5647/api/calendar/monthDays/${selectedMonth.getFullYear()}.${selectedMonth.getMonth()}`)
            console.log(responseBody.data)
        }
        run()
    })

    return <Box d={'flex'} flexDirection={'column'} alignItems={'center'}>
        <CalendarHead leftButtonHandler={() => setSelectedMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))}
                      rightButtonHandler={() => setSelectedMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))}
                      month={monthNames[selectedMonth.getMonth()]}
                      year={selectedMonth.getFullYear()}
        />
        <CalendarDays month={selectedMonth}/>
    </Box>
}