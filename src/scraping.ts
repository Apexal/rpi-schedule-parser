import { JSDOM } from "jsdom";

const SCHEDULE_ROOT_URL = `https://sis.rpi.edu/reg/zs`;

export interface Course {
  termCode: string;
  title: string;
  subjectPrefix: string;
  subjectCode: string;
  sections?: Section[];
}

export interface Section {
  crn: string;
  section: string;
  periods?: Period[];
}

export interface Period {
  type: string;
  startTime: string;
  endTime: string;
  days: number[];
  startDate: string;
  endDate: string;
  location: string;
  instructors: string[];
}

/**
 * Request schedule page for a specific term and get JSDOM document.
 * This will only work with recent terms as the schedule pages are taken down eventually.
 *
 * @param {string} termCode 6 digit term code, e.g. `'202009'`
 * @returns {JSDOM} JSDOM document for schedule page
 */
export async function getScheduleDocumentForTerm(termCode: string) {
  const dom = await JSDOM.fromURL(SCHEDULE_ROOT_URL + termCode + ".htm");

  return dom.window.document;
}
