import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {CalendarService} from "./calendar.service";
import {IDateResult} from "../../../commonTypes/timeAnalyzerTypes";

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

    @Post('/date')
    async addDay(@Body() body: {actionsString: string}): Promise<IDateResult> {
        return await this.calendarService.addDay(body.actionsString)
    }

    @Post('/dates')
    async addDays(@Body() body: {actionsString: string}): Promise<boolean> {
        return await this.calendarService.addDays(body.actionsString)
    }
}