import {Box, Text} from "@chakra-ui/react";
import {Calendar} from "./Calendar";

export const CalendarPage: React.FC = () => {
    return <Box>
        <Text fontSize={36} textAlign={'center'} mt={5}>Calendar</Text>
        <Calendar/>
    </Box>
}