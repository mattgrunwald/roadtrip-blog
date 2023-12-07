import {
  findConsecutiveFreeSpaces,
  findSpot,
  findTallSpot,
} from './imagePlacement'
import { Size } from './types'

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
    expect(
      findSpot([{ cols: [0, 0, 0, 0], full: false }], Size.Normal, 4),
    ).toEqual([0, 0])
    expect(
      findSpot([{ cols: [1, 0, 0, 0], full: false }], Size.Normal, 4),
    ).toEqual([0, 1])
    expect(
      findSpot([{ cols: [1, 1, 1, 1], full: true }], Size.Normal, 4),
    ).toEqual([0, 0])
  })

  it('should work for tall images', () => {
    expect(
      findSpot([{ cols: [0, 0, 0, 0], full: false }], Size.Tall, 4),
    ).toEqual([1, 0])
    expect(
      findSpot([{ cols: [1, 0, 0, 0], full: false }], Size.Tall, 4),
    ).toEqual([1, 1])
    expect(
      findSpot([{ cols: [1, 1, 1, 1], full: true }], Size.Tall, 4),
    ).toEqual([1, 0])
    expect(
      findSpot(
        [
          { cols: [0, 0, 0, 0], full: false },
          { cols: [0, 0, 0, 0], full: false },
        ],
        Size.Tall,
        4,
      ),
    ).toEqual([1, 0])
    expect(
      findSpot(
        [
          { cols: [1, 0, 0, 0], full: false },
          { cols: [1, 1, 1, 1], full: true },
        ],
        Size.Tall,
        4,
      ),
    ).toEqual([1, 1])
  })
})

it('should work for wide images', () => {
  expect(findSpot([{ cols: [0, 0, 0, 0], full: false }], Size.Wide, 4)).toEqual(
    [0, 0],
  )
  expect(findSpot([{ cols: [1, 0, 0, 0], full: false }], Size.Wide, 4)).toEqual(
    [0, 1],
  )
  expect(findSpot([{ cols: [1, 1, 1, 1], full: true }], Size.Wide, 4)).toEqual([
    0, 0,
  ])
})
