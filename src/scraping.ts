import { JSDOM } from 'jsdom'
import { determineTimes } from './utils'
import { Period, PeriodType } from './interfaces'

const SCHEDULE_ROOT_URL = `https://sis.rpi.edu/reg/zs`

const dayMap: { [key: string]: number } = { M: 1, T: 2, W: 3, R: 4, F: 5 }

/**
 * Request schedule page for a specific term and get JSDOM document.
 * This will only work with recent terms as the schedule pages are taken down eventually.
 *
 * @param {string} termCode 6 digit term code, e.g. `'202009'`
 * @returns {JSDOM} JSDOM document for schedule page
 */
export async function getScheduleDocumentForTerm(
  termCode: string,
): Promise<Document> {
  const dom = await JSDOM.fromURL(SCHEDULE_ROOT_URL + termCode + '.htm')

  return dom.window.document
}

/**
 * Given a term code and JSDOM document, parses the period rows to get every course period.
 *
 * @param {Document} document JSDOM document of Registrar page
 * @param {string} termCode Registrar term code
 * @returns {Period[]} All period objects
 */
export function getPeriods(document: Document, termCode: string): Period[] {
  /** Every table row in a schedule document that *most likely* represents a course period but may be invalid. */
  const rows = document.querySelectorAll(
    'div > div > center table > tbody > tr',
  )

  /** All valid periods found in the document. */
  const periods: Period[] = []
  let lastCRN: string
  let lastCourseSubjectPrefix: string
  let lastCourseSubjectCode: string
  let lastCourseTitle: string
  rows.forEach((row) => {
    const rowTds: PeriodType[] = []
    const tdElements = row.querySelectorAll('td')
    tdElements.forEach((td) => {
      if (td.textContent) rowTds.push(td.textContent.trim() as PeriodType)
    })

    if (rowTds.length === 0 || !rowTds[5]) return

    const splitPieces = rowTds[0].split(' ')
    let crn = splitPieces[0]
    const summary = splitPieces[1]

    let courseTitle
    let courseSubjectPrefix
    let courseSubjectCode
    let sectionId
    if (!crn || !summary) {
      // Change of section
      crn = lastCRN
      courseSubjectPrefix = lastCourseSubjectPrefix
      courseSubjectCode = lastCourseSubjectCode
      courseTitle = lastCourseTitle
    } else {
      ;[courseSubjectPrefix, courseSubjectCode, sectionId] = summary.split('-')
      courseTitle = rowTds[1]
    }

    periods.push({
      termCode,
      crn,
      courseTitle,
      courseSubjectPrefix,
      courseSubjectCode,
      sectionId,
      type: rowTds[2],
      instructionMethod: rowTds[3],
      credits: rowTds[4],
      days: rowTds[6]
        .replace(/ /g, '')
        .split('')
        .map((letter) => dayMap[letter]),
      instructors: rowTds[9].split('/'),
      location: rowTds[10],
      // textbooksLink: rowTds
      ...determineTimes(rowTds[7], rowTds[8]),
    })

    lastCRN = crn
    lastCourseSubjectPrefix = courseSubjectPrefix
    lastCourseSubjectCode = courseSubjectCode
    lastCourseTitle = courseTitle
  })

  return periods
}
