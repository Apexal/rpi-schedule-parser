import * as path from 'path'
import { determineTimes, compileCourses } from '../src/utils'
import { JSDOM } from 'jsdom'
import { getPeriods } from '../src/scraping'

test('determineTimes properly parses inconsistent strings', () => {
  expect(determineTimes('10:00', '2:30PM')).toEqual({
    startTime: '10:00',
    endTime: '14:30',
  })
})

test('determineTimes properly parses REALLY inconsistent strings', () => {
  expect(determineTimes('10:00', '2PM')).toEqual({
    startTime: '10:00',
    endTime: '14:00',
  })
})

test('determineTimes properly parses TBA', () => {
  expect(determineTimes('** TBA **', '')).toEqual({
    startTime: null,
    endTime: null,
  })
})

test('properly compiles courses from periods', async () => {
  const termCode = '202009'

  const scheduleDOM = await JSDOM.fromFile(
    path.join(__dirname, 'data/', termCode + '.html'),
  )
  const periods = getPeriods(scheduleDOM.window.document, termCode)

  const courses = compileCourses(periods, termCode)

  expect(courses.length).toBeGreaterThan(0)
})
