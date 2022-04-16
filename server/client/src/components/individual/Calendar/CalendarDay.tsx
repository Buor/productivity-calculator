import {Box} from "@chakra-ui/react";
import {IDateData} from "../../../../../commonTypes/dtos";
import {useCalendarContext} from "../../pages/CalendarPage";

interface IProps {
    dateData: IDateData
}

export const CalendarDay: React.FC<IProps> = ({dateData}) => {

    const {selectedDate, setSelectedDate} = useCalendarContext()
    const dateResult = dateData.dateResult
    const currentDate = new Date(dateData.dateISO)

    return <Box
        flex={'1 1 14.28%'}
        cursor={'pointer'}
        textAlign={'center'}
        fontSize={16}
        py={4}
        backgroundColor={selectedDate === dateData ? 'custom.medium' : 'transparent'}
        _hover={{
            backgroundColor: 'custom.medium'
        }}

        onClick={() => setSelectedDate(dateData)}
    >
        {currentDate.getDate()}
    </Box>
}