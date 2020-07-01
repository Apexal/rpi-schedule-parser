/** Represents a single course **for a specific term**. */
export interface Course {
  termCode: string;
  title: string;
  subjectPrefix: string;
  subjectCode: string;
  sections?: Section[];
  [key: string]: any;
}

/** Represents a single section for a course with a unique `crn` and `section`. Contains multiple periods. */
export interface Section {
  crn: string;
  section: string;
  periods?: Period[];
  [key: string]: any;
}

/** Represents a single weekly period associated with a section of a course. Might meet multiple days of the week. */
export interface Period {
  type: string;
  startTime: string;
  endTime: string;
  days: number[];
  startDate?: string;
  endDate?: string;
  location: string;
  instructors: string[];
  [key: string]: any;
}
