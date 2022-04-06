import {Body, Controller, Post} from "@nestjs/common";
import {CalendarService} from "./calendar.service";

@Controller('/calendar')
export class CalendarController {

    constructor(private readonly calendarService: CalendarService) {
    }

    // @Get('/monthDates/:monthTimeStamp')
    // getMonthDays(@Param('monthTimeStamp') monthTimeStamp: number) {
    //     return this.calendarService.getMonthDays(monthTimeStamp)
    // }

    @Post('/date')
    async addDay(@Body() body: {actionsString: string}): Promise<IDateResult> {
        return await this.calendarService.addDay(body.actionsString)
    }

    @Post('/dates')
    async addDays(@Body() body: {actionsString: string}): Promise<boolean> {
        return await this.calendarService.addDays(body.actionsString)
    }
}