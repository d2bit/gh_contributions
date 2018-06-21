const { transformLetter, transformWord } = require('../utils')

describe('transformLetter', () => {
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

    expect(transformLetter(letter).toArray()).toEqual(expectedLetter)
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

    expect(transformLetter(letter).toArray()).toEqual(expectedLetter)
  })
})

describe('transformWord', () => {
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

    expect(transformWord(word).toArray()).toEqual(expectedWord)
  })
})

const word = transformWord('d2bit')
console.log(word.toString())
