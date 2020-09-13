const fs = require('fs')
const { getCoursesForTerm } = require('rpi-schedule-parser')

// Change this to the code of the term you want!
const termCode = '202009'

console.log('Grabbing the course list for ' + termCode + '...')
getCoursesForTerm(termCode)
  .then(courses => {
    fs.writeFileSync('courses_' + termCode + '.json', JSON.stringify(courses))
    console.log('Wrote all courses for ' + termCode + ' to courses_' + termCode + '.json')
  })