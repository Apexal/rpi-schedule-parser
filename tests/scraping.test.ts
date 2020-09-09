import * as path from 'path'
import { JSDOM } from 'jsdom'
import { getCoursesForTerm } from '../src'
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
    instructionMethod: 'Online Course',
    type: 'LEC',
    credits: '0',
    days: [1, 4],
    instructors: ['Staff'],
    location: 'ONLINE',
    startTime: '14:30',
    endTime: '16:20',
    // textbooksLink:
    // 'https://www.bkstr.com/webapp/wcs/stores/servlet/booklookServlet?bookstore_id-1=1461&term_id-1=202009&crn-1=25790',
  }

  expect(periods[0]).toEqual(expectedFirstPeriod)
  expect(periods.length).toBe(2721)
})

test('gets courses for term properly', async () => {
  const termCode = '202009'

  const courses = await getCoursesForTerm(termCode)

  expect(courses.length).toBe(884)
})
