import {Box} from "@chakra-ui/react";
import {CalendarHead} from "./CalendarHead";
import {monthNames} from "../../../core/utils/timeUtils";
import {CalendarDays} from "./CalendarDays";
import {IMonthDTO} from "../../../../../commonTypes/dtos";
import {useCalendarContext} from "../../pages/CalendarPage";

interface IProps {
    monthData: IMonthDTO
}

export const Calendar: React.FC<IProps> = ({monthData}) => {

    const {setSelectedMonth, selectedMonth} = useCalendarContext()

    return <Box d={'flex'} flexDirection={'column'} alignItems={'center'}>
        <CalendarHead leftButtonHandler={() => setSelectedMonth((prev: Date) => new Date(prev.getFullYear(), prev.getMonth() - 1))}
                      rightButtonHandler={() => setSelectedMonth((prev: Date) => new Date(prev.getFullYear(), prev.getMonth() + 1))}
                      month={monthNames[selectedMonth.getMonth()]}
                      year={selectedMonth.getFullYear()}
        />
        <CalendarDays datesData={monthData.datesData}/>
    </Box>
}