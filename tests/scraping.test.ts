import * as path from 'path'
import { JSDOM } from 'jsdom'
import { getPeriods } from '../src/scraping'
import { Period } from '../src/interfaces'

test('gets periods for term properly', async () => {
  const termCode = '202009'

  const scheduleDOM = await JSDOM.fromFile(
    path.join(__dirname, 'data/', termCode + '.html'),
  )
  const periods = getPeriods(scheduleDOM.window.document, termCode)

  const expectedFirstPeriod: Period = {
    termCode: '202009',
    crn: '25790',
    courseTitle: 'EFF COMM FOR CLASS PEDAGOGY',
    courseSubjectPrefix: 'ADMN',
    courseSubjectCode: '1010',
    sectionId: '01',
    type: 'LEC',
    credits: '0',
    days: [1, 4],
    instructors: ['Staff'],
    location: '0',
    startTime: '14:00',
    endTime: '15:50',
  }

  expect(periods[0]).toEqual(expectedFirstPeriod)
})
