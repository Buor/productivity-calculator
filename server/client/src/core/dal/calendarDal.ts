import {axiosInstance} from "./axiosInstance";

export class CalendarDal {
    static async addDate(actionsString: string) {
        return axiosInstance.post('/calendar/date', {actionsString})
    }
}