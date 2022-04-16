/**
 * @returns date in format dd.mm.yyyy if type is set to dot. If type set to dash, returns yyyy-mm-dd
 *
 */
export function formatDate(date: Date, type: 'dot' | 'dash' = 'dot') {
    if (type === 'dot') return `${getStrDate(date)}.${getStrMonth(date)}.${date.getFullYear()}`
    return `${date.getFullYear()}-${getStrMonth(date)}-${getStrDate(date)}`
}

export const getDateHM = (date: Date) => `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`
export const hmToDate = (hm: string) => new Date(0, 0, 0, +hm.slice(0, 2), +hm.slice(-2))
const getStrMonth = (date: Date) => ('0' + (date.getMonth() + 1)).slice(-2)
const getStrDate = (date: Date) => ('0' + date.getDate()).slice(-2)

export function generateDatesForFetch(month: Date) {
    const dates: Date[] = []
    const dateToIter = new Date(month.getFullYear(), month.getMonth(), 1)
    const monthNumber = month.getMonth()

    let decr: number

    if(dateToIter.getDay() === 0) decr = 6
    else decr = dateToIter.getDay() - 1

    dateToIter.setDate(dateToIter.getDate() - decr)

    //Fill with month dates
    for (; !(dateToIter.getMonth() === monthNumber + 1 && dateToIter.getDay() === 1); dateToIter.setDate(dateToIter.getDate() + 1)) {
        dates.push(new Date(+dateToIter))
    }

    return dates
}