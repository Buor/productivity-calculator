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
    async addDay(@Body() body: {actionsString: string}) {
        return await this.calendarService.addDay(body.actionsString)
    }
}