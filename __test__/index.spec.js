const { writeLetter, writeWord } = require('../index')

describe('writeLetter', () => {
  test('it fills an array with a letter', () => {
    const letter = 'd'
    expectedLetter = [
      [0, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 0, 1],
      [0, 1, 1, 1],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [0, 1, 1, 1],
    ]

    expect(writeLetter(letter)).toEqual(expectedLetter)
  })

  test('it fills an array with a question mark when cannot paint the letter', () => {
    const letter = 'w'
    expectedLetter = [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [1, 0, 0, 1],
      [0, 0, 1, 1],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 1, 0],
    ]

    expect(writeLetter(letter)).toEqual(expectedLetter)
  })
})

describe('writeWord', () => {
  test('add space between letters', () => {
    const word = 'db'
    expectedWord = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 0, 0],
      [0, 1, 1, 1, 0, 1, 1, 1, 0],
      [1, 0, 0, 1, 0, 1, 0, 0, 1],
      [1, 0, 0, 1, 0, 1, 0, 0, 1],
      [0, 1, 1, 1, 0, 1, 1, 1, 0],
    ]

    expect(writeWord(word)).toEqual(expectedWord)
  })
})

const word = writeWord('d2bit')
console.log(word.map(row => row.map(pixel => pixel || ' ').join('')).join('\n'))
