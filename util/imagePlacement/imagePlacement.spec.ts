import {
  findConsecutiveFreeSpaces,
  findNormalSpot,
  findTallSpot,
  findWideSpot,
} from './imagePlacement'

describe('findConsecutiveFreespaces method', () => {
  it('should work for normal images', () => {
    expect(findConsecutiveFreeSpaces([0, 0, 0, 0], 1)).toBe(0)
    expect(findConsecutiveFreeSpaces([1, 0, 0, 0], 1)).toBe(1)
    expect(findConsecutiveFreeSpaces([1, 1, 1, 0], 1)).toBe(3)
    expect(findConsecutiveFreeSpaces([1, 1, 1, 1], 1)).toBe(null)
  })
})

describe('findNormalSpot method', () => {
  it('should work for normal images', () => {
    expect(findNormalSpot([[0, 0, 0, 0]], 4)).toEqual([0, 0])
    expect(findNormalSpot([[1, 0, 0, 0]], 4)).toEqual([0, 1])
    expect(findNormalSpot([[1, 1, 1, 1]], 4)).toEqual([0, 0])
  })
})

describe('findTallSpot method', () => {
  it('should work for tall images', () => {
    expect(findTallSpot([[0, 0, 0, 0]], 4)).toEqual([1, 0])
    expect(findTallSpot([[1, 0, 0, 0]], 4)).toEqual([1, 1])
    expect(findTallSpot([[1, 1, 1, 1]], 4)).toEqual([1, 0])
    expect(
      findTallSpot(
        [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        4,
      ),
    ).toEqual([1, 0])
    expect(
      findTallSpot(
        [
          [1, 0, 0, 0],
          [1, 1, 1, 1],
        ],
        4,
      ),
    ).toEqual([1, 1])
  })
})

describe('findWideSpot method', () => {
  it('should work for wide images', () => {
    expect(findWideSpot([[0, 0, 0, 0]], 4)).toEqual([0, 0])
    expect(findWideSpot([[1, 0, 0, 0]], 4)).toEqual([0, 1])
    expect(findWideSpot([[1, 1, 1, 1]], 4)).toEqual([0, 0])
  })
})
