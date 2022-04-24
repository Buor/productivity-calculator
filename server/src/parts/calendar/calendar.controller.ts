import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {CalendarService} from "./calendar.service";
import {IDateResult} from "../../../commonTypes/timeAnalyzerTypes";
import {IAnalyzeDateDTO} from "../../../commonTypes/dtos";

@Controller('/calendar')
export class CalendarController {

    constructor(private readonly calendarService: CalendarService) {
    }

    // @Get('/month/:monthTimeStamp')
    // getMonthDays(@Param('monthTimeStamp') monthTimeStamp: number) {
    //     return this.calendarService.getMonth(monthTimeStamp)
    // }

    @Get('/date/:dateStr')
    async getDate(@Param('dateStr') dateStr: string) {
        return await this.calendarService.getDate(dateStr)
    }

    @Get('/monthDates/:monthISOString')
    async getMonthDates(@Param('monthISOString') monthISOString: string) {
        return await this.calendarService.getMonth(monthISOString)
    }

    @Post('/date')
    async addDay(@Body() body: IAnalyzeDateDTO): Promise<IDateResult> {
        return await this.calendarService.addDay(body)
    }

    @Post('/dates')
    async addDays(@Body() body: IAnalyzeDateDTO): Promise<boolean> {
        return await this.calendarService.addDays(body)
    }
}