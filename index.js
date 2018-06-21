const childProcess = require('child_process')
const dayjs = require('dayjs')
const { writeWord } = require('./utils')

function main() {
  let error = false
  const word = process.argv[2] || 'd2bit'
  const initialDateStr = '2017-08-01'

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

  const initialDate = dayjs(initialDateStr).startOf('week')
  const wordArray = writeWord(word)
  wordArray.forEach((row, day) => {
    row.forEach((col, week) => {
      if (!col) {
        return
      }
      const date = initialDate.add(week, 'weeks').add(day, 'days')
      const dateStr = date.format('YYYY.MM.DD')
      const msg = `Commit on date ${dateStr}`
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
  })
}

function commitCommand(date, msg) {
  return `git commit --allow-empty --date='${date}' -m '${msg}'`
}

main()
