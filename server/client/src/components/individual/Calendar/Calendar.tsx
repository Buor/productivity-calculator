import {Box} from "@chakra-ui/react";
import {CalendarHead} from "./CalendarHead";
import {useState} from "react";
import {monthNames} from "../../../core/utils/timeUtils";
import {CalendarDays} from "./CalendarDays";
import {IAnalyzeResult} from "../../../../../commonTypes/timeAnalyzerTypes";

interface IProps {
    datesData: IAnalyzeResult[]
    selectedMonth: Date
    setSelectedMonth: Function
}

export const Calendar: React.FC<IProps> = ({datesData, selectedMonth, setSelectedMonth}) => {

    const [dates, setDates] = useState<IAnalyzeResult[]>([])

    return <Box d={'flex'} flexDirection={'column'} alignItems={'center'}>
        <CalendarHead leftButtonHandler={() => setSelectedMonth((prev: Date) => new Date(prev.getFullYear(), prev.getMonth() - 1))}
                      rightButtonHandler={() => setSelectedMonth((prev: Date) => new Date(prev.getFullYear(), prev.getMonth() + 1))}
                      month={monthNames[selectedMonth.getMonth()]}
                      year={selectedMonth.getFullYear()}
        />
        <CalendarDays month={selectedMonth}/>
    </Box>
}