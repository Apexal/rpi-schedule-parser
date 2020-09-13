# RPI Schedule Parser

This package exposes two functions that fetch and parse RPI's official course listing.

## Installation

```bash
$ npm install rpi-schedule-parser
```

## Usage

### [Course, Section, and Period Interfaces](src/interfaces.ts)

```js
/**
 * Get all separate periods for a specific school term.
 *
 * @param termCode The code for the term, e.g. `"202001"`
 * @returns Promise containing parsed periods
 */
getPeriodsForTerm(termCode: string): Promise<Period[]>


/**
 * Get all courses, their sections, and their sections' periods for a specific school term.
 *
 * @param termCode The code for the term, e.g. `"202001"`
 * @returns Promise containing parsed courses with section and periods
 */
getCoursesForTerm(termCode: string): Promise<Course[]>
```

---

### Term Codes

RPI's term codes consist of the 4-digit year the semester starts in plus the 0-padded month. Arch makes it a little weirder since there are 3 parts:

- `"20200501"` Summer 2020 Full Term
- `"20200502"` Summer 2020 First Term
- `"20200503"` Summer 2020 Second Term
- `"202001"` Spring 2020
- `"202009"` Fall 2020

## Examples

```js
const { getPeriodsForTerm } = require('rpi-schedule-parser')

getPeriodsForTerm('202009')
  .then(periods => {
    // Do whatver you want with the periods
    // The possibilities are endless :]
  })
  .catch(console.error)

```

```js
const { getCoursesForTerm } = require('rpi-schedule-parser')

getCoursesForTerm('202009')
  .then(courses => {
    // Do whatver you want with the courses
    // The possibilities are endless :]
  })
  .catch(console.error)

```
