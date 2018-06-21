const LETTERS = require('./letters')
const EMPTY = LETTERS['?']

function transformLetter(letter) {
  const arr = LETTERS[letter] || EMPTY
  return {
    toArray: () => arr,
    toString: () =>
      arr.map(row => row.map(col => (col ? '*' : ' ')).join('')).join('\n'),
    letter,
  }
}

function transformWord(word) {
  const SPACE = [0]
  const letters = word.split('').map(transformLetter)
  const arr = letters
    .map(letter => letter.toArray())
    .reduce((result, letter) =>
      result.map((row, index) => row.concat(SPACE).concat(letter[index]))
    )
  return {
    toArray: () => arr,
    toString: () =>
      arr.map(row => row.map(col => (col ? '*' : ' ')).join('')).join('\n'),
    letters,
    word,
  }
}

module.exports = {
  transformLetter,
  transformWord,
}
