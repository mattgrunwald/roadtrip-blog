import {
  Size,
  sizes,
  findConsecutiveFreeSpaces,
  findSpot,
  findTallSpot,
} from './imageSizing'

describe('findConsecutiveFreespaces method', () => {
  it('should work for normal images', () => {
    expect(findConsecutiveFreeSpaces([0, 0, 0, 0], 1)).toBe(0)
    expect(findConsecutiveFreeSpaces([1, 0, 0, 0], 1)).toBe(1)
    expect(findConsecutiveFreeSpaces([1, 1, 1, 0], 1)).toBe(3)
    expect(findConsecutiveFreeSpaces([1, 1, 1, 1], 1)).toBe(null)
  })

  it('should work for wide images', () => {
    expect(findConsecutiveFreeSpaces([0, 0, 0, 0], 2)).toBe(0)
    expect(findConsecutiveFreeSpaces([1, 1, 0, 0], 2)).toBe(2)
    expect(findConsecutiveFreeSpaces([1, 1, 1, 0], 2)).toBe(null)
  })
})

describe('findTallSpot method', () => {
  it('should work', () => {
    expect(findTallSpot([0, 0, 0, 0], [0, 0, 0, 0])).toBe(0)
    expect(findTallSpot([1, 0, 0, 0], [0, 0, 0, 0])).toBe(1)
    expect(findTallSpot([0, 0, 0, 0], [1, 1, 0, 0])).toBe(2)
    expect(findTallSpot([1, 1, 0, 0], [0, 0, 1, 1])).toBe(null)
  })
})

describe('findSpot method', () => {
  it('should work for normal images', () => {
    expect(findSpot([[0, 0, 0, 0]], sizes.NORMAL as Size, 4)).toEqual([0, 0])
    expect(findSpot([[1, 0, 0, 0]], sizes.NORMAL as Size, 4)).toEqual([0, 1])
    expect(findSpot([[1, 1, 1, 1]], sizes.NORMAL as Size, 4)).toEqual([0, 0])
  })

  it('should work for tall images', () => {
    expect(findSpot([[0, 0, 0, 0]], sizes.TALL as Size, 4)).toEqual([1, 0])
    expect(findSpot([[1, 0, 0, 0]], sizes.TALL as Size, 4)).toEqual([1, 1])
    expect(findSpot([[1, 1, 1, 1]], sizes.TALL as Size, 4)).toEqual([1, 0])
    expect(
      findSpot(
        [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        sizes.TALL as Size,
        4,
      ),
    ).toEqual([1, 0])
    expect(
      findSpot(
        [
          [1, 0, 0, 0],
          [1, 1, 1, 1],
        ],
        sizes.TALL as Size,
        4,
      ),
    ).toEqual([1, 1])
  })
})

it('should work for wide images', () => {
  expect(findSpot([[0, 0, 0, 0]], sizes.WIDE as Size, 4)).toEqual([0, 0])
  expect(findSpot([[1, 0, 0, 0]], sizes.WIDE as Size, 4)).toEqual([0, 1])
  expect(findSpot([[1, 1, 1, 1]], sizes.WIDE as Size, 4)).toEqual([0, 0])
})