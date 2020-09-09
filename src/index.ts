import { getScheduleDocumentForTerm, getPeriods } from './scraping'
import { compileCourses } from './utils'
import { Course, Period } from './interfaces'

/**
 * Get all separate periods for a specific school term.
 *
 * @param termCode The code for the term, e.g. `"202001"`
 * @returns Promise containing parsed periods
 */
export async function getPeriodsForTerm(termCode: string): Promise<Period[]> {
  const document = await getScheduleDocumentForTerm(termCode)
  return getPeriods(document, termCode)
}

/**
 * Get all courses, their sections, and their sections' periods for a specific school term.
 *
 * @param termCode The code for the term, e.g. `"202001"`
 * @returns Promise containing parsed courses with section and periods
 */
export async function getCoursesForTerm(termCode: string): Promise<Course[]> {
  const periods = await getPeriodsForTerm(termCode)
  return compileCourses(periods, termCode)
}
