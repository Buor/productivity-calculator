import {formatDate, getDateHM, hmToDate} from "./timeHelpers";

describe('date format', () => {
    test('test date 1', () => {
        expect(formatDate(new Date(0))).toBe('01.01.1970')
    })
    test('test date 2', () => {
        expect(formatDate(new Date(1514165845115))).toBe('25.12.2017')
    })
})

describe('hm format', () => {
    test('standard date correct format', () => {
        expect(getDateHM(new Date(0,0,0,23,45))).toBe('23:45')
    })
    test('date with 0 hours and minutes', () => {
        expect(getDateHM(new Date(0,0,0,0,0))).toBe('00:00')
    })
    test('mixed date hours and minutes', () => {
        expect(getDateHM(new Date(0,0,0,4,59))).toBe('04:59')
    })
})

describe('hm to date', () => {
    test('hm to correct date transform 1', () => {
        expect(hmToDate('04:25')).toEqual(new Date(0,0,0,4,25))
    })
    test('hm to correct date transform 2', () => {
        expect(hmToDate('00:00')).toEqual(new Date(0,0,0,0,0))
    })
})