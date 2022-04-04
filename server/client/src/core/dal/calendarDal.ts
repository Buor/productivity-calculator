import {axiosInstance} from "./axiosInstance";

export class CalendarDal {
    static async addDate(actionsString: string) {
        return axiosInstance.post('/calendar/date', {actionsString})
    }

    static async addDates(actionsString: string) {
        return axiosInstance.post('/calendar/dates', {actionsString})
    }
}