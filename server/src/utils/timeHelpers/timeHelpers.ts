/**
 * @returns date in format dd.mm.yyyy
 *
 */
export function formatDate(date: Date) {
    return `${('0' + date.getDate()).slice(-2)}.${('0' + (date.getMonth() + 1)).slice(-2)}.${date.getFullYear()}`
}