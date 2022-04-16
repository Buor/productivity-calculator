import {formatDate, generateDatesForFetch, getDateHM, hmToDate} from "./timeHelpers";

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

describe('generate dates for fetch', () => {
    test('correct data for january 2022', () => {
        const result = generateDatesForFetch(new Date(2022, 0))
        expect(result).toEqual(['2021-12-27', '2021-12-28', '2021-12-29',
            '2021-12-30', '2021-12-31', '2022-01-01',
            '2022-01-02', '2022-01-03', '2022-01-04',
            '2022-01-05', '2022-01-06', '2022-01-07',
            '2022-01-08', '2022-01-09', '2022-01-10',
            '2022-01-11', '2022-01-12', '2022-01-13',
            '2022-01-14', '2022-01-15', '2022-01-16',
            '2022-01-17', '2022-01-18', '2022-01-19',
            '2022-01-20', '2022-01-21', '2022-01-22',
            '2022-01-23', '2022-01-24', '2022-01-25',
            '2022-01-26', '2022-01-27', '2022-01-28',
            '2022-01-29', '2022-01-30', '2022-01-31',
            '2022-02-01', '2022-02-02', '2022-02-03',
            '2022-02-04', '2022-02-05', '2022-02-06'])
    })
})