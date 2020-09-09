export type PeriodType = 'LEC' | 'STU' | 'TES' | 'SEM' | 'LAB' | 'REC'

/** Represents a single course **for a specific term**. */
export interface Course {
  /** The unique identifier for a term made from combining start year with start month, e.g. `"202001"`. */
  termCode: string
  /** The title of the course. */
  title: string
  /** The subject the course falls under, e.g. `"BIOL"` or `"CSCI"`. */
  subjectPrefix: string
  /** The number of the course, e.g. `"1010"` from `"BIOL 1010"`. */
  subjectCode: string
  /** The different sections for this course. */
  sections: Section[]
  [key: string]: any
}

/** Represents a single section for a course with a unique `crn` and `section`. Contains multiple periods. */
export interface Section {
  /** Unique identifier for this course section in a certain term. May repeat over different terms. */
  crn: string
  /** Id for this section, e.g. `"01"` or `"07"` */
  id: string
  /** The periods associated with this section. */
  periods: Period[]
  [key: string]: any
}

/** Represents a single weekly period associated with a section of a course. Might meet multiple days of the week. */
export interface Period {
  /** The type of period, e.g. lecture, test block, recitation, etc. */
  type: PeriodType
  /** Starting time of period in HH:mm (0-padded, 24-hour format). */
  startTime: string | null
  /** Ending time of period in HH:mm (0-padded, 24-hour format) in EST. */
  endTime: string | null
  /** Days that this period takes place each week (0 is Sunday) in EST. */
  days: number[]
  /** How this section will be taught */
  instructionMethod?: string
  /** Date the period starts occurring in YYYY-MM-DD format in EST. Or NULL if TBA. */
  startDate?: string
  /** Date the period stops occurring in YYYY-MM-DD format in EST. Or NULL if TBA. */
  endDate?: string
  /** Where this period takes place in BUILDING ROOM# format, e.g. `"DARRIN 308"`. Null if TBA. */
  location: string | null
  /** The instructors associated with this period. Just last names. */
  instructors: string[]
  /** A direct link to the RPI Bookstore listings for this section */
  textbooksLink?: string
  [key: string]: any
}
