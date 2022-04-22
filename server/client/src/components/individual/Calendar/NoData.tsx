import React from 'react';
import {Box, Button} from '@chakra-ui/react'
import {formatDate} from "../../../core/utils/timeUtils";
import {useAppDispatch} from "../../../hooks/redux";
import {useNavigate} from "react-router-dom";
import {changeAnalyzeText} from "../../../store/reducers/timeAnalyzerReducer";

interface IProps {
    dateISO: string
}

export const NoData: React.FC<IProps> = ({dateISO}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const dateDots = formatDate(new Date(dateISO), 'dot')

    const handleClick = () => {
        dispatch(changeAnalyzeText(dateDots + '\n'))
        navigate('/timeAnalyzer')
    }

    return <Box d={'flex'} flexDirection={'column'} alignItems={'center'} mt={4}>
        <Box mb={2}>There is no data about {dateDots}</Box>
        <Button variant={'yellow'} onClick={handleClick}>Fill the data in</Button>
    </Box>
};