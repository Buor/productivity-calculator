import {Box} from "@chakra-ui/react";
import React from "react";
import {IDateData} from "../../../../../commonTypes/dtos";
import {CalendarDay} from "./CalendarDay";

interface IProps {
    datesData: IDateData[]
}

export const CalendarDays: React.FC<IProps> = ({datesData}) => {

    return <Box d={'flex'} flexWrap={'wrap'}>
        {datesData.map(dateData =>
            <CalendarDay
                key={dateData.dateISO}
                dateData={dateData}
            />)}
    </Box>
}