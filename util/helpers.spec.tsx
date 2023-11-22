import { findConsecutiveFreeSpaces } from './helpers'

describe('findConsecutiveFreespaces method', () => {
  it('should work for normal images', () => {
    expect(findConsecutiveFreeSpaces([0, 0, 0, 0], 1)).toBe(0)
    expect(findConsecutiveFreeSpaces([null, 0, 0, 0], 1)).toBe(1)
    expect(findConsecutiveFreeSpaces([null, null, null, 0], 1)).toBe(3)
    expect(findConsecutiveFreeSpaces([null, null, null, null], 1)).toBe(null)
  })

  it('should work for wide images', () => {
    expect(findConsecutiveFreeSpaces([0, 0, 0, 0], 2)).toBe(0)
    expect(findConsecutiveFreeSpaces([null, null, null, 0], 2)).toBe(null)
    expect(findConsecutiveFreeSpaces([null, null, 0, 0], 2)).toBe(2)
  })
})
