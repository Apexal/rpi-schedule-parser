import { Period, Course, Section } from './interfaces'

type Times = {
  /** 24-hour, 0-padded time, e.g. "08:00" or "14:20" */
  startTime: string | null
  /** 24-hour, 0-padded time, e.g. "08:00" or "14:20" */
  endTime: string | null
}

/**
 * Given two inconsistent time strings, convert them to 24-hour time in format `HH:mm`.
 * If the time is invalid, like '** TBA **' it will set start and end to null.
 *
 * @param {string} startTime String like '10:00' or '3:50PM'
 * @param {string} endTime String like '10:00' or '3:50PM'
 * @returns {object} Object with `startTime` and `endTime` in `HH:mm` format or nulled
 */
export function determineTimes(startTime: string, endTime: string): Times {
  let [startHours, startMinutes] = startTime
    .split(':')
    .map((piece) => parseInt(piece, 10))

  if (isNaN(startHours)) {
    return {
      startTime: null,
      endTime: null,
    }
  }

  if (!startMinutes) startMinutes = 0

  let [endHours, endMinutes] = endTime
    .replace('AM', '')
    .replace('PM', '')
    .split(':')
    .map((piece) => parseInt(piece, 10))

  if (!endMinutes) endMinutes = 0

  // Determine meridiem
  if (endTime.includes('PM')) {
    if (endHours < 12) {
      endHours += 12
    }
    if (startHours + 12 <= endHours) {
      startHours += 12
    }
  }

  const finalStartTime = `${String(startHours).padStart(2, '0')}:${String(
    startMinutes,
  ).padStart(2, '0')}`

  const finalEndTime = `${String(endHours).padStart(2, '0')}:${String(
    endMinutes,
  ).padStart(2, '0')}`

  return {
    startTime: finalStartTime,
    endTime: finalEndTime,
  }
}

/** Generate a unique ID for a period's associated course. */
function periodCourseId(period: Period) {
  return period.courseSubjectPrefix + period.courseSubjectCode
}

function findOrCourseFromPeriod(
  courses: { [key: string]: Course },
  period: Period,
  termCode: string,
): Course {
  if (!courses[periodCourseId(period)]) {
    courses[periodCourseId(period)] = {
      termCode,
      title: period.courseTitle,
      subjectPrefix: period.courseSubjectPrefix,
      subjectCode: period.courseSubjectCode,
      sections: [] as Section[],
    }
  }

  return courses[periodCourseId(period)]
}

function findOrCreateSectionFromPeriod(course: Course, period: Period) {
  let existingSection = course.sections.find(
    (section) => section.id === period.section,
  )

  if (!existingSection) {
    existingSection = {
      crn: period.crn,
      id: period.sectionId,
      periods: [],
    }
    course.sections.push(existingSection)
  }

  return existingSection
}

export function compileCourses(periods: Period[], termCode: string): Course[] {
  // Allows quick lookup of courses
  const courses: {
    [key: string]: Course
  } = {}

  // Damn this is good code
  for (const period of periods) {
    const course = findOrCourseFromPeriod(courses, period, termCode)
    const section = findOrCreateSectionFromPeriod(course, period)

    // Add this period to the course's section list
    section.periods.push(period)
  }

  // Return array of all courses instead of internal object representation since it makes more sense
  return Object.values(courses)
}
