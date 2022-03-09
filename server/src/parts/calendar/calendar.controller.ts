import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {CalendarService} from "./calendar.service";
import {IAnalyzeResult} from "../../../commonTypes/timeAnalyzerTypes";

@Controller('/calendar')
export class CalendarController {

    constructor(private readonly calendarService: CalendarService) {
    }

    @Get('/monthDays/:monthDate')
    getMonthDays(@Param('monthDate') monthDate: string) {
        console.log(monthDate)
        return this.calendarService.getMonthDays()
    }

    @Post('/date')
    addDay(@Body() dayAnalyzeResult: IAnalyzeResult) {
        console.log(dayAnalyzeResult)
    }


}