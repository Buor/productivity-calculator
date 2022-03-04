import {Box} from "@chakra-ui/react";
import {CalendarHead} from "./CalendarHead";
import {useState} from "react";
import {monthNames} from "../../../../core/utils/timeUtils";

export const Calendar: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>()
    const [selectedMonth, setSelectedMonth] = useState<Date>(new Date())

    return <Box>
        <CalendarHead leftButtonHandler={() => setSelectedMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))}
                      rightButtonHandler={() => setSelectedMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))}
                      month={monthNames[selectedMonth.getMonth()]}
                      year={selectedMonth.getFullYear()}
        />
    </Box>
}