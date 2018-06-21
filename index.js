const childProcess = require('child_process')
const dayjs = require('dayjs')
const { transformWord } = require('./utils')

function main() {
  let error = false
  const word = process.argv[2] || 'd2bit'
  const initialDateStr = '2017-09-01'

  childProcess.execSync('git rev-parse', (err, stdout, stderr) => {
    if (err) {
      console.log('Should run the command from a git repository folder')
      error = true
      return
    }
  })
  if (error) {
    return
  }

  const initialDate = dayjs(initialDateStr)
    .startOf('week')
    .set('hour', 16)
  const wordLetters = transformWord(word).letters
  let currentWeek = 0
  const commitDates = wordLetters.reduce((acc, letter) => {
    if (currentWeek !== 0) {
      currentWeek++
    }
    const letterArr = letter.toArray()
    for (let letterWeek = 0; letterWeek < letterArr[0].length; letterWeek++) {
      for (let weekDay = 0; weekDay < 7; weekDay++) {
        if (letterArr[weekDay][letterWeek]) {
          const date = initialDate
            .add(currentWeek, 'weeks')
            .add(weekDay, 'days')
          const dateStr = date.format('YYYY.MM.DD')
          const msg = `${date.format('dddd')} on week #${letterWeek +
            1} of letter ${letter.letter} - ${dateStr}`
          acc.push({
            date,
            dateStr,
            msg,
          })
        }
      }
      currentWeek += 1
    }
    return acc
  }, [])
  commitDates.forEach(({ dateStr, msg }) => {
    const command = commitCommand(dateStr, msg)
    childProcess.execSync(command, (err, stdout, stderr) => {
      if (err) {
        console.log('Error creating commit')
        console.error(stderr)
        error = true
        return
      }
    })
  })
}

function commitCommand(date, msg) {
  return `git commit --allow-empty --date='${date}' -m '${msg}'`
}

main()
