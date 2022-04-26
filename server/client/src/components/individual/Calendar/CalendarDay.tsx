import {Box} from "@chakra-ui/react";
import {IDateData} from "../../../../../commonTypes/dtos";
import {useCalendarContext} from "../../pages/CalendarPage";

interface IProps {
    dateData: IDateData
}

export const CalendarDay: React.FC<IProps> = ({dateData}) => {

    const {selectedDate, setSelectedDate, setDateResult, selectedMonth} = useCalendarContext()
    const dateResult = dateData.dateResult
    const currentDate = new Date(dateData.dateISO)

    const handleClick = () => {
        setSelectedDate(dateData)
        setDateResult(dateResult)
    }
    
    return <Box
        flex={'0 1 14.28%'}
        cursor={'pointer'}
        textAlign={'center'}
        fontSize={16}
        py={4}
        backgroundColor={selectedDate === dateData ? 'custom.medium' : 'transparent'}
        color={(new Date(dateData.dateISO)).getMonth() === selectedMonth.getMonth() ? 'white' : 'gray'}
        _hover={{
            backgroundColor: 'custom.medium'
        }}

        onClick={handleClick}
    >
        {currentDate.getDate()}
    </Box>
}