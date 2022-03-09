import {axiosInstance} from "./axiosInstance";
import {IAnalyzeResult} from "../../../../server/commonTypes/timeAnalyzerTypes";

export class CalendarDal {
    static async sendDateInfo(dateAnalyzeResult: IAnalyzeResult) {
        return axiosInstance.post('/calendar/date', dateAnalyzeResult)
    }
}