const LETTERS = require('./letters')
const EMPTY = LETTERS['?']

module.exports.writeLetter = function writeLetter(letter) {
  return LETTERS[letter] || EMPTY
}

module.exports.writeWord = function writeWord(word) {
  const SPACE = [0]
  const letters = word.split('')
  return letters
    .map(letter => LETTERS[letter])
    .reduce((result, letter) =>
      result.map((row, index) => row.concat(SPACE).concat(letter[index]))
    )
}
