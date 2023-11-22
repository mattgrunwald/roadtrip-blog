import {
  Size,
  Sizes,
  findConsecutiveFreeSpaces,
  findSpot,
  findTallSpot,
} from './helpers'

describe('findConsecutiveFreespaces method', () => {
  it('should work for normal images', () => {
    expect(findConsecutiveFreeSpaces([0, 0, 0, 0], 1)).toBe(0)
    expect(findConsecutiveFreeSpaces([null, 0, 0, 0], 1)).toBe(1)
    expect(findConsecutiveFreeSpaces([null, null, null, 0], 1)).toBe(3)
    expect(findConsecutiveFreeSpaces([null, null, null, null], 1)).toBe(null)
  })

  it('should work for wide images', () => {
    expect(findConsecutiveFreeSpaces([0, 0, 0, 0], 2)).toBe(0)
    expect(findConsecutiveFreeSpaces([null, null, 0, 0], 2)).toBe(2)
    expect(findConsecutiveFreeSpaces([null, null, null, 0], 2)).toBe(null)
  })
})

describe('findTallSpot method', () => {
  it('should work', () => {
    expect(findTallSpot([0, 0, 0, 0], [0, 0, 0, 0])).toBe(0)
    expect(findTallSpot([null, 0, 0, 0], [0, 0, 0, 0])).toBe(1)
    expect(findTallSpot([0, 0, 0, 0], [null, null, 0, 0])).toBe(2)
    expect(findTallSpot([null, null, 0, 0], [0, 0, null, null])).toBe(null)
  })
})

describe('findSpot method', () => {
  it('should work for normal images', () => {
    expect(findSpot([[0, 0, 0, 0]], Sizes.NORMAL as Size)).toEqual([0, 0])
    expect(findSpot([[null, 0, 0, 0]], Sizes.NORMAL as Size)).toEqual([0, 1])
    expect(findSpot([[null, null, null, null]], Sizes.NORMAL as Size)).toEqual([
      0, 0,
    ])
  })

  it('should work for tall images', () => {
    expect(findSpot([[0, 0, 0, 0]], Sizes.TALL as Size)).toEqual([1, 0])
    expect(findSpot([[null, 0, 0, 0]], Sizes.TALL as Size)).toEqual([1, 1])
    expect(findSpot([[null, null, null, null]], Sizes.TALL as Size)).toEqual([
      1, 0,
    ])
    expect(
      findSpot(
        [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        Sizes.TALL as Size,
      ),
    ).toEqual([1, 0])
    expect(
      findSpot(
        [
          [null, 0, 0, 0],
          [null, null, null, null],
        ],
        Sizes.TALL as Size,
      ),
    ).toEqual([1, 1])
  })
})

it('should work for wide images', () => {
  expect(findSpot([[0, 0, 0, 0]], Sizes.WIDE as Size)).toEqual([0, 0])
  expect(findSpot([[null, 0, 0, 0]], Sizes.WIDE as Size)).toEqual([0, 1])
  expect(findSpot([[null, null, null, null]], Sizes.WIDE as Size)).toEqual([
    0, 0,
  ])
})
