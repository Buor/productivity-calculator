/**
 * @returns date in format dd.mm.yyyy if type is set to dot. If type set to dash, returns yyyy-mm-dd
 *
 */
export function formatDate(date: Date, type: 'dot' | 'dash' = 'dot') {
    if(type === 'dot') return `${getStrDate(date)}.${getStrMonth(date)}.${date.getFullYear()}`
    return `${date.getFullYear()}-${getStrMonth(date)}-${getStrDate(date)}`
}

export const getDateHM = (date: Date) =>  `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`
export const hmToDate = (hm: string) => new Date(0,0,0, +hm.slice(0,2), +hm.slice(-2))
const getStrMonth = (date: Date) => ('0' + (date.getMonth() + 1)).slice(-2)
const getStrDate = (date: Date) => ('0' + date.getDate()).slice(-2)

// export function formMonthData(monthTimeStamp) {
//
// }