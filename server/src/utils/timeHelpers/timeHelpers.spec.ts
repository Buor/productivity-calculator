import {formatDate} from "./timeHelpers";

describe('date format', () => {
    test('test date 1', () => {
        expect(formatDate(new Date(0))).toBe('01.01.1970')
    })
    test('test date 2', () => {
        expect(formatDate(new Date(1514165845115))).toBe('25.12.2017')
    })
})