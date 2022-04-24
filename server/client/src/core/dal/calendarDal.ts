import {axiosInstance} from "./axiosInstance";
import {IAnalyzeDateDTO} from "../../../../commonTypes/dtos";

export class CalendarDal {
    static async addDate(analyzeDateDTO: IAnalyzeDateDTO) {
        return axiosInstance.post('/calendar/date', analyzeDateDTO)
    }

    static async addDates(analyzeDateDTO: IAnalyzeDateDTO) {
        return axiosInstance.post('/calendar/dates', analyzeDateDTO)
    }

    static async getMonth(month: Date) {
        return axiosInstance.get(`/calendar/monthDates/${month.toISOString()}` )
    }
}