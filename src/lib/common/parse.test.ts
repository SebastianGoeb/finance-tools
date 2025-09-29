import {describe, expect, test} from 'vitest'
import {parseGermanDate, parseGermanNumber, parseLocalizedNumber} from './parse'

describe("parseGermanNumber", () => {
  const cases = [
    {input: "1", expected: 1},
    {input: "1,234", expected: 1.234},
    {input: "123.456,789", expected: 123_456.789},
    {input: "123456,789", expected: 123_456.789},
  ]
  cases.forEach(({input, expected}) => test(input, () => {
    expect(parseGermanNumber(input)).toEqual(expected)
  }))
})

describe("parseLocalizedNumber", () => {
  const cases = [
    {group: ",", decimal: ".", input: "1", expected: 1},
    {group: ",", decimal: ".", input: "1.234", expected: 1.234},
    {group: ",", decimal: ".", input: "123,456.789", expected: 123_456.789},
    {group: ",", decimal: ".", input: "123456.789", expected: 123_456.789},
    {group: ".", decimal: ",", input: "1", expected: 1},
    {group: ".", decimal: ",", input: "1,234", expected: 1.234},
    {group: ".", decimal: ",", input: "123.456,789", expected: 123_456.789},
    {group: ".", decimal: ",", input: "123456,789", expected: 123_456.789},
  ]
  cases.forEach(({group, decimal, input, expected}) => test(input, () => {
    expect(parseLocalizedNumber(input, {group, decimal})).toEqual(expected)
  }))
})

describe("parseGermanDate", () => {
  const cases = [
    {input: "31.12.1999", expected: new Date("1999-12-31 00:00:00Z")},
    {input: "01.01.2000", expected: new Date("2000-01-01 00:00:00Z")},
    {input: "01/01/2000", err: "invalid date format"},
    {input: "2000-01-01", err: "invalid date format"},
  ]
  cases.forEach(({input, expected, err}) => test(input, () => {
    if (err) {
      expect(() => parseGermanDate(input)).toThrowError(new Error(err))
    } else {
      expect(parseGermanDate(input)).toEqual(expected)
    }
  }))
})
